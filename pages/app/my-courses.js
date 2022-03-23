// MyCourses widget
// Conditionally render Student or Mentor View
import { useEffect, useState } from 'react';
import { Grid } from '@mui/material';

import MyCourses from '../../components/MyCourses/MyCourses.js';
import MyCoursesExampleData from '../../components/MyCourses/data/MyCourses.example.js';
import { useAuthContext } from '../../utils/context/AuthProvider';

export default function myCourses() {
  const [myCoursesData, setCoursesData] = useState([]);
  const { user } = useAuthContext();

  useEffect(() => {
    setCoursesData(MyCoursesExampleData)
  }, []);

  const handleDeleteCourse = (index) => {
    let myCoursesCopy = [...myCoursesData];
    myCoursesCopy.splice(index, 1);
    setCoursesData(myCoursesCopy);
  }

  const handleEditCourse = (courseIndex, newCourseName, newStartTime, newEndTime) => {
    let myCoursesCopy = [...myCoursesData];
    let currentCourse = myCoursesCopy[courseIndex];
    currentCourse.courseName = newCourseName;
    currentCourse.startTime = newStartTime;
    currentCourse.endTime = newEndTime;
    setCoursesData(myCoursesCopy);
  }

  return (
    <div className='pageData'>
      <h2>My Courses</h2>
      {console.log(user)}
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