import { Competition } from '../index'
import { CompetitionTeam } from '../../competition-team'
import { getDoc, doc, updateDoc } from 'firebase/firestore'
import { db } from '../../../firebase'
import { User } from '../../../auth'

export const saveParticipantPicks = async ({
    user,
    competition,
    picks,
}: {
    user: User
    competition: Competition
    picks: CompetitionTeam[]
}): Promise<void> => {
    const docRef = doc(db, 'competitions', competition.id)

    const { participants } = (await getDoc(docRef)).data() as Competition
    const idx = participants.findIndex((p) => p.user.id === user.id)

    if (idx === -1) {
        const error = `Participant ${user.id} not found`
        console.error(error)
        throw new Error(error)
    }

    participants[idx].picks = picks

    return updateDoc(docRef, { participants })
}
