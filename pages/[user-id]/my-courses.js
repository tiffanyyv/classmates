// MyCourses widget
// Conditionally render Student or Mentor View
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Grid, Typography, Stack } from '@mui/material';
import Link from 'next/link'

import MyCoursesCard from '../../components/MyCourses/MyCoursesCard.js';
import { getUserInfo, getCoursesByMenteeId, getCoursesByMentorId, removeCourse, updateCourseInfo, createNewCourse } from '../../utils/api/apiCalls.js';
import CreateClassModal from '../../components/CreateClassModal/CreateClassModal.js'
import MainButton from '../../components/basecomponents/MainButton.js'
import styles from '../../utils/styles/MyCoursesStyles/MyCourses.module.css';

export default function MyCoursesPage() {
  const router = useRouter();
  var pathUserId = router.asPath.split('/');
  const userID = pathUserId[1];

  const [myCoursesData, setCoursesData] = useState([]);
  const [userInfo, setUserInfo] = useState({ userType: '', userID: userID, first_name: '', last_name: '', avatar_photo: '' })

  const fetchAllCourses = () => {
    if (userInfo.userType === 'Mentor') {
      getCoursesByMentorId(userInfo.userID)
        .then(res => setCoursesData(res))
        .catch(err => console.log('Error getting course info'))
    } else if (userInfo.userType === 'Mentee') {
      getCoursesByMenteeId(userInfo.userID)
        .then(res => setCoursesData(res))
        .catch(err => console.log('Error getting course info'))
    }
  }

  const handleDeleteCourse = (courseID) => {
    removeCourse(courseID)
      .then(() => fetchAllCourses())
      .catch(err => console.log('Error deleting course'));
  }

  const handleStudentDropCourse = (courseID) => {
  }

  const handleEditCourse = (course, newCourseName, newStartTime, newEndTime) => {
    let courseUpdateBody = {
      name: newCourseName,
      start_time: newStartTime,
      end_time: newEndTime
    }
    updateCourseInfo(course.id, courseUpdateBody)
      .then(() => fetchAllCourses())
      .catch(err => console.log('Error Updating Course Info'))
  }

  useEffect(() => {
    getUserInfo(userID)
      .then(res => {
        if (!res?.account_type) {
          throw new Error('No account type associated with user.')
        }
        setUserInfo({ userType: res.account_type, userID: res.id, first_name: res.name.first_name, last_name: res.name.last_name, avatar_photo: res.photo })
      })
      .catch(err => console.log('Error getting user information: ', err))
      .then(fetchAllCourses)
      .catch((err) => console.warn(err))
  }, []);

  return (
    <div className='pageData'>
      <Typography gutterBottom variant="h5" component="div"><strong>My Courses</strong></Typography>
      {userInfo.userType === 'Mentor' &&
        <CreateClassModal getCourseData={fetchAllCourses}/>}
      <br></br>
      <br></br>
      <br></br>
      {console.log(myCoursesData)}
      {!myCoursesData.length && userInfo.userType === 'Mentee' &&
        <>
          <Typography gutterBottom variant="h6" component="div">You have not signed up for any courses</Typography>
          <Typography>Go to the Course Catalog to begin adding classes</Typography>
          <Link href="/app/course-catalog" passHref>
            <MainButton value="Course CataLog"/>
          </Link>
        </>}

      {!myCoursesData.length && userInfo.userType === 'Mentor' &&
        <>
          <Typography gutterBottom variant="h6" component="div">You are not teaching any classes at the moment.</Typography>
          <Typography gutterBottom variant="h6" component="div">Create a new class to begin teaching.</Typography>
        </>
      }

      <Grid container spacing={{ xs: 2, sm: 3, md: 4, lg: 5, xl: 6 }} columns={6}>
        {myCoursesData.map((course, index) => (
          <MyCoursesCard
            course={course}
            key={`${index}`}
            index={index}
            handleDeleteCourse={handleDeleteCourse}
            handleEditCourse={handleEditCourse}
            userInfo={userInfo}
          />
        ))}
      </Grid>
      {console.log(myCoursesData)}
    </div>
  )
}
