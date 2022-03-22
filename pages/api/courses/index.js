// GET: /pages/api/courses/index.js
// POST: /pages/api/courses/index.js
import { db } from '../../../utils/api/firebase.config';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  query,
  where,
  deleteDoc,
  updateDoc,
  Timestamp
} from "firebase/firestore";

const coursePhotos = {
  'Science': 'https://epi-rsc.rsc-cdn.org/globalassets/05-journals-books-databases/our-journals/00-journal-pages-heros/Chemical-Science-HERO.jpg?version=9e72b3c3',
  'History': 'https://alameda.edu/wp-content/uploads/2021/07/History.png',
  'Literature': 'https://media.istockphoto.com/photos/book-and-glowing-letters-picture-id522513933?k=20&m=522513933&s=612x612&w=0&h=NjqmZlnwoTM7wgLI_rx1hiGdLb2xwT9UixPYR2d1ciI=',
  'Language': 'https://i0.wp.com/www.michigandaily.com/wp-content/uploads/2021/03/0-1.jpg?fit=1200%2C960&ssl=1',
  'Math': 'https://www.actuaries.org.uk/sites/default/files/curriculum/Actuarial%20Mathematics%20%28CM1%29%20Banner.jpg'
}

export default async function getAndCreateCourses(req, res) {
  const {
    query: { course_id },
    method
  } = req;
  console.log(req);
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
        mentees,
        mentorId,
        mentorFirstName,
        mentorLastName,
        name,
        start_date,
        subject,
        type
      } = req.body;

      // look up default photo based on subject
      try {
        const docRef = await addDoc(collection(db, 'courses'), {
          name,
          "start_date": start_date,
          "end_date": end_date,
          mentees: [],
          subject,
          mentor: {
            "id": mentorId,
            "name": {
              "first_name": mentorFirstName,
              "last_name": mentorLastName
            }
          },
          capacity,
          endorsements: 0,
          description,
          "meeting_url": meeting_url,
          photo: coursePhotos[subject],
          type
        });
        res.status(200).json(`Successfully posted course`);
      } catch (err) {
        res.status(400).send(`Error posting new course: ${err}`);
      }

      break
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
