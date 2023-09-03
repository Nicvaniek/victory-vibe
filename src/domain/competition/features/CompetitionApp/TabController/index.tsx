import { useEffect, useState } from 'react'
import { BottomNav, Tab } from './BottomNav'
import { notReachable } from '../../../../../toolkit/notReachable'
import { Leaderboard } from '../Leaderboard'
import { MyPicks } from '../MyPicks'
import { Matches } from '../Matches'
import { Settings } from '../Settings'
import { Competition } from '../../../index'
import { User } from '../../../../../auth'
import { MsgOf } from '../../../../../toolkit/MsgOf'

type Props = {
    competition: Competition
    user: User
    onMsg: (msg: Msg) => void
}

type Msg = MsgOf<typeof Settings>

export const TabController = ({ competition, user, onMsg }: Props) => {
    const [activeTab, setActiveTab] = useState<Tab>({ type: 'leaderboard' })

    useEffect(() => {
        const tabContent = document.getElementById('tab-content')
        if (tabContent) {
            // FIXME: get dynamic heights of navbar and btmNav
            tabContent.style.height = `${window.innerHeight - 64 - 64}px`
        }
    }, [])

    return (
        <div className="container mx-auto flex flex-col h-full justify-between">
            <div className="navbar bg-white text-secondary">
                <img className="h-10" src={competition.logo} alt="logo" />
                <span className="normal-case text-xl">{competition.name}</span>
            </div>
            <div className="flex-1" id="tab-content">
                <Content
                    activeTab={activeTab}
                    competition={competition}
                    user={user}
                    onMsg={onMsg}
                />
            </div>
            <BottomNav
                activeTab={activeTab}
                onTabSelect={(tab) => setActiveTab(tab)}
            />
        </div>
    )
}

const Content = ({
    activeTab,
    competition,
    user,
    onMsg,
}: {
    activeTab: Tab
    competition: Competition
    user: User
    onMsg: (msg: Msg) => void
}) => {
    switch (activeTab.type) {
        case 'leaderboard':
            return <Leaderboard competition={competition} user={user} />
        case 'my_picks':
            return <MyPicks competition={competition} user={user} />
        case 'matches':
            return <Matches competition={competition} user={user} />
        case 'settings':
            return <Settings competition={competition} onMsg={onMsg} user={user} />
        /* istanbul ignore next */
        default:
            return notReachable(activeTab)
    }
}
