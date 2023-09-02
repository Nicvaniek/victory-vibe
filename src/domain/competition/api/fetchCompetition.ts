import { Competition } from '../index'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../../firebase'
import { Match, Result, Stage } from '../../match'
import { notReachable } from '../../../toolkit/notReachable'
import { CompetitionTeam } from '../../competition-team'

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

    const comp = snapshot.data() as Competition

    const calculated = calculatePoints(comp)
    console.log(calculated)
    return calculated
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

        competition.participants.forEach((participant) => {
            const { homeTeam, awayTeam } = match
            if (!participant.points) {
                participant.points = 0
            }

            if (!participant.matchesPlayed) {
                participant.matchesPlayed = 0
            }

            if (homeTeam && participant.picks.includes(homeTeam)) {
                participant.points += homeTeamPoints
                participant.matchesPlayed += 1
            }

            if (awayTeam && participant.picks.includes(awayTeam)) {
                participant.points += awayTeamPoints
                participant.matchesPlayed += 1
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
    if (!match.homeTeam || !match.result) {
        return 0
    }
    const basePoints = getBasePoints(match.homeTeam, match.result, competition)
    const stageApplied = applyCompetitionStage(basePoints, match.stage)
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
            return result.winner === team ? competition.points.win : 0
        /* istanbul ignore next */
        default:
            return notReachable(result)
    }
}

const applyCompetitionStage = (basePoints: number, stage: Stage): number => {
    switch (stage) {
        case 'GROUP':
            return basePoints
        case 'QUARTER_FINAL':
            return basePoints * 2
        case 'SEMI_FINAL':
            return basePoints * 3
        case 'BRONZE_FINAL':
            return basePoints * 4
        case 'FINAL':
            return basePoints * 5
        /* istanbul ignore next */
        default:
            return notReachable(stage)
    }
}

const applyTeamRanking = (
    basePoints: number,
    competitionTeam: CompetitionTeam
): number => basePoints * competitionTeam.rankingMultiplier
