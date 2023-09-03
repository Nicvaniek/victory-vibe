import { useState } from 'react'
import { Competition } from '../../../../../index'
import { Modal, State as ModalState } from './Modal'
import { MsgOf } from '../../../../../../../toolkit/MsgOf'
import { Layout } from './Layout'
import { notReachable } from '../../../../../../../toolkit/notReachable'

type Props = {
    competition: Competition
    onMsg: (msg: Msg) => void
}

type Msg = Extract<MsgOf<typeof Layout>, { type: 'on_continue' }>

export const Picks = ({ competition, onMsg }: Props) => {
    const [modal, setModal] = useState<ModalState>({ type: 'closed' })

    return (
        <>
            <Layout
                competition={competition}
                onMsg={(msg) => {
                    switch (msg.type) {
                        case 'on_view_rules_click':
                            setModal({ type: 'rules' })
                            break
                        case 'on_continue':
                            onMsg(msg)
                            break
                        /* istanbul ignore next */
                        default:
                            return notReachable(msg)
                    }
                }}
            />
            <Modal
                state={modal}
                competition={competition}
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
