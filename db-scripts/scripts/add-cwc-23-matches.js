const { doc, getDoc, updateDoc } = require('firebase/firestore')
const fetch = require('node-fetch')

const getStage = (match) => {
    if (match.label.includes('Match')) {
        return 'GROUP'
    }
    if (match.label.includes('Semi-Final')) {
        return 'SEMI_FINAL'
    }
    if (match.label === 'Final') {
        return 'FINAL'
    }
}
const addCwc23Matches = async (db) => {
    const response = await fetch(
        'https://api.icc.cdp.pulselive.com/fixtures?tournamentIds=100364&matchStates=C%2CU%2CL&page=0&pageSize=100&sort=asc'
    )

    const data = await response.json()
    const { content: matches } = data

    const compDocRef = doc(db, 'competitions', 't9lqpwAnOMKznMEc1IzV')
    const snapshot = await getDoc(compDocRef)

    const comp = snapshot.data()

    const docsToInsert = matches.map((match) => {
        const homeTeam = comp['teams'].find(
            (compTeam) =>
                compTeam.name === match.scheduleEntry.team1.team.fullName
        )

        if (!homeTeam) {
            console.error('Home Team not found')
        }

        const awayTeam = comp['teams'].find(
            (compTeam) =>
                compTeam.name === match.scheduleEntry.team2.team.fullName
        )

        if (!homeTeam) {
            console.error('Away Team not found')
        }

        return {
            id: match['scheduleEntry']['matchId']['id'],
            homeTeam: homeTeam || null,
            awayTeam: awayTeam || null,
            stage: getStage(match),
            date: match['scheduleEntry']['matchDate'].split('T')[0],
            result: null,
        }
    })

    await updateDoc(compDocRef, { matches: docsToInsert })
}

module.exports = { addCwc23Matches }
