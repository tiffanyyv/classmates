// GET: /pages/api/courses/[course_id].js
// DELETE: /pages/api/courses/[course_id].js
// PUT: /pages/api/courses/[course_id].js

import { db } from '../../../utils/api/firebase.config';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

export default async function getRemoveAndUpdateCourse(req, res) {
  const {
    query: { course_id },
    method
  } = req;

  switch (method) {
    case 'GET':
      /* getCoursesById */
      try {
        // id field is Number value
        const q = query(collection(db, 'courses'), where('id', '==', course_id));
        const result = [];
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(doc => {
          result.push(doc.data());
        });
        res.status(200).json(result[0]);
      } catch (err) {
        res.status(400).send(`Error retrieving course ${course_id}: ${err}`);
      }

      break
    case 'PUT':
      // update course name: use key "name"
      // update course start and end dates: use "start_date" and "end_date"

      /* updateCourseInfo */
      const update = req.body;
      // ex: {
      //  name,
      //  start_date,
      //  end_date
      //}
      try {
        await updateDoc(doc(db, 'courses', course_id), update);
        res.status(200).send(`Successfully updated course ${course_id}`);
      } catch (err) {
        res.status(400).send(`Error updating course ${course_id}`);
      }
      break
    case 'DELETE':
      /* removeCourse */
      try {
        const querySnapshot = await deleteDoc(doc(db, 'courses', course_id));
        res.status(200).send(`Successfully removed course: ${course_id}`);
      } catch (err) {
        res.status(400).send(`Error deleting course ${course_id}: ${err}`);
      }

      break
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}