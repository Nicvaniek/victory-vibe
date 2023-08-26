import { Competition } from '../../index'
import { useLoadableData } from '../../../../toolkit/LoadableData/LoadableData'
import { fetchCompetition } from '../../api/fetchCompetition'
import { notReachable } from '../../../../toolkit/notReachable'
import { TabController } from './TabController'

type Props = {
    competition: Competition
    onMsg: (msg: Msg) => void
}

type Msg = {}

export const CompetitionApp = ({ competition }: Props) => {
    const [loadable] = useLoadableData(fetchCompetition, {
        type: 'loading',
        params: { competition },
    })

    switch (loadable.type) {
        case 'loading':
            return <span>Loading...</span>
        case 'loaded':
            return <TabController onMsg={() => {}} />
        case 'error':
            return <span>Error!</span>
        /* istanbul ignore next */
        default:
            return notReachable(loadable)
    }
}
