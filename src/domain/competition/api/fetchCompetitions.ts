import { Competition } from '../index'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../../firebase'

export const fetchCompetitions = async (): Promise<Competition[]> => {
    const snapshot = await getDocs(collection(db, 'competitions'))
    return snapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() }) as Competition
    )
}
