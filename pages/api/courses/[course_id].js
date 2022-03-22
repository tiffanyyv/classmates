// GET: /pages/api/courses/[course_id].js
// DELETE: /pages/api/courses/[course_id].js
// PUT: /pages/api/courses/[course_id].js

export default function getRemoveAndUpdateCourse(req, res) {
  const {
    query: { course_id },
    method
  } = req;

  switch (method) {
    case 'GET':
      // open to add query
      break
    case 'PUT':
      const update = req.body;
      // open to add query
      break
    case 'DELETE':
      // open to add query
      break
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}