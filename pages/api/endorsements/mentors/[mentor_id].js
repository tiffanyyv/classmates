// GET: /pages/api/endorsements/mentors/[mentor_id].js
// PUT: /pages/api/endorsements/mentors/[mentor_id].js

import { db } from '../../../../utils/api/firebase.config';
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

export default async function getAndUpdateMentorEndorsements(req, res) {
  const {
    query: { mentor_id },
    method
  } = req;

  switch (method) {
    case 'GET':
      /* getMentorEndorsements */
      try {
        const docRef = doc(db, 'mentors', mentor_id);
        const docSnap = await getDoc(docRef);
        const result = docSnap.data().endorsements;
        res.status(200).json(result);
      } catch (err) {
        res.status(400).send(`Error retrieving endorsements for mentor ${mentor_id}: ${err}`);
      }
      break
    case 'PUT':
      /* updateMentorEndorsements */
      try {
        const docRef = doc(db, 'mentors', mentor_id);
        // auto increments endosements of mentor by 1
        const docSnap = await updateDoc(docRef, {
          endorsements: increment(1)
        });
        res.status(200).send(`Successfully updated endorsements for mentor ${mentor_id}`);
      } catch (err) {
        res.status(400).send(`Error updating endorsements for mentor ${mentor_id}, ${err}`);
      }

      break
    default:
      res.setHeader('Allow', ['GET', 'PUT']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}