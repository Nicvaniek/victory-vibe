import { useLoadableData } from '../../../../toolkit/LoadableData/LoadableData'
import { fetchCompetitions } from '../../api/fetchCompetitions'
import { notReachable } from '../../../../toolkit/notReachable'
import { Layout } from './Layout'
import { MsgOf } from '../../../../toolkit/MsgOf'
import { HashLoader } from 'react-spinners'

type Props = {
    onMsg: (msg: Msg) => void
}

type Msg = MsgOf<typeof Layout>

export const ChooseCompetition = ({ onMsg }: Props) => {
    const [loadable] = useLoadableData(fetchCompetitions, {
        type: 'loading',
        params: null,
    })

    switch (loadable.type) {
        case 'loading':
            return (
                <div className="flex flex-col justify-center items-center h-full w-full bg-primary">
                    <HashLoader loading={true} color="white" />
                </div>
            )
        case 'loaded':
            return <Layout competitions={loadable.data} onMsg={onMsg} />
        case 'error':
            return <div>Error!</div>
        /* istanbul ignore next */
        default:
            return notReachable(loadable)
    }
}
