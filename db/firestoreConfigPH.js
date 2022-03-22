// DO NOT COMMIT!! THIS IS NOT THE final CONFIG file.

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDNIRDUgFY0pA251t2f5CHbuQ0Ch4S1Z-M",
  authDomain: "classmate-2e39d.firebaseapp.com",
  projectId: "classmate-2e39d",
  storageBucket: "classmate-2e39d.appspot.com",
  messagingSenderId: "913424385250",
  appId: "1:913424385250:web:6f10bb440dfe2bb51d4abb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();

export { app, db };


// FOR API routes, install CORS middle ware?
// https://nextjs.org/docs/api-routes/api-middlewares#connectexpress-middleware-support