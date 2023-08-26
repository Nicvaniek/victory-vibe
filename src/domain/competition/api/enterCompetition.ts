import { Competition } from '../index'
import { arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { db } from '../../../firebase'
import { User } from '../../../auth'

export const enterCompetition = async ({
    competition,
    user,
}: {
    competition: Competition
    user: User
}): Promise<void> => {
    const docRef = doc(db, 'competitions', competition.id)
    return updateDoc(docRef, { participants: arrayUnion({ user, picks: [] }) })
}
