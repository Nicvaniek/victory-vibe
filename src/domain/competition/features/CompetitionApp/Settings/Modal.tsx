import { Competition } from '../../../index'
import { notReachable } from '../../../../../toolkit/notReachable'
import { Modal as UIModal } from '../../../../../uikit/Modal'
import { AddResults } from './AddResults'
import { MsgOf } from '../../../../../toolkit/MsgOf'
import { Rules } from '../../Rules'

type Props = {
    state: State
    competition: Competition
    onMsg: (msg: Msg) => void
}

type Msg = { type: 'close' } | MsgOf<typeof AddResults>

export type State = { type: 'closed' | 'rules' | 'add_results' }

export const Modal = ({ competition, state, onMsg }: Props) => {
    switch (state.type) {
        case 'closed':
            return null
        case 'rules':
            return (
                <UIModal id="rules" onMsg={onMsg}>
                    <div className="flex flex-col p-4 flex-1 justify-between h-full overflow-auto">
                        <div className="flex items-center">
                            <img
                                className="h-10"
                                src={competition.heroImage}
                                alt="logo"
                            />
                            <h1 className="text-3xl ml-4">Rules</h1>
                        </div>
                        <div className="flex-1 overflow-auto">
                            <Rules />
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
                <UIModal id="rules" onMsg={onMsg}>
                    <div className="flex flex-col p-4 h-full">
                        <h1 className="text-3xl">Add results</h1>
                        <div className="h-full overflow-auto">
                            <AddResults
                                competition={competition}
                                onMsg={onMsg}
                            />
                        </div>
                    </div>
                </UIModal>
            )
        /* istanbul ignore next */
        default:
            return notReachable(state.type)
    }
}