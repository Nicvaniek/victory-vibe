import { CompetitionTeam } from '../../../../../competition-team'
import { ListItem } from '../../../../../competition-team/components/ListItem'
import { sortByRank } from '../../../../../competition-team/helpers/sortByRank'
import { Competition } from '../../../../index'
import { notReachable } from '../../../../../../toolkit/notReachable'

type Props = {
    picks: CompetitionTeam[]
    competition: Competition
    onMsg: (msg: Msg) => void
}

type Msg = { type: 'on_choose_again' } | { type: 'on_confirm' }

const group = (picks: CompetitionTeam[]): Map<number, CompetitionTeam[]> =>
    picks.reduce((memo, pick) => {
        const tierPicks = memo.get(pick.tier) || []
        tierPicks.push(pick)
        memo.set(pick.tier, tierPicks)
        return memo
    }, new Map<number, CompetitionTeam[]>())

export const Confirmation = ({ picks, onMsg, competition }: Props) => {
    const groupedPicks = group(picks)

    return (
        <div className="flex flex-col items-center p-4 h-full justify-between">
            <div className="flex flex-col items center w-full">
                <Header competition={competition} />
                <p className="text-center text-sm">
                    Please confirm your picks below, or choose different teams
                    by selecting "Restart".
                    <br />
                    <br />
                    Once your picks are saved, you won't be able to make any
                    changes.
                </p>
            </div>
            <div className="flex flex-col w-full flex-1 mt-4 overflow-auto">
                {Array.from(groupedPicks.entries()).map(([tier, picks]) => (
                    <div className="mb-2">
                        {competition.tiers.length > 1 ? (
                            <h2 className="mb-1">Tier {tier} picks:</h2>
                        ) : (
                            <h2 className="mb-1">Picks:</h2>
                        )}
                        {picks.sort(sortByRank).map((team, idx) => (
                            <ListItem
                                key={`${idx}-${team.name}`}
                                competitionTeam={team}
                                selected={null}
                                showPoints={false}
                            />
                        ))}
                    </div>
                ))}
            </div>
            <div className="flex flex-row w-full pt-4">
                <button
                    className="btn bg-white text-accent flex-1 mr-1"
                    onClick={() => onMsg({ type: 'on_choose_again' })}
                >
                    Restart
                </button>
                <button
                    className="btn bg-white text-accent flex-1 mr-1"
                    onClick={() => onMsg({ type: 'on_confirm' })}
                >
                    Save picks
                </button>
            </div>
        </div>
    )
}

const Header = ({ competition }: { competition: Competition }) => {
    switch (competition.type) {
        case 'rugbyWorldCup2023':
            return (
                <div className="flex flex-row items-center mt-4 mb-4 justify-center">
                    <img
                        className="h-28"
                        src={competition.heroImage}
                        alt="logo"
                    />
                    <h1 className="text-4xl ms-3">Confirm picks</h1>
                </div>
            )
        case 'cricketWorldCup2023':
            return (
                <div className="flex flex-col items-center mb-4 justify-center">
                    <img
                        className="h-28"
                        src={competition.heroImage}
                        alt="logo"
                    />
                    <h1 className="text-4xl ms-3">Confirm picks</h1>
                </div>
            )
        /* istanbul ignore next */
        default:
            return notReachable(competition.type)
    }
}
