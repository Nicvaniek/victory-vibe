// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
//FIXME:: ENV VARS
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

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)
