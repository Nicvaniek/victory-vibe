const { doc, getDoc, updateDoc } = require('firebase/firestore')
const fetch = require('node-fetch')

const getStage = (match) => {
    if (match.eventPhase.includes('Pool')) {
        return 'GROUP'
    }
    if (match.eventPhase.includes('Quarter')) {
        return 'QUARTER_FINAL'
    }
    if (match.eventPhase.includes('Semi')) {
        return 'SEMI_FINAL'
    }
    if (match.eventPhase.includes('Bronze')) {
        return 'BRONZE_FINAL'
    }
    if (match.eventPhase == 'Final') {
        return 'FINAL'
    }
}
const addRwc23Matches = async (db) => {
    const response = await fetch(
        'https://api.wr-rims-prod.pulselive.com/rugby/v3/event/1893/schedule?language=en'
    )

    const data = await response.json()
    const { matches } = data

    const compDocRef = doc(db, 'competitions', '5VGk9pp55mvSTRSJmyJb')
    const snapshot = await getDoc(compDocRef)

    const comp = snapshot.data()

    const docsToInsert = matches.map((match) => {
        const homeTeam = comp['teams'].find(
            (compTeam) => compTeam.name === match.teams[0].name
        )

        if (!homeTeam) {
            console.error('Home Team not found')
        }

        const awayTeam = comp['teams'].find(
            (compTeam) => compTeam.name === match.teams[1].name
        )

        if (!homeTeam) {
            console.error('Away Team not found')
        }

        return {
            id: match['matchId'],
            homeTeam: homeTeam || null,
            awayTeam: awayTeam || null,
            stage: getStage(match),
            date: match['time']['label'],
            result: null,
        }
    })

    await updateDoc(compDocRef, { matches: docsToInsert })
}

module.exports = addRwc23Matches
