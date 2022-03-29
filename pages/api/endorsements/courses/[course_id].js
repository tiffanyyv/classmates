// PUT: /pages/api/endorsements/courses/[course_id].js

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

export default async function getAndUpdatecourseEndorsements(req, res) {
  const {
    query: { course_id },
    method
  } = req;
  const { type } = req.body;

  let num;

  /* updateCourseEndorsements */
  if (type === 'increase') {
    num = 1;
  } else if (type === 'decrease') {
    num = -1;
  } else {
    res.status(400).send(`Please pass in type increase or decrease in req.body`);
  }
  try {
    const docRef = doc(db, 'courses', course_id);
    const docSnap = await updateDoc(docRef, {
      endorsements: increment(num)
    });
    res.status(200).send(`Successfully updated endorsements for course ${course_id}`);
  } catch (err) {
    res.status(400).send(`Error updating endorsements for course ${course_id}, ${err}`);
  }
}