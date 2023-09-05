import { Competition } from '../../../index'
import { Modal, State as ModalState } from './Modal'
import { useState } from 'react'
import { Layout } from './Layout'
import { MsgOf } from '../../../../../toolkit/MsgOf'
import { notReachable } from '../../../../../toolkit/notReachable'
import { User } from '../../../../../auth'

type Props = {
    competition: Competition
    user: User
    onMsg: (msg: Msg) => void
}

type Msg =
    | Extract<
          MsgOf<typeof Layout>,
          {
              type: 'on_sign_out'
          }
      >
    | Extract<
          MsgOf<typeof Modal>,
          {
              type: 'result_added'
          }
      >

export const Settings = ({ competition, onMsg, user }: Props) => {
    const [modal, setModal] = useState<ModalState>({ type: 'closed' })

    return (
        <>
            <Layout
                user={user}
                competition={competition}
                onMsg={(msg) => {
                    switch (msg.type) {
                        case 'on_sign_out':
                            onMsg(msg)
                            break
                        case 'on_rules_click':
                            setModal({ type: 'rules' })
                            break
                        case 'on_add_results_click':
                            setModal({ type: 'add_results' })
                            break
                        case 'on_teams_click':
                            setModal({ type: 'teams' })
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
                        case 'result_added':
                            onMsg(msg)
                            break
                        /* istanbul ignore next */
                        default:
                            return notReachable(msg)
                    }
                }}
            />
        </>
    )
}
