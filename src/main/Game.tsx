import { Competition } from '../domain/competition'
import { useState } from 'react'
import { notReachable } from '../toolkit/notReachable'
import { ChooseCompetition } from '../domain/competition/features/ChooseCompetition'
import { Auth } from '../auth'
import { CompetitionWrapper } from '../domain/competition/CompetitionWrapper'

type Props = {
    auth: Auth
}

type State =
    | { type: 'choose_competition' }
    | { type: 'competition'; competition: Competition }

export const Game = ({ auth }: Props) => {
    const [state, setState] = useState<State>({ type: 'choose_competition' })
    const { session, logout } = auth

    if (!session) {
        return null
    }

    switch (state.type) {
        case 'choose_competition':
            return (
                <ChooseCompetition
                    onMsg={(msg) => {
                        switch (msg.type) {
                            case 'on_competition_select':
                                setState({
                                    type: 'competition',
                                    competition: msg.competition,
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
                <div
                    data-theme={state.competition.theme}
                    className="flex-1 h-full bg-primary text-white"
                >
                    <CompetitionWrapper
                        user={session.user}
                        competition={state.competition}
                        onMsg={(msg) => {
                            switch (msg.type) {
                                case 'on_sign_out':
                                    logout()
                                    break
                                /* istanbul ignore next */
                                default:
                                    return notReachable(msg.type)
                            }
                        }}
                    />
                </div>
            )
        /* istanbul ignore next */
        default:
            return notReachable(state)
    }
}
