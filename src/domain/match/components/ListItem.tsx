import { Match } from '../index'
import { notReachable } from '../../../toolkit/notReachable'

type Props = {
    match: Match
}

export const ListItem = ({ match }: Props) => {
    if (!match.result) {
        return (
            <div className="flex flex-row flex-1 bg-white text-secondary mb-2 py-2 px-3 justify-center items-center rounded-xl">
                <div className="flex items-center flex-1 justify-end">
                    {match.homeTeam && (
                        <>
                            <span className="mr-3">{match.homeTeam.name}</span>
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
                            <span className="ml-3">{match.awayTeam.name}</span>
                        </>
                    )}
                </div>
            </div>
        )
    }

    switch (match.result.type) {
        case 'draw': {
            return (
                <div className="flex flex-row flex-1 bg-white text-secondary mb-2 py-2 px-3 justify-center items-center rounded-xl">
                    <div className="flex items-center flex-1 justify-end">
                        {match.homeTeam && (
                            <>
                                <div className="flex flex-col items-center mr-3">
                                    <span>{match.homeTeam.name}</span>
                                    <span className="text-xs">
                                        {match.homeTeam.points} Points
                                    </span>
                                </div>
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
                                <div className="flex flex-col items-center ml-3">
                                    <span>{match.awayTeam.name}</span>
                                    <span className="text-xs">
                                        {match.awayTeam.points} Points
                                    </span>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )
        }
        case 'victory': {
            return (
                <div className="flex flex-row flex-1 bg-white text-secondary mb-2 py-2 px-3 justify-center items-center rounded-xl">
                    <div className="flex items-center flex-1 justify-end">
                        {match.homeTeam && (
                            <>
                                <div
                                    className={`flex flex-col items-center mr-3 ${
                                        match.result.winner.name !==
                                        match.homeTeam.name
                                            ? 'opacity-30'
                                            : ''
                                    }`}
                                >
                                    <span>{match.homeTeam.name}</span>
                                    <span className="text-xs">
                                        {match.homeTeam.points} Points
                                    </span>
                                </div>
                                <div
                                    className={`avatar ${
                                        match.result.winner.name !==
                                        match.homeTeam.name
                                            ? 'opacity-30'
                                            : ''
                                    }`}
                                >
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
                                <div
                                    className={`avatar ${
                                        match.result.winner.name !==
                                        match.awayTeam.name
                                            ? 'opacity-30'
                                            : ''
                                    }`}
                                >
                                    <div className="w-9 rounded-full">
                                        <img
                                            src={match.awayTeam.team.logo}
                                            alt={match.awayTeam.name}
                                        />
                                    </div>
                                </div>
                                <div
                                    className={`flex flex-col items-center ml-3 ${
                                        match.result.winner.name !==
                                        match.awayTeam.name
                                            ? 'opacity-30'
                                            : ''
                                    }`}
                                >
                                    <span>{match.awayTeam.name}</span>
                                    <span className="text-xs">
                                        {match.awayTeam.points} Points
                                    </span>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )
        }
        /* istanbul ignore next */
        default:
            return notReachable(match.result)
    }
}
