import { useState } from 'react'
import { Intro } from './Intro'
import { Picks } from './Picks'
import { Competition } from '../../../../index'
import { CompetitionTeam } from '../../../../../competition-team'
import { notReachable } from '../../../../../../toolkit/notReachable'
import { Confirmation } from './Confrimation'

type Props = {
    competition: Competition
    onMsg: (msg: Msg) => void
}

type Msg = { type: 'on_confirm_picks'; picks: CompetitionTeam[] }

type State =
    | { type: 'intro' }
    | { type: 'picks' }
    | { type: 'confirmation'; picks: CompetitionTeam[] }

export const Layout = ({ competition, onMsg }: Props) => {
    const [state, setState] = useState<State>({ type: 'intro' })

    switch (state.type) {
        case 'intro':
            return (
                <Intro
                    competition={competition}
                    onMsg={(msg) => {
                        switch (msg.type) {
                            case 'on_continue':
                                setState({ type: 'picks' })
                                break
                            /* istanbul ignore next */
                            default:
                                return notReachable(msg.type)
                        }
                    }}
                />
            )
        case 'picks':
            return (
                <Picks
                    competition={competition}
                    onMsg={(msg) => {
                        switch (msg.type) {
                            case 'on_continue':
                                setState({
                                    type: 'confirmation',
                                    picks: msg.picks,
                                })
                                break
                            /* istanbul ignore next */
                            default:
                                return notReachable(msg.type)
                        }
                    }}
                />
            )
        case 'confirmation':
            return (
                <Confirmation
                    competition={competition}
                    picks={state.picks}
                    onMsg={(msg) => {
                        switch (msg.type) {
                            case 'on_choose_again':
                                setState({ type: 'picks' })
                                break
                            case 'on_confirm':
                                onMsg({
                                    type: 'on_confirm_picks',
                                    picks: state.picks,
                                })
                                break
                            /* istanbul ignore next */
                            default:
                                return notReachable(msg)
                        }
                    }}
                />
            )
        /* istanbul ignore next */
        default:
            return notReachable(state)
    }
}
