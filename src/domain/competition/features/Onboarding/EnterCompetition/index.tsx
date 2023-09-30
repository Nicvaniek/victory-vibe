import { useLazyLoadableData } from '../../../../../toolkit/LoadableData/LazyLoadableData'
import { enterCompetition } from '../../../api/enterCompetition'
import { notReachable } from '../../../../../toolkit/notReachable'
import { useLiveRef } from '../../../../../toolkit/useLiveRef'
import { useEffect } from 'react'
import { User } from '../../../../../auth'
import { Competition } from '../../../index'
import { HashLoader } from 'react-spinners'
import { Rules } from '../../Rules'

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
                <div className="flex flex-col p-4 flex-1 justify-between h-full">
                    <div className="flex items-center">
                        <img
                            className="h-10"
                            src={competition.lightLogo}
                            alt="logo"
                        />
                        <h1 className="text-3xl ml-4">Rules</h1>
                    </div>
                    <div className="flex-1 mt-4 overflow-auto">
                        <Rules competition={competition} />
                    </div>
                    <button
                        className="btn bg-accent text-white border-accent mt-2"
                        onClick={() =>
                            setLoadable({
                                type: 'loading',
                                params: { user, competition },
                            })
                        }
                    >
                        Enter competition
                    </button>
                </div>
            )
        case 'loading':
            return (
                <div className="flex flex-col justify-center items-center h-full w-full bg-primary">
                    <HashLoader loading={true} color="white" />
                </div>
            )
        case 'error':
            return <span>Error!</span>
        /* istanbul ignore next */
        default:
            return notReachable(loadable)
    }
}
