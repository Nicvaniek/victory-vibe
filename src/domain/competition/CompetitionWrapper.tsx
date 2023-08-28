import { Competition } from './index'
import { User } from '../../auth'
import { useState } from 'react'
import { notReachable } from '../../toolkit/notReachable'
import { Onboarding } from './features/Onboarding'
import { CompetitionApp } from './features/CompetitionApp'

type Props = {
    user: User
    competition: Competition
    onMsg: (msg: Msg) => void
}

type Msg = {}

type State =
    | { type: 'onboarding'; competition: Competition }
    | { type: 'competition'; competition: Competition }

const calculateState = (
    competition: Competition,
    user: User
): Extract<
    State,
    {
        type: 'onboarding' | 'competition'
    }
> => {
    const participant = competition.participants.find(
        (p) => p.user.id === user.id
    )

    if (!participant || !participant.picks.length) {
        return { type: 'onboarding', competition }
    }
    return { type: 'competition', competition }
}

export const CompetitionWrapper = ({ user, competition }: Props) => {
    const [state, setState] = useState<State>(calculateState(competition, user))

    switch (state.type) {
        case 'onboarding':
            return (
                <Onboarding
                    competition={state.competition}
                    user={user}
                    onMsg={(msg) => {
                        switch (msg.type) {
                            case 'on_picks_saved':
                                setState({
                                    type: 'competition',
                                    competition: state.competition,
                                })
                                break
                            /* istanbul ignore next */
                            default:
                                return notReachable(msg.type)
                        }
                    }}
                />
            )
        case 'competition':
            return (
                <CompetitionApp
                    competition={state.competition}
                    onMsg={() => {}}
                />
            )
        /* istanbul ignore next */
        default:
            return notReachable(state)
    }
}
