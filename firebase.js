// import firebase from "firebase";

// //for server side rendered like NextJS we might already have it pre-prepared and wouldnt want to do it again so check below
// const app = !firebase.firebase.apps.length
//   ? firebase.firebase.initializeApp(firebaseConfig)
//   : firebase.firebase.app();

// const db = app.firestore();

// export { db };

import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASECONFIG_APIKEY,
  authDomain: process.env.FIREBASECONFIG_AUTH_DOMAIN,
  projectId: process.env.FIREBASECONFIG_PROJECT_ID,
  storageBucket: process.env.FIREBASECONFIG_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASECONFIG_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASECONFIG_APP_ID,
  measurementId: process.env.FIREBASECONFIG_MEASUREMENT_ID,
};

//for server side rendered like NextJS we might already have it pre-prepared and wouldnt want to do it again so check below
const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();

export { db };
