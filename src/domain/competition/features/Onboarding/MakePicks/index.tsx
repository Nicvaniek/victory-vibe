import { Competition } from '../../../index'
import { useLazyLoadableData } from '../../../../../toolkit/LoadableData/LazyLoadableData'
import { saveParticipantPicks } from '../../../api/saveParticipantPicks'
import { notReachable } from '../../../../../toolkit/notReachable'
import { useEffect } from 'react'
import { useLiveRef } from '../../../../../toolkit/useLiveRef'
import { User } from '../../../../../auth'
import { Layout } from './Layout'

type Props = {
    competition: Competition
    user: User
    onMsg: (msg: Msg) => void
}

type Msg = { type: 'on_picks_saved' }

export const MakePicks = ({ onMsg, competition, user }: Props) => {
    const [loadable, setLoadable] = useLazyLoadableData(saveParticipantPicks, {
        type: 'not_asked',
    })

    const onMsgLive = useLiveRef(onMsg)

    useEffect(() => {
        switch (loadable.type) {
            case 'not_asked':
            case 'loading':
            case 'error':
                break
            case 'loaded':
                onMsgLive.current({ type: 'on_picks_saved' })
                break
            /* istanbul ignore next */
            default:
                return notReachable(loadable)
        }
    }, [loadable, onMsgLive])

    switch (loadable.type) {
        case 'not_asked':
        case 'loaded':
            return (
                <Layout
                    competition={competition}
                    onMsg={(msg) => {
                        switch (msg.type) {
                            case 'on_confirm_picks':
                                setLoadable({
                                    type: 'loading',
                                    params: {
                                        user,
                                        competition,
                                        picks: msg.picks,
                                    },
                                })
                                break
                            /* istanbul ignore next */
                            default:
                                return notReachable(msg.type)
                        }
                    }}
                />
            )
        case 'loading':
            return <span>Loading...</span>
        case 'error':
            return <span>Error!</span>
        /* istanbul ignore next */
        default:
            return notReachable(loadable)
    }
}
