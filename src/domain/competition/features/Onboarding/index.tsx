import { Competition } from '../../index'
import { useState } from 'react'
import { notReachable } from '../../../../toolkit/notReachable'
import { EnterCompetition } from './EnterCompetition'
import { User } from '../../../../auth'
import { MakePicks } from './MakePicks'
import { MsgOf } from '../../../../toolkit/MsgOf'

type Props = {
    competition: Competition
    user: User
    onMsg: (msg: Msg) => void
}

type Msg = Extract<MsgOf<typeof MakePicks>, { type: 'on_picks_saved' }>

type State = { type: 'enter_competition' } | { type: 'make_picks' }

const calculateState = (user: User, competition: Competition): State => {
    const participant = competition.participants.find(
        (p) => p.user.id === user.id
    )

    return participant ? { type: 'make_picks' } : { type: 'enter_competition' }
}

export const Onboarding = ({ onMsg, user, competition }: Props) => {
    const [state, setState] = useState<State>(calculateState(user, competition))

    switch (state.type) {
        case 'enter_competition':
            return (
                <EnterCompetition
                    user={user}
                    competition={competition}
                    onMsg={(msg) => {
                        switch (msg.type) {
                            case 'on_competition_entered':
                                setState({ type: 'make_picks' })
                                break
                            /* istanbul ignore next */
                            default:
                                return notReachable(msg.type)
                        }
                    }}
                />
            )
        case 'make_picks':
            return (
                <MakePicks
                    competition={competition}
                    user={user}
                    onMsg={onMsg}
                />
            )
        /* istanbul ignore next */
        default:
            return notReachable(state)
    }
}
