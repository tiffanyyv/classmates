// PUT: /pages/api/endorsements/mentees/[mentee_id].js
import { db } from '../../../../utils/api/firebase.config';
import {
  collection,
  doc,
  updateDoc,
  increment
} from "firebase/firestore";

export default async function updateMenteeEndorsements(req, res) {
  const { mentee_id } = req.query;
  try {
    const docRef = doc(db, 'mentees', mentee_id);
    // auto increments endosements of mentor by 1
    const docSnap = await updateDoc(docRef, {
      endorsements: increment(1)
    });
    res.status(200).send(`Successfully updated endorsements for mentee ${mentee_id}`);
  } catch (err) {
    res.status(400).send(`Error updating endorsements for mentee ${mentee_id}, ${err}`);
  }
  default:
      res.setHeader('Allow', ['GET', 'PUT']);
      res.status(405).end(`Method ${method} Not Allowed`);
}