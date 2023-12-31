import { Competition } from '../../../../index'
import { notReachable } from '../../../../../../toolkit/notReachable'
import { Modal as UIModal } from '../../../../../../uikit/Modal'
import { AddResults } from './AddResults'
import { MsgOf } from '../../../../../../toolkit/MsgOf'
import { Rules } from '../../../Rules'
import { ListItem } from '../../../../../competition-team/components/ListItem'
import { CompetitionTeam } from '../../../../../competition-team'
import { SwitchCompetition } from './SwitchCompetition'
import { User } from '../../../../../../auth'

type Props = {
    state: State
    competition: Competition
    user: User
    competitions: Competition[]
    onMsg: (msg: Msg) => void
}

type Msg =
    | { type: 'close' }
    | MsgOf<typeof AddResults>
    | MsgOf<typeof SwitchCompetition>

export type State = {
    type: 'closed' | 'rules' | 'add_results' | 'teams' | 'switch_competition'
}

const sortByPointsThenRank = (a: CompetitionTeam, b: CompetitionTeam) => {
    if (a.points !== b.points) {
        return (b.points || 0) - (a.points || 0)
    }

    return a.team.ranking - b.team.ranking
}

export const Modal = ({
    competition,
    competitions,
    state,
    onMsg,
    user,
}: Props) => {
    switch (state.type) {
        case 'teams':
            return (
                <UIModal
                    id="teams"
                    onMsg={onMsg}
                    title={
                        <div className="flex items-center">
                            <img
                                className="h-10"
                                src={competition.lightLogo}
                                alt="logo"
                            />
                            <h1 className="text-3xl ml-4">Teams</h1>
                        </div>
                    }
                >
                    <div className="flex flex-col px-4 pb-4 flex-1 justify-between h-full overflow-auto">
                        <div className="flex-1 overflow-auto">
                            {competition.teams
                                .sort(sortByPointsThenRank)
                                .map((team, idx) => (
                                    <ListItem
                                        key={`${idx}-${team.name}`}
                                        competitionTeam={team}
                                        selected={null}
                                        showPoints
                                    />
                                ))}
                        </div>
                        <button
                            className="btn bg-accent text-white border-accent mt-2"
                            onClick={() => onMsg({ type: 'close' })}
                        >
                            Close
                        </button>
                    </div>
                </UIModal>
            )
        case 'closed':
            return null
        case 'rules':
            return (
                <UIModal
                    id="rules"
                    onMsg={onMsg}
                    title={
                        <div className="flex items-center">
                            <img
                                className="h-10"
                                src={competition.lightLogo}
                                alt="logo"
                            />
                            <h1 className="text-3xl ml-4">Rules</h1>
                        </div>
                    }
                >
                    <div className="flex flex-col px-4 pb-4 flex-1 justify-between h-full overflow-auto">
                        <div className="flex-1 overflow-auto">
                            <Rules competition={competition} />
                        </div>
                        <button
                            className="btn bg-accent text-white border-accent mt-2"
                            onClick={() => onMsg({ type: 'close' })}
                        >
                            Close
                        </button>
                    </div>
                </UIModal>
            )
        case 'add_results':
            return (
                <UIModal
                    id="addResults"
                    onMsg={onMsg}
                    title={
                        <div className="flex items-center">
                            <img
                                className="h-10"
                                src={competition.lightLogo}
                                alt="logo"
                            />
                            <h1 className="text-3xl ml-4">Add results</h1>
                        </div>
                    }
                >
                    <div className="flex flex-col px-4 pb-4 flex-1 justify-between h-full overflow-auto">
                        <div className="flex-1 overflow-auto">
                            <AddResults
                                competition={competition}
                                onMsg={onMsg}
                            />
                        </div>
                        <button
                            className="btn bg-accent text-white border-accent mt-2"
                            onClick={() => onMsg({ type: 'close' })}
                        >
                            Close
                        </button>
                    </div>
                </UIModal>
            )
        case 'switch_competition':
            return (
                <UIModal
                    id="addResults"
                    onMsg={onMsg}
                    title={
                        <div className="flex items-center">
                            <img
                                className="h-10"
                                src={competition.lightLogo}
                                alt="logo"
                            />
                            <h1 className="text-3xl ml-4">
                                Switch competition
                            </h1>
                        </div>
                    }
                >
                    <div className="flex flex-col px-4 pb-4 flex-1 justify-between h-full overflow-auto">
                        <div className="flex-1 overflow-auto">
                            <SwitchCompetition
                                user={user}
                                currentCompetition={competition}
                                competitions={competitions}
                                onMsg={onMsg}
                            />
                        </div>
                        <button
                            className="btn bg-accent text-white border-accent mt-2"
                            onClick={() => onMsg({ type: 'close' })}
                        >
                            Close
                        </button>
                    </div>
                </UIModal>
            )
        /* istanbul ignore next */
        default:
            return notReachable(state.type)
    }
}
