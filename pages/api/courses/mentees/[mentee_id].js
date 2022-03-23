// GET /api/courses/mentees/[mentee_id.js]

import { db } from '../../../../utils/api/firebase.config';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
} from "firebase/firestore";

export default async function getCoursesByMenteeId(req, res) {
  const { mentee_id } = req.query;

  try {
    const q = query(collection(db, 'courses'));
    const result = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(doc => {
      const menteeList =  doc.data().mentees;
      menteeList.forEach(mentee => {
        if (mentee.id === mentee_id) {
          result.push(doc.data());
        }
      })
    });
    res.status(200).json(result);
  } catch (err) {
    res.status(400).send(`Error retrieving courses by user id: ${err}`);
  }
};