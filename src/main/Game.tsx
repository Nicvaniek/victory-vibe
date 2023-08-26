import { Competition } from '../domain/competition'
import { useState } from 'react'
import { notReachable } from '../toolkit/notReachable'
import { ChooseCompetition } from '../domain/competition/features/ChooseCompetition'
import { Session, User } from '../auth'
import { Onboarding } from '../domain/competition/features/Onboarding'
import { CompetitionApp } from '../domain/competition/features/CompetitionApp'

type Props = {
    session: Session
}

type State =
    | { type: 'choose_competition' }
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

export const Game = ({ session }: Props) => {
    const [state, setState] = useState<State>({ type: 'choose_competition' })

    switch (state.type) {
        case 'choose_competition':
            return (
                <ChooseCompetition
                    onMsg={(msg) => {
                        switch (msg.type) {
                            case 'on_competition_select':
                                setState(
                                    calculateState(
                                        msg.competition,
                                        session.user
                                    )
                                )
                                break
                            /* istanbul ignore next */
                            default:
                                return notReachable(msg.type)
                        }
                    }}
                />
            )
        case 'onboarding':
            return (
                <Onboarding
                    competition={state.competition}
                    user={session.user}
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
