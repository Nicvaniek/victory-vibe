const {
    collection,
    doc,
    addDoc,
    getDocs,
    query,
    updateDoc,
} = require('firebase/firestore')

const addMenRugbyIntlTeams = async (db) => {
    const teams = [
        {
            name: 'Argentina Men First Team Rugby',
            logo: 'https://flagcdn.com/ar.svg',
            ranking: 7,
            rankingPoints: 0,
        },
        {
            name: 'Australia Men First Team Rugby',
            logo: 'https://flagcdn.com/au.svg',
            ranking: 8,
            rankingPoints: 0,
        },
        {
            name: 'Chile Men First Team Rugby',
            logo: 'https://flagcdn.com/cl.svg',
            ranking: 22,
            rankingPoints: 0,
        },
        {
            name: 'England Men First Team Rugby',
            logo: 'https://flagcdn.com/gb-eng.svg',
            ranking: 6,
            rankingPoints: 0,
        },
        {
            name: 'Fiji Men First Team Rugby',
            logo: 'https://flagcdn.com/fj.svg',
            ranking: 9,
            rankingPoints: 0,
        },
        {
            name: 'France Men First Team Rugby',
            logo: 'https://flagcdn.com/fr.svg',
            ranking: 4,
            rankingPoints: 0,
        },
        {
            name: 'Georgia Men First Team Rugby',
            logo: 'https://flagcdn.com/ge.svg',
            ranking: 11,
            rankingPoints: 0,
        },
        {
            name: 'Ireland Men First Team Rugby',
            logo: 'https://flagcdn.com/ie.svg',
            ranking: 1,
            rankingPoints: 0,
        },
        {
            name: 'Italy Men First Team Rugby',
            logo: 'https://flagcdn.com/it.svg',
            ranking: 13,
            rankingPoints: 0,
        },
        {
            name: 'Japan Men First Team Rugby',
            logo: 'https://flagcdn.com/jp.svg',
            ranking: 14,
            rankingPoints: 0,
        },
        {
            name: 'Namibia Men First Team Rugby',
            logo: 'https://flagcdn.com/na.svg',
            ranking: 21,
            rankingPoints: 0,
        },
        {
            name: 'New Zealand Men First Team Rugby',
            logo: 'https://flagcdn.com/nz.svg',
            ranking: 2,
            rankingPoints: 0,
        },
        {
            name: 'Portugal Men First Team Rugby',
            logo: 'https://flagcdn.com/pt.svg',
            ranking: 16,
            rankingPoints: 0,
        },
        {
            name: 'Romania Men First Team Rugby',
            logo: 'https://flagcdn.com/ro.svg',
            ranking: 19,
            rankingPoints: 0,
        },
        {
            name: 'Samoa Men First Team Rugby',
            logo: 'https://flagcdn.com/as.svg',
            ranking: 12,
            rankingPoints: 0,
        },
        {
            name: 'Scotland Men First Team Rugby',
            logo: 'https://flagcdn.com/gb-sct.svg',
            ranking: 5,
            rankingPoints: 0,
        },
        {
            name: 'South Africa Men First Team Rugby',
            logo: 'https://flagcdn.com/za.svg',
            ranking: 3,
            rankingPoints: 0,
        },
        {
            name: 'Tonga Men First Team Rugby',
            logo: 'https://flagcdn.com/to.svg',
            ranking: 15,
            rankingPoints: 0,
        },
        {
            name: 'Uruguay Men First Team Rugby',
            logo: 'https://flagcdn.com/uy.svg',
            ranking: 17,
            rankingPoints: 0,
        },
        {
            name: 'Wales Men First Team Rugby',
            logo: 'https://flagcdn.com/gb-wls.svg',
            ranking: 10,
            rankingPoints: 0,
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

module.exports = addMenRugbyIntlTeams
