import { useState } from 'react'
import { BottomNav, Tab } from './BottomNav'
import { notReachable } from '../../../../../toolkit/notReachable'
import { Leaderboard } from '../Leaderboard'
import { MyPicks } from '../MyPicks'
import { Matches } from '../Matches'
import { Settings } from '../Settings'

type Props = {
    onMsg: (msg: Msg) => void
}

type Msg = { type: 'close' }

export const TabController = (_: Props) => {
    const [activeTab, setActiveTab] = useState<Tab>({ type: 'leaderboard' })

    return (
        <div className="container mx-auto flex flex-col h-full justify-between">
            <div className="flex-1">
                <Content activeTab={activeTab} />
            </div>
            <BottomNav
                activeTab={activeTab}
                onTabSelect={(tab) => setActiveTab(tab)}
            />
        </div>
    )
}

const Content = ({ activeTab }: { activeTab: Tab }) => {
    switch (activeTab.type) {
        case 'leaderboard':
            return <Leaderboard />
        case 'my_picks':
            return <MyPicks />
        case 'matches':
            return <Matches />
        case 'settings':
            return <Settings />
        /* istanbul ignore next */
        default:
            return notReachable(activeTab)
    }
}
