import { Competition } from '../../../index'
import { Tab, Tabs } from './Tabs'
import { useState } from 'react'
import { notReachable } from '../../../../../toolkit/notReachable'
import { ListItem } from '../../../../match/components/ListItem'
import { Match } from '../../../../match'
import { FormattedDate } from 'react-intl'
import { User } from '../../../../../auth'

type Props = {
    competition: Competition
    user: User
}

const groupByDate = (matches: Match[]): Map<string, Match[]> =>
    matches.reduce((memo, match) => {
        const matches = memo.get(match.date) || []
        matches.push(match)
        memo.set(match.date, matches)
        return memo
    }, new Map<string, Match[]>())

export const Matches = ({ competition, user }: Props) => {
    const [activeTab, setActiveTab] = useState<Tab>({ type: 'fixtures' })
    const [picksOnly, setPicksOnly] = useState(false)

    const picks =
        competition.participants.find((p) => p.user.id === user.id)?.picks || []

    const matches = competition.matches
        .filter((match) => {
            switch (activeTab.type) {
                case 'fixtures':
                    return !match.result
                case 'results':
                    return !!match.result
                /* istanbul ignore next */
                default:
                    return notReachable(activeTab)
            }
        })
        .filter(
            (m) =>
                !picksOnly ||
                (m.homeTeam &&
                    m.awayTeam &&
                    (picks.map((p) => p.name).includes(m.homeTeam.name) ||
                        picks.map((p) => p.name).includes(m.awayTeam.name)))
        )

    return (
        <div className="flex flex-col p-4 h-full">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl">Matches</h1>
                <div className="form-control">
                    <label className="cursor-pointer label">
                        <span className="label-text text-white mr-4">
                            My picks only
                        </span>
                        <input
                            onChange={() => setPicksOnly((prev) => !prev)}
                            type="checkbox"
                            className="toggle toggle-accent"
                            checked={picksOnly}
                        />
                    </label>
                </div>
            </div>
            <Tabs activeTab={activeTab} onTabSelect={setActiveTab} />
            <div className="mt-4 overflow-auto">
                <Content matches={matches} />
            </div>
        </div>
    )
}

const Content = ({ matches }: { matches: Match[] }) => {
    const grouped = groupByDate(matches)
    return Array.from(grouped.entries()).map(([date, matches]) => (
        <>
            <div className="mb-1 mt-3">
                <FormattedDate
                    value={new Date(date)}
                    weekday="long"
                    day="numeric"
                    month="long"
                />
            </div>
            {matches.map((match) => (
                <ListItem match={match} />
            ))}
        </>
    ))
}
