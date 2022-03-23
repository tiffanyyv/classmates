// POST: /pages/users/index.js

import { db } from '../../../utils/api/firebase.config';
import { collection, doc, getDoc, setDoc } from "firebase/firestore";

export default async function addUser(req, res) {
  const {
    account_type,
    firstName,
    lastName,
    location,
    uid,
    username
  } = req.body;

  try {
    const docRef = await setDoc(doc(db, 'users', uid), {
      courses: [],
      username,
      location,
      name: {
        'first_name': firstName,
        'last_name': lastName
      },
      id: uid,
      photo: "https://robohash.org/"+firstName+lastName,
      account_type,
      endorsements: 0,
      description: ''
    });

    res.status(200).json(`Successfully posted user`);

  } catch (err) {

    res.status(400).send(`Error posting new user: ${err}`);

  }
}
