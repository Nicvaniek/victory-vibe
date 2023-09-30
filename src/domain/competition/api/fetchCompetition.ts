import { Competition } from '../index'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../../firebase'
import { Match, Result, Stage } from '../../match'
import { notReachable } from '../../../toolkit/notReachable'
import { CompetitionTeam } from '../../competition-team'
import { Participant } from '../../participant'

export const fetchCompetition = async ({
    competition,
}: {
    competition: Competition
}): Promise<Competition> => {
    const docRef = doc(db, 'competitions', competition.id)
    const snapshot = await getDoc(docRef)

    if (!snapshot.exists()) {
        throw new Error('CompetitionApp does not exist')
    }

    const comp = {
        ...snapshot.data(),
        id: snapshot.id,
        type: snapshot.data().theme,
    } as Competition

    const withPoints = calculatePoints(comp)

    return calculateStandings(withPoints)
}

const sortByPointsThenGamesPlayed = (a: Participant, b: Participant) => {
    if (a.points !== b.points) {
        return b.points - a.points
    }
    return a.matchesPlayed - b.matchesPlayed
}

const calculateStandings = (competition: Competition): Competition => {
    const sortedParticipants = competition.participants.sort(
        sortByPointsThenGamesPlayed
    )

    sortedParticipants.forEach(
        (participant, idx) => (participant.rank = idx + 1)
    )

    return competition
}

const calculatePoints = (competition: Competition): Competition => {
    for (const match of competition.matches) {
        if (!match.homeTeam || !match.awayTeam || !match.result) {
            continue
        }

        const homeTeamPoints = calculateTeamPoints(
            match,
            competition,
            match.homeTeam
        )
        const awayTeamPoints = calculateTeamPoints(
            match,
            competition,
            match.awayTeam
        )

        if (!match.homeTeam.points) {
            match.homeTeam.points = homeTeamPoints
        } else {
            match.homeTeam.points += homeTeamPoints
        }

        if (!match.awayTeam.points) {
            match.awayTeam.points = awayTeamPoints
        } else {
            match.awayTeam.points += awayTeamPoints
        }

        const homeTeam = competition.teams.find(
            (t) => t.name === match.homeTeam?.name
        )

        if (homeTeam) {
            homeTeam.points
                ? (homeTeam.points += homeTeamPoints)
                : (homeTeam.points = homeTeamPoints)
        }

        const awayTeam = competition.teams.find(
            (t) => t.name === match.awayTeam?.name
        )

        if (awayTeam) {
            awayTeam.points
                ? (awayTeam.points += awayTeamPoints)
                : (awayTeam.points = awayTeamPoints)
        }

        competition.participants.forEach((participant) => {
            const { homeTeam, awayTeam } = match
            if (!participant.points) {
                participant.points = 0
            }

            if (!participant.matchesPlayed) {
                participant.matchesPlayed = 0
            }

            if (
                homeTeam &&
                participant.picks.map((p) => p.name).includes(homeTeam.name)
            ) {
                participant.points += homeTeamPoints
                participant.matchesPlayed += 1

                const pick = participant.picks.find(
                    (p) => p.name === homeTeam.name
                )

                if (pick) {
                    pick.points
                        ? (pick.points += homeTeamPoints)
                        : (pick.points = homeTeamPoints)
                }
            }

            if (
                awayTeam &&
                participant.picks.map((p) => p.name).includes(awayTeam.name)
            ) {
                participant.points += awayTeamPoints
                participant.matchesPlayed += 1

                const pick = participant.picks.find(
                    (p) => p.name === awayTeam.name
                )
                if (pick) {
                    pick.points
                        ? (pick.points += awayTeamPoints)
                        : (pick.points = awayTeamPoints)
                }
            }
        })
    }
    return competition
}

const calculateTeamPoints = (
    match: Match,
    competition: Competition,
    teamToCheck: CompetitionTeam
): number => {
    if (!match.result) {
        return 0
    }
    const basePoints = getBasePoints(teamToCheck, match.result, competition)
    const stageApplied = applyCompetitionStage(
        basePoints,
        match.stage,
        competition
    )
    return applyTeamRanking(stageApplied, teamToCheck)
}

const getBasePoints = (
    team: CompetitionTeam,
    result: Result,
    competition: Competition
): number => {
    switch (result.type) {
        case 'draw':
            return competition.points.draw
        case 'victory':
            return result.winner.name === team.name ? competition.points.win : 0
        /* istanbul ignore next */
        default:
            return notReachable(result)
    }
}

const applyCompetitionStage = (
    basePoints: number,
    stage: Stage,
    competition: Competition
): number => {
    switch (stage) {
        case 'GROUP':
            return basePoints
        case 'QUARTER_FINAL':
            return basePoints * competition.stageModifiers.quarter
        case 'SEMI_FINAL':
            return basePoints * competition.stageModifiers.semi
        case 'FINAL':
            return basePoints * competition.stageModifiers.final
        /* istanbul ignore next */
        default:
            return notReachable(stage)
    }
}

const applyTeamRanking = (
    basePoints: number,
    competitionTeam: CompetitionTeam
): number => Math.round(basePoints * competitionTeam.rankingMultiplier)
