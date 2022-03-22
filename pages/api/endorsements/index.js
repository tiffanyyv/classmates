// GET: /pages/api/endorsements/index.js
import { db } from '../../../utils/api/firebase.config';
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

export default async function getTopEndorsements(req, res) {
  try {
    const q = query(collection(db, 'mentors'), orderBy('endorsements', 'desc'), limit(10));
    const querySnapshot = await getDocs(q);

    const result = [];
    querySnapshot.forEach(doc => {
      result.push(doc.data());
      console.log(doc.data());
    })

    const transformResult = result.map(rank => {
      return {
        id: rank.id,
        name: rank.name,
        endorsements: rank.endorsements
      }
    });

    res.status(200).json(transformResult);

  } catch (err) {

    res.status(400).send(`Error retrieving top endorsements: ${err}`);

  }
}