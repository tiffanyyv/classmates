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
      // to update course name: pass in key:value pair "name": "string" in request body
      // to update course start and end dates pass in key:value pair: "start_date": new Date() and "end_date": new Date()

      /* updateCourseInfo */
      const update = req.body;
      // REQ BODY MUST MATCH EXACTLY!
      /* ex:
      To update course name, start_date or end_date pass in req body obj with properties:
      {
        "name": "new name",
          OR
        "start_date": "new start_date",
          OR
        "end_date": "new end_date"
      }
      To REMOVE mentee from course pass in this object with "mentees" property:
      {
        "mentees": {
          "id" : "22",
        }
      }
      */

      if (update.mentees) {
        try {
          const docRef = doc(db, 'courses', course_id);
          const docSnap = await getDoc(docRef);
          let menteesList = docSnap.data().mentees;
          let newMenteesList = menteesList.slice();
          let idxToRemove;

          for (let i = 0; i < newMenteesList.length; i++) {
            let mentee = newMenteesList[i];

            if (mentee.id === update.mentees.id) {
              idxToRemove = i;
              break;
            }
          }

          newMenteesList.splice(idxToRemove, 1);

          await updateDoc(doc(db, 'courses', course_id), {
            mentees: newMenteesList
          });

          res.status(200).send(`Successfully updated course ${course_id}`);
        } catch (err) {
          res.status(400).send(`Error updating course ${course_id}`);
        }
      } else if ( update.name || update["start_date"] || update["end_date"]) {
        try {
          await updateDoc(doc(db, 'courses', course_id), update);
          res.status(200).send(`Successfully updated course ${course_id}`);
        } catch (err) {
          res.status(400).send(`Error updating course ${course_id}`);
        }
      } else {
        res.status(405).send(`Request body does not match required parameters`);
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