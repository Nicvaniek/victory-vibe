import { Competition } from '../index'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../../firebase'

export const fetchCompetition = async ({
    competition,
}: {
    competition: Competition
}): Promise<Competition> => {
    const docRef = doc(db, 'competitions', competition.id)
    const snapshot = await getDoc(docRef)

    if (!snapshot.exists()) {
        throw new Error('CompetitionApp does not exist')
    }

    return snapshot.data() as Competition
}
