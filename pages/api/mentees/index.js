// POST: /pages/mentees/index.js
import { db } from '../../../utils/api/firebase.config';
import { collection, doc, getDoc, addDoc } from "firebase/firestore";
import defaultProfilePic from '../../../utils/constants/index';

export default async function addMentee(req, res) {
  const {
    account_type,
    firstName,
    lastName,
    location,
    uid,
    username
  } = req.body;

  try {
    const docRef = await addDoc(collection(db, 'mentees'), {
      courses: [],
      username,
      location,
      name: {
        'first_name': firstName,
        'last_name': lastName
      },
      id: uid,
      photo: defaultProfilePic,
      account_type,
      endorsements: 0,
      description: ''
    });

    res.status(200).json(`Successfully posted mentee`);

  } catch (err) {

    res.status(400).send(`Error posting new mentee: ${err}`);

  }
}