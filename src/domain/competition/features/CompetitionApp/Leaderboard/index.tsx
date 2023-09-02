import { Competition } from '../../../index'
import { Participant } from '../../../../participant'

type Props = {
    competition: Competition
}

const sortByPoints = (a: Participant, b: Participant) => (a.points = b.points)

export const Leaderboard = ({ competition }: Props) => {
    const sorted = competition.participants.sort(sortByPoints)

    return (
        <div className="flex flex-col p-4 h-full">
            <h1 className="text-3xl">Standings</h1>
            <div className="mt-4 overflow-x-auto">
                <table className="table table-fixed border-separate border-spacing-y-2 text-center">
                    <thead className="text-white">
                        <tr className="border-0">
                            <th>POS</th>
                            <th className="w-1/2">NAME</th>
                            <th>PLD</th>
                            <th>POINTS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sorted.map((participant, idx) => (
                            <tr className="bg-white text-secondary">
                                <th className="rounded-l-xl px-0">{idx + 1}</th>
                                <td className="whitespace-nowrap overflow-hidden text-ellipsis px-1">
                                    {participant.user.name}
                                </td>
                                <td className="px-0">
                                    {participant.matchesPlayed || 0}
                                </td>
                                <td
                                    className={`rounded-r-xl bg-accent bg-opac text-white font-bold px-0 ${
                                        idx < 3
                                            ? 'bg-opacity-100'
                                            : 'bg-opacity-75'
                                    }`}
                                >
                                    {participant.points || 0}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
