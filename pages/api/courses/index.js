// GET: /pages/api/courses/index.js
// POST: /pages/api/courses/index.js
import { db } from '../../../utils/api/firebase.config';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  setDoc,
  query,
  where
} from "firebase/firestore";
import { coursePhotos } from '../../../utils/constants/index';


export default async function getAndCreateCourses(req, res) {
  const {
    query: { course_id },
    method
  } = req;

  switch (method) {
    case 'GET':
      /* getCourses */
      try {
        const querySnapshot = await getDocs(collection(db, 'courses'));
        const result = [];
        querySnapshot.forEach(doc => {
          result.push(doc.data());
        })
        res.status(200).json(result);
      } catch (err) {
        res.status(400).send(`Error retrieving classes: ${err}`);
      }

      break
    case 'POST':
      /* createNewCourse */
      const {
        capacity,
        description,
        end_date,
        endorsements,
        meeting_url,
        mentorId,
        mentorFirstName,
        mentorLastName,
        name,
        start_date,
        subject
      } = req.body;

      try {
        const docRef = doc(collection(db, 'courses'));
        console.log('docRef: ', docRef.id);
        await setDoc(doc(db, 'courses', docRef.id), {
          id: docRef.id,
          name,
          start_date,
          end_date,
          mentees: [],
          subject,
          mentor: {
            id: mentorId,
            name: {
              "first_name": mentorFirstName,
              "last_name": mentorLastName
            },
            photo: "https://robohash.org/"+mentorFirstName+mentorLastName
          },
          capacity,
          endorsements: 0,
          description,
          meeting_url,
          photo: coursePhotos[subject]
        });
        res.status(200).send(`Successfully posted course`);
      } catch (err) {
        res.status(400).send(`Error posting new course: ${err}`);
      }


      break
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}