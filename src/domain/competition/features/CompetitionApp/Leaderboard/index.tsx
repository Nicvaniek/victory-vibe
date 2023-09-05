import { Competition } from '../../../index'
import { Modal, State as ModalState } from './Modal'
import { useState } from 'react'
import { Layout } from './Layout'
import { notReachable } from '../../../../../toolkit/notReachable'
import { User } from '../../../../../auth'
import { MsgOf } from '../../../../../toolkit/MsgOf'

type Props = {
    user: User
    competition: Competition
    onMsg: (msg: Msg) => void
}

type Msg = Extract<MsgOf<typeof Layout>, { type: 'on_self_click' }>

export const Leaderboard = ({ competition, user, onMsg }: Props) => {
    const [modal, setModal] = useState<ModalState>({ type: 'closed' })

    return (
        <>
            <Layout
                user={user}
                competition={competition}
                onMsg={(msg) => {
                    switch (msg.type) {
                        case 'on_self_click':
                            onMsg(msg)
                            break;
                        case 'on_participant_click':
                            setModal({
                                type: 'participant_picks',
                                participant: msg.participant,
                            })
                            break
                        /* istanbul ignore next */
                        default:
                            return notReachable(msg)
                    }
                }}
            />
            <Modal
                state={modal}
                user={user}
                onMsg={(msg) => {
                    switch (msg.type) {
                        case 'close':
                            setModal({ type: 'closed' })
                            break
                        /* istanbul ignore next */
                        default:
                            return notReachable(msg.type)
                    }
                }}
            />
        </>
    )
}
