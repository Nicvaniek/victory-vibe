import { User } from '../../../../../auth'
import { Competition } from '../../../index'
import { ParticipantPicks } from '../../../../participant/features/ParticipantPicks'

type Props = {
    user: User
    competition: Competition
}

export const MyPicks = ({ competition, user }: Props) => {
    const participant = competition.participants.find(
        (p) => p.user.id === user.id
    )

    if (!participant) {
        return null
    }

    return (
        <div className="mt-4 h-full">
            <ParticipantPicks
                participant={participant}
                user={user}
                competition={competition}
            />
        </div>
    )
}
