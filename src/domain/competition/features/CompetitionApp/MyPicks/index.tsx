import { User } from '../../../../../auth'
import { Competition } from '../../../index'
import { sortByRank } from '../../../../competition-team/helpers/sortByRank'
import { ListItem } from '../../../../competition-team/components/ListItem'
import { CompetitionTeam } from '../../../../competition-team'

type Props = {
    user: User
    competition: Competition
}

const group = (picks: CompetitionTeam[]): Map<number, CompetitionTeam[]> =>
    picks.reduce((memo, pick) => {
        const tierPicks = memo.get(pick.tier) || []
        tierPicks.push(pick)
        memo.set(pick.tier, tierPicks)
        return memo
    }, new Map<number, CompetitionTeam[]>())

export const MyPicks = ({ competition, user }: Props) => {
    const participant = competition.participants.find(
        (p) => p.user.id === user.id
    )

    const groupedPicks = group(participant?.picks || [])

    return (
        <div className="flex flex-col p-4 h-full">
            <h1 className="text-3xl">My Picks</h1>
            <div className="stats shadow mt-4">
                <div className="stat place-items-center">
                    <div className="stat-title">Points</div>
                    <div className="stat-value">23</div>
                    <div className="stat-desc">Across all games</div>
                </div>

                <div className="stat place-items-center">
                    <div className="stat-title">Rank</div>
                    <div className="stat-value">6</div>
                    <div className="stat-desc">Overall</div>
                </div>
            </div>
            <div className="flex flex-col w-full flex-1 mt-4 overflow-auto">
                {Array.from(groupedPicks.entries()).map(([tier, picks]) => (
                    <div className="mb-2">
                        <h2 className="mb-1">Tier {tier} picks:</h2>
                        {picks.sort(sortByRank).map((team, idx) => (
                            <ListItem
                                key={`${idx}-${team.name}`}
                                competitionTeam={team}
                                selected={null}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}
