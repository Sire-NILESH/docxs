import firebase from "firebase";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBUxR0vZzVDQwGv8fB2OiFX45bmwBdFR_I",
  authDomain: "docs-84a44.firebaseapp.com",
  projectId: "docs-84a44",
  storageBucket: "docs-84a44.appspot.com",
  messagingSenderId: "328941271449",
  appId: "1:328941271449:web:4e4dd880178409bb7dfb08",
  measurementId: "G-NS3J2YHNMW",
};

//for server side rendered like NextJS we might already have it pre-prepared and wouldnt want to do it again so check below
const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();

export { db };
