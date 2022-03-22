// Landing Page

import Head from 'next/head'
import { getUserInfo } from '../db/users';
import {
  getCourses,
  getCoursesById,
  getCoursesByMentorId,
  getCoursesByMenteeId,
  getCoursesBySubjectName,
  getAllSubjects,
  createNewCourse,
} from '../db/courses';


export default function LandingPage() {
  getUserInfo()
  getCourses()
  getCoursesById()
  getCoursesByMentorId()
  getCoursesByMenteeId()
  getCoursesBySubjectName()
  getAllSubjects()
  createNewCourse()


  return (
    <h1>Landing Page</h1>
  )
}
