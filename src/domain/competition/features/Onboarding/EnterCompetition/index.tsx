import { useLazyLoadableData } from '../../../../../toolkit/LoadableData/LazyLoadableData'
import { enterCompetition } from '../../../api/enterCompetition'
import { notReachable } from '../../../../../toolkit/notReachable'
import { useLiveRef } from '../../../../../toolkit/useLiveRef'
import { useEffect } from 'react'
import { User } from '../../../../../auth'
import { Competition } from '../../../index'

type Props = {
    user: User
    competition: Competition
    onMsg: (msg: Msg) => void
}

type Msg = { type: 'on_competition_entered' }

export const EnterCompetition = ({ onMsg, user, competition }: Props) => {
    const [loadable, setLoadable] = useLazyLoadableData(enterCompetition, {
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
                onMsgLive.current({ type: 'on_competition_entered' })
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
                <div>
                    <span>Show competition rules</span>
                    <button
                        onClick={() =>
                            setLoadable({
                                type: 'loading',
                                params: {
                                    user,
                                    competition,
                                },
                            })
                        }
                    >
                        Enter competition
                    </button>
                </div>
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
