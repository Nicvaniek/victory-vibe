const {
    collection,
    doc,
    addDoc,
    getDocs,
    query,
    updateDoc,
} = require('firebase/firestore')

const addCwc23Teams = async (db) => {
    const q = query(collection(db, 'teams'))
    const snapshot = await getDocs(q)

    const cricketTeams = snapshot.docs.filter((doc) =>
        doc.data().name.includes('ODI')
    )

    const competitionTeams = cricketTeams.map((doc) => {
        const team = doc.data()
        const name = team.name.split('Men')[0].trim()

        return {
            name,
            rankingMultiplier: 1,
            tier: 1,
            team,
        }
    })

    const compDocRef = doc(db, 'competitions', 't9lqpwAnOMKznMEc1IzV')
    updateDoc(compDocRef, { teams: competitionTeams })
}

module.exports = addCwc23Teams
