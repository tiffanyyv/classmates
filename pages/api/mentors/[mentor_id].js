// GET: /pages/api/mentors/[mentor_id].js
import { db } from '../../../utils/api/firebase.config';
import { collection, doc, getDoc } from "firebase/firestore";

export default async function getMentorInfo(req, res) {
  const { mentor_id } = req.query;
  try {
    const docRef = doc(db, 'mentors', mentor_id);
    const docSnap = await getDoc(docRef);
    res.status(200).json(docSnap.data());
  } catch (err) {
    res.status(400).send(`Error retrieving user info: ${err}`);
  }
}