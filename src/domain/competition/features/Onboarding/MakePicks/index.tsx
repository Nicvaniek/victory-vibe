import { Competition } from '../../../index'
import { useLazyLoadableData } from '../../../../../toolkit/LoadableData/LazyLoadableData'
import { saveParticipantPicks } from '../../../api/saveParticipantPicks'
import { notReachable } from '../../../../../toolkit/notReachable'
import { useEffect } from 'react'
import { useLiveRef } from '../../../../../toolkit/useLiveRef'
import { User } from '../../../../../auth'

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
                <div>
                    <span>Some layout stuff for picks screen</span>
                    <button
                        className="btn btn-primary"
                        onClick={() =>
                            setLoadable({
                                type: 'loading',
                                params: {
                                    user,
                                    competition,
                                    picks: [
                                        competition.teams[0],
                                        competition.teams[1],
                                    ],
                                },
                            })
                        }
                    >
                        Save picks
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
