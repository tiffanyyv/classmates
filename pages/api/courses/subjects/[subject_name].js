// GET: /pages/api/courses/subjects/[subject_name].js
import { db } from '../../../../utils/api/firebase.config';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where
} from "firebase/firestore";

export default async function getCoursesBySubjectName(req, res) {
  const { subject_name } = req.query;
  try {
    const q = query(collection(db, 'courses'), where('subject', '==', subject_name));
    const result = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(doc => {
      result.push(doc.data());
    });
    res.status(200).json(result);
  } catch (err) {
    res.status(400).send(`Error retrieving courses by subject name: ${err}`);
  }
}