// GET: /pages/api/courses/users/[user_id].js
import { db } from '../../../../utils/api/firebase.config';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  query,
  where
} from "firebase/firestore";

export default async function getCoursesByUserId(req, res) {
  const { user_id } = req.query;
  const { account_type } = req.body;

  if (account_type === "Mentee") {
    try {
      const coursesQuery = query(collection(db, 'courses'));
      const result = [];
      const querySnapshot = await getDocs(coursesQuery);
      querySnapshot.forEach(doc => {
        const menteeList =  doc.data().mentees;
        menteeList.forEach(mentee => {
          if (mentee.id === user_id) {
            result.push(doc.data());
          }
        })
      });
      res.status(200).json(result);
    } catch (err) {
      res.status(400).send(`Error retrieving courses by user id: ${err}`);
    }
  } else {
    try {
      const q = query(collection(db, 'courses'), where('mentor.id', '==', user_id)));
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
}