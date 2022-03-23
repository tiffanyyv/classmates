// GET: /pages/api/courses/subjects/index.js
import { db } from '../../../../utils/api/firebase.config';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
} from "firebase/firestore";

export default async function getAllSubjects(req, res) {
  try {
    const querySnapshot = await getDocs(collection(db, 'courses'));
    const result = [];
    querySnapshot.forEach(doc => {
      if (!result.includes(doc.data().subject)) {
        result.push(doc.data().subject);
      }
    })
    res.status(200).json(result);
  } catch (err) {
    res.status(400).send('Error retrieving all subjects');
  }
}