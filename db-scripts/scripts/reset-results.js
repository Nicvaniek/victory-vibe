const { doc, getDoc, updateDoc } =  require('firebase/firestore')

const finalIds = [
    '28806',
    '28807',
    '28808',
    '28809',
    '28810',
    '28811',
    '28812',
    '28813',
]

const resetResults = async (db) => {
    const compDocRef = doc(db, 'competitions', '5VGk9pp55mvSTRSJmyJb')
    const snapshot = await getDoc(compDocRef)

    const comp = snapshot.data()

    const updatedMatches = comp['matches'].map((match) => {
        if (finalIds.includes(match.id)) {
            return { ...match, result: null, homeTeam: null, awayTeam: null }
        }
        return { ...match, result: null }
    })

    await updateDoc(compDocRef, { matches: updatedMatches })
}

module.exports = resetResults
