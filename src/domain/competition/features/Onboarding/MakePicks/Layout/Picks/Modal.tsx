import { Competition } from '../../../../../index'
import { Rules } from '../../../../Rules'
import { Modal as UIModal } from '../../../../../../../uikit/Modal'
import { notReachable } from '../../../../../../../toolkit/notReachable'

type Props = {
    state: State
    competition: Competition
    onMsg: (msg: Msg) => void
}

type Msg = { type: 'close' }

export type State = { type: 'closed' | 'rules' }

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
        /* istanbul ignore next */
        default:
            return notReachable(state.type)
    }
}
