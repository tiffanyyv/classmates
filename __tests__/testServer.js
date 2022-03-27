import { rest } from 'msw';
import { setupServer } from 'msw/node';
import '@testing-library/jest-dom';

const {
  MyCoursesExampleData,
  MyCoursesMentor,
  UserInfo,
} = require('./mockData/allData.js')

const server = setupServer(
  rest.get('/api/courses/mentors/:id', (req, res, ctx) => res(
    ctx.status(200),
    ctx.json(MyCoursesMentor),
  )),
  rest.get('/api/courses/mentees/:id', (req, res, ctx) => res(
    ctx.status(200),
    ctx.json(MyCoursesExampleData),
  )),
  rest.get('/api/users/:id', (req, res, ctx) => res(
    ctx.status(200),
    ctx.json(UserInfo),
  )),



)

export default server