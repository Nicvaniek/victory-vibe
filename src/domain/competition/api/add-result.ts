import { Competition } from '../index'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '../../../firebase'
import { Match, Result } from '../../match'

export const addResult = async ({
    competition,
    match,
    result,
}: {
    competition: Competition
    match: Match
    result: Result
}): Promise<void> => {
    const docRef = doc(db, 'competitions', competition.id)
    const snapshot = await getDoc(docRef)

    if (!snapshot.exists()) {
        throw new Error('CompetitionApp does not exist')
    }

    const { matches } = (await getDoc(docRef)).data() as Competition

    const idx = matches.findIndex((m) => m.id === match.id)

    if (idx === -1) {
        const error = `Match ${match.id} not found`
        console.error(error)
        throw new Error(error)
    }

    matches[idx].result = result

    return updateDoc(docRef, { matches })
}
