import { notReachable } from '../../../../../toolkit/notReachable'
import { Modal as UIModal } from '../../../../../uikit/Modal'
import { Participant } from '../../../../participant'
import { ParticipantPicks } from '../../../../participant/features/ParticipantPicks'
import { User } from '../../../../../auth'

type Props = {
    state: State
    user: User
    onMsg: (msg: Msg) => void
}

type Msg = { type: 'close' }

export type State =
    | {
          type: 'closed'
      }
    | {
          type: 'participant_picks'
          participant: Participant
      }

export const Modal = ({ user, state, onMsg }: Props) => {
    switch (state.type) {
        case 'closed':
            return null
        case 'participant_picks': {
            const { name } = state.participant.user
            const lastLetter = name.charAt(name.length - 1)
            return (
                <UIModal
                    id="picks"
                    onMsg={onMsg}
                    title={
                        <h1 className="text-3xl">{`${name}${
                            lastLetter === 's' ? "'" : "'s"
                        } picks`}</h1>
                    }
                >
                    <div className="flex flex-col flex-1 justify-between h-full overflow-auto">
                        <ParticipantPicks
                            participant={state.participant}
                            user={user}
                        />
                        <div className="p-4 w-full flex">
                            <button
                                className="btn bg-accent text-white border-accent mt-2 flex-1"
                                onClick={() => onMsg({ type: 'close' })}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </UIModal>
            )
        }
        /* istanbul ignore next */
        default:
            return notReachable(state)
    }
}
