import { Competition } from '../../../index'
import { Modal, State as ModalState } from './Modal'
import { useState } from 'react'
import { Layout } from './Layout'
import { notReachable } from '../../../../../toolkit/notReachable'
import { User } from '../../../../../auth'

type Props = {
    user: User
    competition: Competition
}

export const Leaderboard = ({ competition, user }: Props) => {
    const [modal, setModal] = useState<ModalState>({ type: 'closed' })

    return (
        <>
            <Layout
                user={user}
                competition={competition}
                onMsg={(msg) => {
                    switch (msg.type) {
                        case 'on_participant_click':
                            setModal({
                                type: 'participant_picks',
                                participant: msg.participant,
                            })
                            break
                        /* istanbul ignore next */
                        default:
                            return notReachable(msg.type)
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
