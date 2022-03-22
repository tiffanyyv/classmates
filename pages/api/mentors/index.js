// POST: /pages/mentors/index.js
import { db } from '../../../utils/api/firebase.config';
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import defaultProfilePic from '../../../utils/constants/index';

export default async function addMentor(req, res) {
  const {
    account_type,
    firstName,
    lastName,
    location,
    uid,
    username
  } = req.body;

  try {
    const docRef = await setDoc(doc(db, 'mentors', uid), {
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

    res.status(200).json(`Successfully posted mentor`);

  } catch (err) {

    res.status(400).send(`Error posting new mentor: ${err}`);

  }
}