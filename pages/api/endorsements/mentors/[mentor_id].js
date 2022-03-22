// GET: /pages/api/endorsements/mentors/[mentor_id].js
// PUT: /pages/api/endorsements/mentors/[mentor_id].js

export default function getAndUpdateMentorEndorsements(req, res) {
  const {
    query: { mentor_id },
    method
  } = req;

  switch (method) {
    case 'GET':
      // open to add query
      break
    case 'PUT':
      // open to add query
      break
    default:
      res.setHeader('Allow', ['GET', 'PUT']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}