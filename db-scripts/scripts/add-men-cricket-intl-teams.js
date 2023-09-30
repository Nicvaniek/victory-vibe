const {
    collection,
    doc,
    addDoc,
    getDocs,
    query,
    updateDoc,
} = require('firebase/firestore')

const addMenCricketIntlTeams = async (db) => {
    const teams = [
        {
            name: 'Afghanistan Men ODI Team',
            logo: 'https://flagcdn.com/af.svg',
            ranking: 9,
            rankingPoints: 80,
        },
        {
            name: 'Australia Men ODI Team',
            logo: 'https://flagcdn.com/au.svg',
            ranking: 3,
            rankingPoints: 112,
        },
        {
            name: 'Bangladesh Men ODI Team',
            logo: 'https://flagcdn.com/bd.svg',
            ranking: 8,
            rankingPoints: 92,
        },
        {
            name: 'England Men ODI Team',
            logo: 'https://flagcdn.com/gb-eng.svg',
            ranking: 5,
            rankingPoints: 105,
        },
        {
            name: 'India Men ODI Team',
            logo: 'https://flagcdn.com/in.svg',
            ranking: 1,
            rankingPoints: 116,
        },
        {
            name: 'Netherlands Men ODI Team',
            logo: 'https://flagcdn.com/nl.svg',
            ranking: 14,
            rankingPoints: 37,
        },
        {
            name: 'New Zealand Men ODI Team',
            logo: 'https://flagcdn.com/nz.svg',
            ranking: 6,
            rankingPoints: 103,
        },
        {
            name: 'Pakistan Men ODI Team',
            logo: 'https://flagcdn.com/pk.svg',
            ranking: 2,
            rankingPoints: 115,
        },
        {
            name: 'South Africa Men ODI Team',
            logo: 'https://flagcdn.com/za.svg',
            ranking: 4,
            rankingPoints: 106,
        },
        {
            name: 'Sri Lanka Men ODI Team',
            logo: 'https://flagcdn.com/lk.svg',
            ranking: 7,
            rankingPoints: 92,
        },
    ]

    try {
        for (const team of teams) {
            await addDoc(collection(db, "teams"), team)
        }
    } catch (error) {
        console.error(error)
    }
}

module.exports = addMenCricketIntlTeams
