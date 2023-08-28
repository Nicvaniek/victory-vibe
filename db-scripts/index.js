const {
    collection,
    doc,
    getDocs,
    getFirestore,
    query,
    updateDoc,
} = require('firebase/firestore')
const { initializeApp } = require('firebase/app')
const addMenRugbyIntlTeams = require('./scripts/add-men-rugby-intl-teams')
const addRwc23Teams = require('./scripts/add-rwc-23-teams')
const addRwc23Matches = require('./scripts/add-rwc-23-matches')

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


// addMenRugbyIntlTeams(db)
// addRwc23Teams(db)
addRwc23Matches(db)