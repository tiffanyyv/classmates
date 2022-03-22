// PUT: /pages/api/endorsements/mentees/[mentee_id].js
import { db } from '../../../../utils/api/firebase.config';
// import {
//   collection,
//   query,
//   where,
//   doc,
//   getDoc,
//   getDocs,
//   orderBy,
//   limit,
//   updateDoc,
//   increment
// } from "firebase/firestore";

pages/api/endorsements/mentees/mentee_id.js

export default function updateMenteeEndorsements(req, res) {
  // const {
  //   query: { mentee_id },
  //   method
  // } = req;
  res.send('Hello World!');
  // switch (method) {
  //   case 'PUT':
  //     /* updateMenteeEndorsements */
  //     try {
  //       const docRef = doc(db, 'mentees', mentee_id);
  //       // auto increments endorsements of mentee by 1
  //       const docSnap = await updateDoc(docRef, {
  //         endorsements: increment(1)
  //       });
  //       res.status(200).send(`Successfully updated endorsements for mentee ${mentee_id}`);
  //     } catch (err) {
  //       res.status(400).send(`Error updating endorsements for mentee ${mentee_id}, ${err}`);
  //     }

  //     break
  //   default:
  //     res.setHeader('Allow', ['PUT']);
  //     res.status(405).end(`Method ${method} Not Allowed`);
  // }
}