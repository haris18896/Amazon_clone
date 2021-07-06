/* eslint-disable no-unused-vars */
import firebase from 'firebase';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAyQXDbroYMR2V4FORIb1UdDc22K5Dw5RU",
    authDomain: "clone-4cb1b.firebaseapp.com",
    projectId: "clone-4cb1b",
    storageBucket: "clone-4cb1b.appspot.com",
    messagingSenderId: "648702785388",
    appId: "1:648702785388:web:09f8c365d4c113373ae549",
    measurementId: "G-PGJ2ZPT133"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export {db, auth};