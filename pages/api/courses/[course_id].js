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
        const q = query(collection(db, 'courses'), where('id', '==', Number(course_id)));
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
      const update = req.body;
      /* updateCourseInfo */

      // update course name

      // update course start time and end time


      // if (course_type === 'Public') {
      //   // post to courses collection


      //   // update: add to mentees list on this course obj

      // } else {
      //   // post to notifications collection
      //   // if mentee_status === declined --> delete from notifications collection
      //   // if mentee_status === accepted --> delete from notifications collection and add to courses collection

      //   const post = {
      //     course_id,
      //     course_name,
      //     mentor_id,
      //     mentor_name,
      //     mentee_id,
      //     mentee_name,
      //     mentee_status: 'pending' // pending initially, accepted, declined
      //   }
      // }


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