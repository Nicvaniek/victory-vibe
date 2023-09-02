import { Competition } from '../../index'
import { useLoadableData } from '../../../../toolkit/LoadableData/LoadableData'
import { fetchCompetition } from '../../api/fetchCompetition'
import { notReachable } from '../../../../toolkit/notReachable'
import { TabController } from './TabController'
import { User } from '../../../../auth'
import { MsgOf } from '../../../../toolkit/MsgOf'
import { HashLoader } from 'react-spinners'

type Props = {
    competition: Competition
    user: User
    onMsg: (msg: Msg) => void
}

type Msg = MsgOf<typeof TabController>

export const CompetitionApp = ({ competition, user, onMsg }: Props) => {
    const [loadable] = useLoadableData(fetchCompetition, {
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
            return (
                <TabController
                    user={user}
                    competition={loadable.data}
                    onMsg={onMsg}
                />
            )
        case 'error':
            return <span>Error!</span>
        /* istanbul ignore next */
        default:
            return notReachable(loadable)
    }
}
