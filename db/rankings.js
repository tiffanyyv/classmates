// https://firebase.google.com/docs/firestore/quickstart
import { app, db } from './firestoreConfigPH';
import { collection, query, where, doc, getDoc, getDocs, orderBy, limit } from "firebase/firestore";

/* READ */
// should be top 10 percentile
const getTopRankings = async (req, res) => {
  try {
    const q = query(collection(db, 'mentors'), orderBy('endorsements', 'desc'), limit(10));
    const querySnapshot = await getDocs(q);
    const result = [];
    querySnapshot.forEach(doc => {
      result.push(doc.data());
    })

    const transformResult = result.map(rank => {
      return {
        id: rank.id,
        name: rank.name,
        endorsements: rank.endorsements
      }
    });
    console.log('top rankings: ', transformResult);
  } catch (err) {
    console.log('No such document', err);
    // res.status(400).send(err);
  }
};

// getMentorRankings
const getMentorRankings = async (req, res) => {
  // let { id } = req.query
  let id = '1';

  try {
    const docRef = doc(db, 'mentors', id);
    const docSnap = await getDoc(docRef);
    // console.log('mentor rankings: ', docSnap.data());
    const result = docSnap.data().endorsements;
    console.log('mentor endorsements: ', result);
    // res.send(result);
  } catch (err) {
    console.log('No such document', err);
    // res.status(400).send(err);
  }
};

// updateMentorRanking
const updateMentorRanking = async (req, res) => {


}

// updateMenteeRanking
const updateMenteeRanking = async (req, res) => {

}

export { getTopRankings, getMentorRankings, updateMentorRanking, updateMenteeRanking };