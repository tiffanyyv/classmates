import { db } from '../../../../utils/api/firebase.config';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where
} from "firebase/firestore";

export default async function getCoursesByMentorId(req, res) {
  const { mentor_id } = req.query;

  try {
    const q = query(collection(db, 'courses'), where('mentor.id', '==', mentor_id));
    const result = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(doc => {
      result.push(doc.data());
    });
    res.status(200).json(result);
  } catch (err) {
    res.status(400).send(`Error retrieving courses by user id: ${err}`);
  }
}