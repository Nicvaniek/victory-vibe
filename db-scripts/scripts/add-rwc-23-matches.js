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

const addQuarterFinals = async (db) => {
    const compDocRef = doc(db, 'competitions', '5VGk9pp55mvSTRSJmyJb')
    const snapshot = await getDoc(compDocRef)

    const comp = snapshot.data()

    const updatedMatches = comp['matches'].map((match) => {
        if (match.id === '28806') {
            const homeTeam = comp['teams'].find(
                (compTeam) => compTeam.name === 'Fiji'
            )

            if (!homeTeam) {
                console.error('Home Team not found for QF 28806')
            }

            const awayTeam = comp['teams'].find(
                (compTeam) => compTeam.name === 'Japan'
            )

            if (!homeTeam) {
                console.error('Away Team not found for QF 28806')
            }

            return { ...match, homeTeam, awayTeam }
        }

        if (match.id === '28807') {
            const homeTeam = comp['teams'].find(
                (compTeam) => compTeam.name === 'South Africa'
            )

            if (!homeTeam) {
                console.error('Home Team not found for QF 28807')
            }

            const awayTeam = comp['teams'].find(
                (compTeam) => compTeam.name === 'France'
            )

            if (!homeTeam) {
                console.error('Away Team not found for QF 28807')
            }

            return { ...match, homeTeam, awayTeam }
        }

        if (match.id === '28808') {
            const homeTeam = comp['teams'].find(
                (compTeam) => compTeam.name === 'Argentina'
            )

            if (!homeTeam) {
                console.error('Home Team not found for QF 28808')
            }

            const awayTeam = comp['teams'].find(
                (compTeam) => compTeam.name === 'Wales'
            )

            if (!homeTeam) {
                console.error('Away Team not found for QF 28808')
            }

            return { ...match, homeTeam, awayTeam }
        }

        if (match.id === '28809') {
            const homeTeam = comp['teams'].find(
                (compTeam) => compTeam.name === 'New Zealand'
            )

            if (!homeTeam) {
                console.error('Home Team not found for QF 28809')
            }

            const awayTeam = comp['teams'].find(
                (compTeam) => compTeam.name === 'Ireland'
            )

            if (!homeTeam) {
                console.error('Away Team not found for QF 28809')
            }

            return { ...match, homeTeam, awayTeam }
        }

        return match
    })

    await updateDoc(compDocRef, { matches: updatedMatches })
}

const addSemiFinals = async (db) => {
    const compDocRef = doc(db, 'competitions', '5VGk9pp55mvSTRSJmyJb')
    const snapshot = await getDoc(compDocRef)

    const comp = snapshot.data()

    const updatedMatches = comp['matches'].map((match) => {
        if (match.id === '28810') {
            const homeTeam = comp['teams'].find(
                (compTeam) => compTeam.name === 'South Africa'
            )

            if (!homeTeam) {
                console.error('Home Team not found for QF 28810')
            }

            const awayTeam = comp['teams'].find(
                (compTeam) => compTeam.name === 'Fiji'
            )

            if (!homeTeam) {
                console.error('Away Team not found for QF 28810')
            }

            return { ...match, homeTeam, awayTeam }
        }

        if (match.id === '28811') {
            const homeTeam = comp['teams'].find(
                (compTeam) => compTeam.name === 'Ireland'
            )

            if (!homeTeam) {
                console.error('Home Team not found for QF 28811')
            }

            const awayTeam = comp['teams'].find(
                (compTeam) => compTeam.name === 'Wales'
            )

            if (!homeTeam) {
                console.error('Away Team not found for QF 28811')
            }

            return { ...match, homeTeam, awayTeam }
        }

        return match
    })

    await updateDoc(compDocRef, { matches: updatedMatches })
}

const addFinal = async (db) => {
    const compDocRef = doc(db, 'competitions', '5VGk9pp55mvSTRSJmyJb')
    const snapshot = await getDoc(compDocRef)

    const comp = snapshot.data()

    const updatedMatches = comp['matches'].map((match) => {
        if (match.id === '28813') {
            const homeTeam = comp['teams'].find(
                (compTeam) => compTeam.name === 'South Africa'
            )

            if (!homeTeam) {
                console.error('Home Team not found for QF 28813')
            }

            const awayTeam = comp['teams'].find(
                (compTeam) => compTeam.name === 'Ireland'
            )

            if (!homeTeam) {
                console.error('Away Team not found for QF 28813')
            }

            return { ...match, homeTeam, awayTeam }
        }

        return match
    })

    await updateDoc(compDocRef, { matches: updatedMatches })
}

module.exports = { addRwc23Matches, addQuarterFinals, addSemiFinals, addFinal }
