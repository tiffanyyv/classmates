// https://firebase.google.com/docs/firestore/quickstart
import { app, db } from './firestoreConfigPH';
import {
  collection,
  query,
  where,
  doc,
  getDoc,
  getDocs,
  orderBy,
  limit,
  updateDoc,
  increment
} from "firebase/firestore";

/* READ */

const getTopEndorsements = async (req, res) => {
  try {
    const q = query(collection(db, 'mentors'), orderBy('endorsements', 'desc'), limit(10));
    const querySnapshot = await getDocs(q);
    const result = [];
    querySnapshot.forEach(doc => {
      result.push(doc.data());
    })

    const transformResult = result.map(rank => {
      return {
        id: rank.id,
        name: rank.name,
        endorsements: rank.endorsements
      }
    });
    console.log('top rankings: ', transformResult);
  } catch (err) {
    console.log('No such document', err);
    // res.status(400).send(err);
  }
};

// getMentorRankings
const getMentorEndorsements = async (req, res) => {
  // let { id } = req.query
  let id = '1';

  try {
    const docRef = doc(db, 'mentors', id);
    const docSnap = await getDoc(docRef);
    // console.log('mentor rankings: ', docSnap.data());
    const result = docSnap.data().endorsements;
    console.log('mentor endorsements: ', result);
    // res.send(result);
  } catch (err) {
    console.log('No such document', err);
    // res.status(400).send(err);
  }
};

// updateMentorRanking
// https://firebase.google.com/docs/firestore/manage-data/add-data
const updateMentorEndorsements = async (req, res) => {

  const { id } = req.query; // mentor uid
  try {
    const docRef = doc(db, 'mentors', id);
    // auto increments endosements of mentor by 1
    const docSnap = await updateDoc(docRef, {
      endorsements: increment(1)
    });

    console.log('updated mentor endorsements: ', docSnap);
    // res.send(result);
  } catch (err) {
    console.log('No such document', err);
    // res.status(400).send(err);
  }
}


export { getTopEndorsements, getMentorEndorsements, updateMentorEndorsements};