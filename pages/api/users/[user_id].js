// GET: /pages/api/users/[user_id].js
// PUT: /pages/api/users/[user_id].js

import { db } from '../../../utils/api/firebase.config';
import { collection,
        doc,
        getDoc,
        updateDoc
} from "firebase/firestore";

export default async function getUserInfo(req, res) {

  const {
    query: { user_id },
    method
  } = req;
  const { description } = req.body;

  switch (method) {
    case 'GET':
      try {
        const docRef = doc(db, 'users', user_id);
        const docSnap = await getDoc(docRef);
        res.status(200).json(docSnap.data());
      } catch (err) {
        res.status(400).send(`Error retrieving user info: ${err}`);
      }
    break
    case 'PUT':
      try {
        await updateDoc(doc(db, 'users', user_id), {
          description: description
        });
        res.status(200).send(`Successfully updated user description`);
      } catch (err) {
        res.status(400).send(`Error updating user description: ${err}`);
      }
    break
    default:
      res.setHeader('Allow', ['GET', 'PUT']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}