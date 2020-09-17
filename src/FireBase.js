import firebase from 'firebase';

const FirebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyB1poxK0zqDzI_0ikw-2er6DvTLcIqHmQU",
  authDomain: "instagramclone-b146e.firebaseapp.com",
  databaseURL: "https://instagramclone-b146e.firebaseio.com",
  projectId: "instagramclone-b146e",
  storageBucket: "instagramclone-b146e.appspot.com",
  messagingSenderId: "583593730459",
  appId: "1:583593730459:web:74761eadc236b2767b813e",
  measurementId: "G-ZQJFP5CKT6"
});

const db = FirebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };