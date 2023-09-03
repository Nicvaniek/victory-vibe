import { Competition } from '../../../index'
import { FormattedDate } from 'react-intl'
import { Match, Result } from '../../../../match'
import { notReachable } from '../../../../../toolkit/notReachable'
import { useLazyLoadableData } from '../../../../../toolkit/LoadableData/LazyLoadableData'
import { addResult } from '../../../api/add-result'
import { CompetitionTeam } from '../../../../competition-team'
import { useEffect } from 'react'
import { useLiveRef } from '../../../../../toolkit/useLiveRef'

type Props = {
    competition: Competition
    onMsg: (msg: Msg) => void
}

type Msg = { type: 'result_added' }

const groupByDate = (matches: Match[]): Map<string, Match[]> =>
    matches.reduce((memo, match) => {
        const matches = memo.get(match.date) || []
        matches.push(match)
        memo.set(match.date, matches)
        return memo
    }, new Map<string, Match[]>())

export const AddResults = ({ competition, onMsg }: Props) => {
    const grouped = groupByDate(competition.matches)
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
                <Item match={match} competition={competition} onMsg={onMsg} />
            ))}
        </>
    ))
}

const Item = ({
    match,
    onMsg,
    competition,
}: {
    match: Match
    onMsg: (msg: Msg) => void
    competition: Competition
}) => {
    const [loadable, setLoadable] = useLazyLoadableData(addResult)

    const liveMsg = useLiveRef(onMsg)

    useEffect(() => {
        switch (loadable.type) {
            case 'not_asked':
            case 'loading':
            case 'loaded':
                liveMsg.current({ type: 'result_added' })
                break
            case 'error':
                console.log(loadable.error)
                break
            /* istanbul ignore next */
            default:
                return notReachable(loadable)
        }
    }, [liveMsg, loadable])

    switch (loadable.type) {
        case 'not_asked':
        case 'loaded':
            return (
                <div className="flex flex-col bg-white text-secondary mb-2 py-2 px-3 rounded-xl">
                    <div className="flex flex-row flex-1 justify-center items-center">
                        <div className="flex items-center flex-1 justify-end">
                            {match.homeTeam && (
                                <>
                                    <span className="mr-3">
                                        {match.homeTeam.name}
                                    </span>
                                    <div className="avatar">
                                        <div className="w-9 rounded-full">
                                            <img
                                                src={match.homeTeam.team.logo}
                                                alt={match.homeTeam.name}
                                            />
                                        </div>
                                    </div>
                                </>
                            )}
                            {!match.homeTeam && <span>TBC</span>}
                        </div>

                        <span className="mx-3">vs</span>

                        <div className="flex items-center flex-1 justify-start">
                            {!match.awayTeam && <span>TBC</span>}
                            {match.awayTeam && (
                                <>
                                    <div className="avatar">
                                        <div className="w-9 rounded-full">
                                            <img
                                                src={match.awayTeam.team.logo}
                                                alt={match.awayTeam.name}
                                            />
                                        </div>
                                    </div>
                                    <span className="ml-3">
                                        {match.awayTeam.name}
                                    </span>
                                </>
                            )}
                        </div>
                    </div>
                    <Buttons
                        match={match}
                        onClick={(result) =>
                            setLoadable({
                                type: 'loading',
                                params: { result, competition, match },
                            })
                        }
                    />
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

const Buttons = ({
    match,
    onClick,
}: {
    match: Match
    onClick: (result: Result) => void
}) => {
    if (!match.result) {
        return (
            <>
                {match.homeTeam &&
                    ((team: CompetitionTeam) => {
                        return (
                            <button
                                className="btn btn-sm bg-accent text-white border-accent mt-2"
                                onClick={() =>
                                    onClick({
                                        type: 'victory',
                                        winner: team,
                                    })
                                }
                            >
                                {match.homeTeam.name}
                            </button>
                        )
                    })(match.homeTeam)}
                {match.awayTeam &&
                    ((team: CompetitionTeam) => {
                        return (
                            <button
                                className="btn btn-sm bg-accent text-white border-accent mt-2"
                                onClick={() =>
                                    onClick({
                                        type: 'victory',
                                        winner: team,
                                    })
                                }
                            >
                                {match.awayTeam.name}
                            </button>
                        )
                    })(match.awayTeam)}

                <button
                    className="btn btn-sm bg-accent text-white border-accent mt-2"
                    onClick={() => onClick({ type: 'draw' })}
                >
                    Draw
                </button>
            </>
        )
    }

    switch (match.result.type) {
        case 'draw':
            return (
                <>
                    {match.homeTeam &&
                        ((team: CompetitionTeam) => {
                            return (
                                <button
                                    className="btn btn-sm bg-accent text-white border-accent mt-2"
                                    onClick={() =>
                                        onClick({
                                            type: 'victory',
                                            winner: team,
                                        })
                                    }
                                >
                                    {match.homeTeam.name}
                                </button>
                            )
                        })(match.homeTeam)}
                    {match.awayTeam &&
                        ((team: CompetitionTeam) => {
                            return (
                                <button
                                    className="btn btn-sm bg-accent text-white border-accent mt-2"
                                    onClick={() =>
                                        onClick({
                                            type: 'victory',
                                            winner: team,
                                        })
                                    }
                                >
                                    {match.awayTeam.name}
                                </button>
                            )
                        })(match.awayTeam)}

                    <button
                        disabled
                        className="btn btn-sm bg-accent text-white border-accent mt-2"
                    >
                        Draw
                    </button>
                </>
            )
        case 'victory':
            return (
                <>
                    {match.homeTeam &&
                        ((team: CompetitionTeam) => {
                            return (
                                <button
                                    disabled={
                                        match.homeTeam.name ===
                                        match.result.winner.name
                                    }
                                    className="btn btn-sm bg-accent text-white border-accent mt-2"
                                    onClick={() =>
                                        onClick({
                                            type: 'victory',
                                            winner: team,
                                        })
                                    }
                                >
                                    {match.homeTeam.name}
                                </button>
                            )
                        })(match.homeTeam)}
                    {match.awayTeam &&
                        ((team: CompetitionTeam) => {
                            return (
                                <button
                                    disabled={
                                        match.awayTeam.name ===
                                        match.result.winner.name
                                    }
                                    className="btn btn-sm bg-accent text-white border-accent mt-2"
                                    onClick={() =>
                                        onClick({
                                            type: 'victory',
                                            winner: team,
                                        })
                                    }
                                >
                                    {match.awayTeam.name}
                                </button>
                            )
                        })(match.awayTeam)}

                    <button
                        className="btn btn-sm bg-accent text-white border-accent mt-2"
                        onClick={() => onClick({ type: 'draw' })}
                    >
                        Draw
                    </button>
                </>
            )
        /* istanbul ignore next */
        default:
            return notReachable(match.result)
    }
}
