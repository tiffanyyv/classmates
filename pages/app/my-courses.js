// MyCourses widget
// Conditionally render Student or Mentor View
import { useEffect, useState } from 'react';
import { Grid } from '@mui/material';

import MyCourses from '../../components/MyCourses/MyCourses.js';
import MyCoursesExampleData from '../../components/MyCourses/data/MyCourses.example.js';

export default function myCourses() {
  const [myCoursesData, setCoursesData] = useState([]);

  useEffect(() => {
    setCoursesData(MyCoursesExampleData)
  }, []);

  const handleDeleteCourse = (index) => {
    let myCoursesCopy = [...myCoursesData];
    myCoursesCopy.splice(index, 1);
    setCoursesData(myCoursesCopy);
  }

  return (
    <div className='pageData'>
      <h2>My Courses</h2>
      <br></br>
      <Grid container spacing={{ xs: 2, sm: 3, md: 4, lg: 5, xl: 6 }} columns={6}>
        {myCoursesData.map((course, index) => (
          <MyCourses course={course} key={`${index}`} index={index} handleDeleteCourse={handleDeleteCourse}/>
        ))}
      </Grid>
    </div>
  )
}

// export async getServerSideProps(context) {
//   return {
//     props: {}
//   }
// }