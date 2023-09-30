import { Competition } from '../../index'
import { fetchCompetition } from '../../api/fetchCompetition'
import { notReachable } from '../../../../toolkit/notReachable'
import { TabController } from './TabController'
import { User } from '../../../../auth'
import { MsgOf } from '../../../../toolkit/MsgOf'
import { HashLoader } from 'react-spinners'
import { useReloadableData } from '../../../../toolkit/LoadableData/ReloadableData'

type Props = {
    competition: Competition
    user: User
    competitions: Competition[]
    onMsg: (msg: Msg) => void
}

type Msg = Extract<
    MsgOf<typeof TabController>,
    { type: 'on_sign_out' | 'on_competition_switch_select' }
>

export const CompetitionApp = ({
    competition,
    competitions,
    user,
    onMsg,
}: Props) => {
    const [loadable, setLoadable] = useReloadableData(fetchCompetition, {
        type: 'loading',
        params: { competition },
    })

    switch (loadable.type) {
        case 'loading':
            return (
                <div className="flex flex-col justify-center items-center h-full w-full bg-primary">
                    <HashLoader loading={true} color="white" />
                </div>
            )
        case 'loaded':
        case 'reloading':
        case 'subsequent_failed':
            return (
                <TabController
                    competitions={competitions}
                    user={user}
                    competition={loadable.data}
                    onMsg={(msg) => {
                        switch (msg.type) {
                            case 'on_sign_out':
                                onMsg(msg)
                                break
                            case 'result_added':
                                setLoadable({
                                    type: 'reloading',
                                    params: { competition },
                                    data: loadable.data,
                                })
                                break
                            case 'on_competition_switch_select':
                                onMsg(msg)
                                setLoadable({
                                    type: 'loading',
                                    params: { competition: msg.competition },
                                })
                                break
                            /* istanbul ignore next */
                            default:
                                return notReachable(msg)
                        }
                    }}
                />
            )
        case 'error':
            return <span>Error!</span>
        /* istanbul ignore next */
        default:
            return notReachable(loadable)
    }
}
