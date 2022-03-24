// GET: /pages/api/endorsements/users/[user_id].js
// PUT: /pages/api/endorsements/users/[user_id].js

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

export default async function getAndUpdateUserEndorsements(req, res) {
  const {
    query: { user_id },
    method
  } = req;
  const { type } = req.body;
  let num;

  switch (method) {
    case 'GET':
      /* getUserEndorsements */
      try {
        const docRef = doc(db, 'users', user_id);
        const docSnap = await getDoc(docRef);
        const result = docSnap.data().endorsements;
        res.status(200).json(result);
      } catch (err) {
        res.status(400).send(`Error retrieving endorsements for user ${user_id}: ${err}`);
      }
      break
    case 'PUT':
      /* updateUserEndorsements */
      if (type === 'increase') {
        try {
          const docRef = doc(db, 'users', user_id);
          // auto increments endosements of user by 1
          const docSnap = await updateDoc(docRef, {
            endorsements: increment(1)
          });
          res.status(200).send(`Successfully updated endorsements for user ${user_id}`);
        } catch (err) {
          res.status(400).send(`Error updating endorsements for user ${user_id}, ${err}`);
        }
      } else if (type === 'decrease') {
        try {
          const docRef = doc(db, 'users', user_id);
          // auto decrements endosements of user by 1
          const docSnap = await updateDoc(docRef, {
            endorsements: increment(-1)
          });
          res.status(200).send(`Successfully updated endorsements for user ${user_id}`);
        } catch (err) {
          res.status(400).send(`Error updating endorsements for user ${user_id}, ${err}`);
        }
      } else {
        res.status(400).send(`Please pass in type increase or decrease in req.body`);
      }


      break
    default:
      res.setHeader('Allow', ['GET', 'PUT']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}