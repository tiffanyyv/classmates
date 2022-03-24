// Standardized API calls for front end
// Error handling:
//    Take care of NETWORK related errors in this file ie bad requests
//    Response data errors should be handled in usaged area ie code expects an object but recieving an array

import axios from 'axios'

/* COURSES */
export const getAllCourses = () => {
  return axios.get(`http://localhost:3000/api/courses`)
    .then(({ data }) => data)
    .catch((err) => console.warn(err.message));
}

export const getCoursesByCourseId = (course_id) => {
  return axios.get(`http://localhost:3000/api/courses/${course_id}`)
    .then(({ data }) => data)
    .catch((err) => console.warn(err.message));
}

export const getCoursesByMenteeId = (mentee_id) => {
  return axios.get(`http://localhost:3000/api/courses/mentees/${mentee_id}`)
    .then(({ data }) => data)
    .catch((err) => console.warn(err.message));
}

export const getCoursesByMentorId = (mentor_id) => {
  return axios.get(`http://localhost:3000/api/courses/mentors/${mentor_id}`)
    .then(({ data }) => data)
    .catch((err) => console.warn(err.message));
}

export const createNewCourse = (body) => {
  return axios.post(`http://localhost:3000/api/courses`, body)
    .then(({ data }) => data)
    .catch((err) => console.warn(err.message));
}
/* createNewCourse example body */
/*
{
  "capacity": Number,
  "description": String,
  "end_date": String,
  "start_date": String,
  "meeting_url": String,
  "mentorId": String,
  "mentorFirstName": String,
  "mentorLastName": String,
  "name": String,
  "subject": String
}
*/

export const removeCourse = (course_id) => {
  return axios.delete(`http://localhost:3000/api/courses/${course_id}`)
    .then(({ data }) => data)
    .catch((err) => console.warn(err.message));
}

export const updateCourseInfo = (course_id, body) => {
  return axios.put(`http://localhost:3000/api/courses/${course_id}`, body)
    .then(({ data }) => data)
    .catch(err => console.warn(err))
}
/* updateCourseInfo example body */
/* {
  "name": string
  "start_time": string ISO timestamp
  "end_time": string ISO timestamp
}
*/

export const getAllSubjects = () => {
  return axios.get(`http://localhost:3000/api/courses/subjects/`)
    .then(({ data }) => data)
    .catch(err => console.warn(err));
}

export const getCoursesBySubjectName = (subject_name) => {
  return axios.get(`http://localhost:3000/api/courses/subjects/${subject_name}`)
    .then(({ data }) => data)
    .catch(err => console.warn(err));
}

export const addMenteeToCourse = (course_id, body) => {
  return axios.put(`http://localhost:3000/api/courses/course/${course_id}`, body)
    .then(({ data }) => data)
    .catch(err => console.warn(err));
}
/* addMenteeToCourse example body */
/*
{
  "mentee_id": "1",
  "mentee_firstName": "Jeth",
  "mentee_lastName": "Venturoli"
}
*/

export const removeMenteeFromCourse = (course_id, body) => {
  return axios.put(`http://localhost:3000/api/courses/${course_id}`, body)
    .then(({ data }) => data)
    .catch(err => console.warn(err));
}
/* removeMenteeFromCourse example body */
/*
{
  "mentees": {
    "id" : "1"
  }
}
*/

/* USERS */
export const addUser = (body) => {
  return axios.post(`http://localhost:3000/api/users`, body)
    .then(({ data }) => data)
    .catch(err => console.warn(err));
}
/* addUser example body */
/*
{
  "username": "ucoleya",
  "location": "Indonesia",
  "firstName": "Jeth",
  "lastName": "Venturoli",
  "uid": "ABCDEFG",
  "account_type": "Mentee"
}
*/

/* userId === uid (same as mentor/mentee id) */
export const getUserInfo = (userId) => {
  return axios.get(`http://localhost:3000/api/users/${userId}`)
    .then(({ data }) => data)
    .catch(err => console.warn(err));
}

/* userId === uid (same as mentor/mentee id) */
export const updateUserInfo = (userId, body) => {
  return axios.put(`http://localhost:3000/api/users/${userId}`, body)
    .then(({ data }) => data)
    .catch(err => console.warn(err));
}

/* updateUserInfo example body */
/*
{
  "description": "Javascript"
}
*/

/* ENDORSEMENTS */
export const getTopEndorsements = () => {
  return axios.get('http://localhost:3000/api/endorsements')
    .then(({ data }) => data)
    .catch((err) => console.warn(err.message));
}

/* userId === uid (same as mentor/mentee id) */
export const getUserEndorsements = (user_id) => {
  return axios.get(`http://localhost:3000/api/endorsements/users/${user_id}`)
    .then(({ data }) => data)
    .catch((err) => console.warn(err.message));
}

/* userId === uid (same as mentor/mentee id) */
export const updateUserEndorsements = (user_id, body) => {
  return axios.put(`/api/endorsements/users/${user_id}`, body)
    .then(({ data }) => data)
    .catch((err) => console.warn(err.message));
}
/* updateUserEndorsements example body:
{
  "type": "increase" (or "decrease")
}
*/

/* userId === uid (same as mentor/mentee id) */
export const updateCourseEndorsements = (course_id, body) => {
  return axios.put(`/api/endorsements/courses/${course_id}`, body)
    .then(({ data }) => data)
    .catch((err) => console.warn(err.message));
}
/* updateCourseEndorsements example body:
{
  "type": "increase" (or "decrease")
}
*/