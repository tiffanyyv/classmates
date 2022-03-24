// PUT: /pages/api/courses/course/[course_id].js

import { db } from '../../../../utils/api/firebase.config';
import {
  doc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";

/* add student to course's mentee list */
export default async function addMenteeToCourse(req, res) {
  const { course_id } = req.query;
  const {
    mentee_id,
    mentee_firstName,
    mentee_lastName
  } = req.body;

  try {
    const querySnapshot = await updateDoc(doc(db, 'courses', course_id), {
      mentees: arrayUnion({
        id: mentee_id,
        name: {
          first_name: mentee_firstName,
          last_name: mentee_lastName
        },
        photo: "https://robohash.org/"+mentee_firstName+mentee_lastName
      })
    });
    res.status(200).json(`Successfully added student to course ${course_id}`);
  } catch (err) {
    res.status(400).send(`Error adding student to course ${course_id}: ${err}`);
  }
}


