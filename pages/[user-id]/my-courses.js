import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Grid, Typography, Stack } from '@mui/material';
import Link from 'next/link'

import {
  getUserInfo,
  getCoursesByMenteeId,
  getCoursesByMentorId,
  removeCourse,
  updateCourseInfo,
  createNewCourse,
  removeMenteeFromCourse } from '../../utils/api/apiCalls.js';
import MyCoursesCard from '../../components/MyCourses/MyCoursesCard.js';
import CreateClassModal from '../../components/CreateClassModal/CreateClassModal.js'
import MainButton from '../../components/basecomponents/MainButton.js'
import styles from '../../utils/styles/MyCoursesStyles/MyCourses.module.css';

export default function MyCoursesPage() {
  const router = useRouter();
  var pathUserId = router.asPath.split('/');
  const userID = pathUserId[1];

  const [userInfo, setUserInfo] = useState({ userType: '', id: '', name: { first_name: '', last_name: '' }, avatar_photo: '' })
  const [myCoursesData, setCoursesData] = useState([]);

  const fetchAllCourses = () => {
    if (userInfo.userType === 'Mentor') {
      getCoursesByMentorId(userID)
        .then(res => setCoursesData(res))
        .catch(err => console.warn('Error getting course info'))
    } else if (userInfo.userType === 'Mentee') {
      getCoursesByMenteeId(userID)
        .then(res => setCoursesData(res))
        .catch(err => console.warn('Error getting course info'))
    }
  }

  const handleDeleteCourse = (courseID) => {
    removeCourse(courseID)
      .then(() => fetchAllCourses())
      .catch(err => console.log('Error deleting course'));
  }

  const handleStudentDropCourse = (courseID) => {
    let dropCourseBody = {
      mentees: {
        id: userID
      }
    }
    removeMenteeFromCourse(courseID, dropCourseBody)
      .then(fetchAllCourses)
      .catch(err => console.warn('Could not drop course'))
  }

  const handleEditCourse = (course, newCourseName, newStartTime, newEndTime) => {
    let courseUpdateBody = {
      name: newCourseName,
      start_time: newStartTime,
      end_time: newEndTime
    }
    updateCourseInfo(course.id, courseUpdateBody)
      .then(fetchAllCourses)
      .catch(err => console.log('Error Updating Course Info'))
  }

  const handleCreateCourse = () => {
    fetchAllCourses();
  }

  useEffect(() => {
    getUserInfo(userID)
      .then(res => {
        if (!res?.account_type) {
          throw new Error('No account type associated with user.')
        }
        setUserInfo({ userType: res.account_type, id: res.id, name: { first_name: res.name.first_name, last_name: res.name.last_name }, avatar_photo: res.photo })
      })
      .catch(err => console.log('Error getting user information: ', err))
  }, []);

  useEffect(() => {
    fetchAllCourses()
  }, [userInfo])

  return (
    <div className='pageData'>
      <Typography gutterBottom variant="h5" component="div"><strong>My Courses</strong></Typography>

      {userInfo.userType === 'Mentor' &&
        <CreateClassModal getCoursesData={handleCreateCourse} userInfo={userInfo}/>}

      <br></br>
      {!myCoursesData.length && userInfo.userType === 'Mentee' &&
        <>
          <Typography gutterBottom variant="h6" component="div">You have not signed up for any courses</Typography>
          <Typography>Go to the Course Catalog to begin adding classes</Typography>
          <Link href={`/${userID}/course-catalog`} passHref>
            <a>
              <MainButton value="Course Catalog"/>
            </a>
          </Link>
        </>}

      {!myCoursesData.length && userInfo.userType === 'Mentor' &&
        <>
          <Typography gutterBottom variant="h6" component="div">You are not teaching any classes at the moment.</Typography>
          <Typography gutterBottom variant="h6" component="div">Create a new class to begin teaching.</Typography>
        </>
      }

      <br></br>
      <br></br>
      <Grid container spacing={{ xs: 2, sm: 3, md: 4, lg: 5, xl: 6 }} columns={6}>
        {myCoursesData.map((course, index) => (
          <MyCoursesCard
            course={course}
            key={`${index}`}
            index={index}
            handleDeleteCourse={handleDeleteCourse}
            handleEditCourse={handleEditCourse}
            handleStudentDropCourse={handleStudentDropCourse}
            userInfo={userInfo}
          />
        ))}
      </Grid>
    </div>
  )
}
