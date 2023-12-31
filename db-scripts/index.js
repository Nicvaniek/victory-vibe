const { getFirestore } = require('firebase/firestore')
const { initializeApp } = require('firebase/app')
const addMenRugbyIntlTeams = require('./scripts/add-men-rugby-intl-teams')
const addMenCricketIntlTeams = require('./scripts/add-men-cricket-intl-teams')
const addRwc23Teams = require('./scripts/add-rwc-23-teams')
const addCwc23Teams = require('./scripts/add-cwc-23-teams')
const {
    addRwc23Matches,
    addQuarterFinals,
    addSemiFinals,
    addFinal,
    addBronzeFinal,
} = require('./scripts/add-rwc-23-matches')
const resetResults = require('./scripts/reset-results')
const { addCwc23Matches } = require('./scripts/add-cwc-23-matches')

const firebaseConfig = {
    apiKey: 'AIzaSyAdJKM5JfNJTgAHUKzNcO44Wls76cANXHc',
    authDomain: 'victory-vibe.firebaseapp.com',
    databaseURL: 'https://victory-vibe-default-rtdb.firebaseio.com',
    projectId: 'victory-vibe',
    storageBucket: 'victory-vibe.appspot.com',
    messagingSenderId: '688500937910',
    appId: '1:688500937910:web:e0b967aac31e3cdc9bc217',
    measurementId: 'G-4VE5WPY62F',
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

// addMenCricketIntlTeams(db)
// addCwc23Teams(db)
// addCwc23Matches(db)
// addRwc23Teams(db)
// addRwc23Matches(db)
// addQuarterFinals(db)
// addSemiFinals(db)
// addBronzeFinal(db)
addFinal(db)
// resetResults(db)

return 0
