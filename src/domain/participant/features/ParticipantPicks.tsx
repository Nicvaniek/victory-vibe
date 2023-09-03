import { ListItem } from '../../competition-team/components/ListItem'
import { Participant } from '../index'
import { User } from '../../../auth'
import { CompetitionTeam } from '../../competition-team'

type Props = {
    participant: Participant
    user: User
}

const group = (picks: CompetitionTeam[]): Map<number, CompetitionTeam[]> =>
    picks.reduce((memo, pick) => {
        const tierPicks = memo.get(pick.tier) || []
        tierPicks.push(pick)
        memo.set(pick.tier, tierPicks)
        return memo
    }, new Map<number, CompetitionTeam[]>())

const sortByPointsThenRank = (a: CompetitionTeam, b: CompetitionTeam) => {
    if (a.points !== b.points) {
        return b.points - a.points
    }

    return a.team.ranking - b.team.ranking
}

export const ParticipantPicks = ({ user, participant }: Props) => {
    const groupedPicks = group(participant?.picks || [])

    const title =
        user.id === participant.user.id
            ? 'My picks'
            : `${participant.user.name}'s picks`

    return (
        <div className="flex flex-col p-4 h-full overflow-auto">
            <h1 className="text-3xl">{title}</h1>
            <div className="stats shadow mt-4">
                <div className="stat place-items-center">
                    <div className="stat-title">Points</div>
                    <div className="stat-value">{participant.points}</div>
                    <div className="stat-desc">
                        Across {participant.matchesPlayed} game(s)
                    </div>
                </div>

                <div className="stat place-items-center">
                    <div className="stat-title">Rank</div>
                    <div className="stat-value">{participant.rank}</div>
                    <div className="stat-desc">Overall</div>
                </div>
            </div>
            <div className="flex flex-col w-full flex-1 mt-4 overflow-auto">
                {Array.from(groupedPicks.entries()).map(([tier, picks]) => (
                    <div className="mb-2">
                        <h2 className="mb-1">Tier {tier} picks:</h2>
                        {picks.sort(sortByPointsThenRank).map((team, idx) => (
                            <ListItem
                                key={`${idx}-${team.name}`}
                                competitionTeam={team}
                                selected={null}
                                showPoints
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}
