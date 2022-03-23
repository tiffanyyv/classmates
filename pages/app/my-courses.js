// MyCourses widget
// Conditionally render Student or Mentor View
import { useEffect, useState } from 'react';
import { Grid } from '@mui/material';

import MyCourses from '../../components/MyCourses/MyCourses.js';
import MyCoursesExampleData from '../../components/MyCourses/data/MyCourses.example.js';
import { getUserInfo, getCoursesByMenteeId, getCoursesByMentorId } from '../../utils/api/apiCalls.js';

export default function myCourses() {
  const [myCoursesData, setCoursesData] = useState([]);
  const [userID, setUserID] = useState('50');
  const [userType, setUserType] = useState('');

  useEffect(() => {
    getUserInfo(userID)
      .then(res => setUserType(res.account_type))
      .catch(err => console.log('Error getting user information'))
  }, []);

  useEffect(() => {
    fetchAllCourses();
  }, [userType])

  const fetchUserInfo = () => {
    return getUserInfo(userID)
      .then(res => setUserType(res.account_type))
      .catch(err => console.log('Error getting user information'))
  }

  const fetchAllCourses = () => {
    if (userType === 'Mentor') {
      getCoursesByMentorId(userID)
        .then(res => setCoursesData(res))
        .catch(err => console.log('Error getting course info'))
    } else if (userType === 'Mentee') {
      getCoursesByMenteeId(userID)
        .then(res => setCoursesData(res))
        .catch(err => console.log('Error getting course info'))
    }
  }

  const handleDeleteCourse = (index) => {
    let myCoursesCopy = [...myCoursesData];
    myCoursesCopy.splice(index, 1);
    setCoursesData(myCoursesCopy);
  }

  const handleEditCourse = (courseIndex, newCourseName, newStartTime, newEndTime) => {
    let myCoursesCopy = [...myCoursesData];
    let currentCourse = myCoursesCopy[courseIndex];
    currentCourse.name = newCourseName;
    currentCourse.start_date = newStartTime;
    currentCourse.end_date = newEndTime;
    setCoursesData(myCoursesCopy);
  }

  return (
    <div className='pageData'>
      <h2>My Courses</h2>
      <br></br>
      <Grid container spacing={{ xs: 2, sm: 3, md: 4, lg: 5, xl: 6 }} columns={6}>
        {myCoursesData.map((course, index) => (
          <MyCourses
            course={course}
            key={`${index}`}
            index={index}
            handleDeleteCourse={handleDeleteCourse}
            handleEditCourse={handleEditCourse}
          />
        ))}
      </Grid>
    </div>
  )
}