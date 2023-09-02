const {
    collection,
    doc,
    addDoc,
    getDocs,
    query,
    updateDoc,
} = require('firebase/firestore')

const addRwc23Teams = async (db) => {
    const q = query(collection(db, 'teams'))
    const snapshot = await getDocs(q)

    const competitionTeams = snapshot.docs.map((doc) => {
        const team = doc.data()
        const name = team.name.split('Men')[0].trim()

        return {
            name,
            rankingMultiplier: 1,
            tier: 1,
            team,
        }
    })

    const compDocRef = doc(db, 'competitions', '5VGk9pp55mvSTRSJmyJb')
    updateDoc(compDocRef, { teams: competitionTeams })
}

module.exports = addRwc23Teams
