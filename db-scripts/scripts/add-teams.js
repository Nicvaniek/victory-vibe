const {
    collection,
    doc,
    getDocs,
    getFirestore,
    query,
    updateDoc,
} = require('firebase/firestore')
const { initializeApp } =  require('firebase/app')

const firebaseConfig = {
   
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

const addTeams = async () => {
    const q = query(collection(db, 'teams'))
    const snapshot = await getDocs(q)

    const competitionTeams = snapshot.docs.map((doc) => ({
        name: 'test',
        team: doc.data(),
    }))

    const compDocRef = doc(db, 'competitions', '5VGk9pp55mvSTRSJmyJb')
    updateDoc(compDocRef, { teams: competitionTeams })
}

// Call the insertData function
addTeams()
