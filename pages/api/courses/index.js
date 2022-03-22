// GET: /pages/api/courses/index.js
// POST: /pages/api/courses/index.js

export default function getAndCreateCourses(req, res) {
  const {
    query: { course_id },
    method
  } = req;

  switch (method) {
    case 'GET':
      // open to add query
      break
    case 'POST':
      const { capacity, description, end_date, endorsements, id, meeting_url, mentees, mentor, name, photo, start_date, subject } = req.body;
      // open to add query
      break
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}