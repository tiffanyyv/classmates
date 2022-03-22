// https://firebase.google.com/docs/firestore/quickstart
import { app, db } from '../db/firestoreConfigPH';
import { collection, doc, getDoc } from "firebase/firestore";

/* READ */

// TO DO: update id parameter to be a look up by user's uid instead
const getUserInfo = async (req, res) => {

  // USER WILL NEED TO SEND ACCESS TOKEN IN AUTHENTICATION HEADER

  // grab account type and id from req.query
  // https://nextjs.org/docs/api-routes/dynamic-api-routes
  // let { uid } = req.query;

  // NEED TO CHANGE TO UID FROM AUTH!!!!
  const id = '1'; // (needed to be string for query)
  const account_type = 'mentees' // 'mentors'
  try {
    const docRef = doc(db, account_type, id);
    const docSnap = await getDoc(docRef);
    console.log('user info: ', docSnap.data());
    // res.send(docSnap.data());
  } catch (err) {
    console.log('No such document', err);
    // res.status(400).send(err);
  }
};

/* CREATE */

const addMentee = async (req, res) => {

}

export { getUserInfo };