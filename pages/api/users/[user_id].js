// GET: /pages/api/users/[user_id].js

import { db } from '../../../utils/api/firebase.config';
import { collection, doc, getDoc } from "firebase/firestore";

export default async function getUserInfo(req, res) {
  const { user_id } = req.query;
  console.log('uid: ', user_id);
  try {
    const docRef = doc(db, 'users', user_id);
    const docSnap = await getDoc(docRef);
    res.status(200).json(docSnap.data());
  } catch (err) {
    res.status(400).send(`Error retrieving user info: ${err}`);
  }
}