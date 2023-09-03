import { Participant } from '../../../../participant'
import { Competition } from '../../../index'
import { User } from '../../../../../auth'

type Props = {
    competition: Competition
    user: User
    onMsg: (msg: Msg) => void
}

type Msg = { type: 'on_participant_click'; participant: Participant }

export const Layout = ({ competition, onMsg, user }: Props) => (
    <div className="flex flex-col p-4 h-full">
        <h1 className="text-3xl">Standings</h1>
        <div className="mt-4 overflow-x-auto">
            <table className="table table-fixed border-separate border-spacing-y-2 text-center">
                <thead className="text-white">
                    <tr className="border-0">
                        <th>POS</th>
                        <th className="w-45p">NAME</th>
                        <th>PLD</th>
                        <th>POINTS</th>
                    </tr>
                </thead>
                <tbody>
                    {competition.participants.map((participant, idx) => {
                        const isLoggedInUser = participant.user.id === user.id
                        return (
                            <tr
                                className="bg-white text-secondary"
                                style={{ cursor: 'pointer' }}
                                onClick={() =>
                                    onMsg({
                                        type: 'on_participant_click',
                                        participant,
                                    })
                                }
                            >
                                <th
                                    className={`rounded-l-xl px-0 ${
                                        isLoggedInUser ? 'text-accent' : ''
                                    }`}
                                >
                                    {participant.rank}
                                </th>
                                <td
                                    className={`whitespace-nowrap overflow-hidden text-ellipsis px-1 text-left ${
                                        isLoggedInUser ? 'text-accent' : ''
                                    }`}
                                >
                                    <span className="ml-1">{participant.user.name}</span>
                                </td>
                                <td
                                    className={`px-0 ${
                                        isLoggedInUser ? 'text-accent' : ''
                                    }`}
                                >
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
                        )
                    })}
                </tbody>
            </table>
        </div>
    </div>
)
