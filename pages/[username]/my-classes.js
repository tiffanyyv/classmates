// MyClasses widget
// Conditionally render Student or Mentor View
import { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import MyClasses from '../../components/MyClasses/MyClasses.js';

const data = [
  {
    className: 'Database Workshop 1',
    mentorName: 'Khristian Lopez',
    startTime: new Date(2022, 3, 20, 6, 0),
    endTime: new Date(2022, 3, 20, 9, 0),
    classThumbnail: 'https://www.stambia.com/images/stambia/articles/solutions/rdbms/logo-techno-databases.png',
    zoomLink: 'https://us02web.zoom.us/j/5773664084?pwd=MlVFWnJodytZdkpTS1UxbEsyc3Nvdz09',
    studentList: ['Alex', 'Chris', 'Estevan', 'Kevin', 'Matt', 'Samantha', 'Teresa', 'Tiffany', 'Tristen']
  },
  {
    className: 'React Workshop 1',
    mentorName: 'Quinton Maki',
    startTime: new Date(2022, 3, 21, 6, 0),
    endTime: new Date(2022, 3, 21, 7, 30),
    classThumbnail: 'https://res.cloudinary.com/practicaldev/image/fetch/s--ItM6k2Vz--/c_imagga_scale,f_auto,fl_progressive,h_900,q_auto,w_1600/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/7vx1ntk1reuhqo3tafbo.png',
    zoomLink: 'https://us02web.zoom.us/j/5773664084?pwd=MlVFWnJodytZdkpTS1UxbEsyc3Nvdz09',
    studentList: ['Alex', 'Chris', 'Estevan', 'Kevin', 'Matt', 'Samantha', 'Teresa', 'Tiffany', 'Tristen']
  },
  {
    className: 'Fullstack Review 1',
    mentorName: 'Josh Hertz',
    startTime: new Date(2022, 3, 22, 6, 0),
    endTime: new Date(2022, 3, 22, 7, 30),
    classThumbnail: 'https://media.geeksforgeeks.org/wp-content/cdn-uploads/20190626123927/untitlsssssed.png',
    zoomLink: 'https://us02web.zoom.us/j/5773664084?pwd=MlVFWnJodytZdkpTS1UxbEsyc3Nvdz09',
    studentList: ['Alex', 'Chris', 'Estevan', 'Kevin', 'Matt', 'Samantha', 'Teresa', 'Tiffany', 'Tristen']
  },
  {
    className: 'React Workshop 2',
    mentorName: 'Quinton Maki',
    startTime: new Date(2022, 3, 24, 6, 0),
    endTime: new Date(2022, 3, 24, 7, 30),
    classThumbnail: 'https://res.cloudinary.com/practicaldev/image/fetch/s--ItM6k2Vz--/c_imagga_scale,f_auto,fl_progressive,h_900,q_auto,w_1600/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/7vx1ntk1reuhqo3tafbo.png',
    zoomLink: 'https://us02web.zoom.us/j/5773664084?pwd=MlVFWnJodytZdkpTS1UxbEsyc3Nvdz09',
    studentList: ['Alex', 'Chris', 'Estevan', 'Kevin', 'Matt', 'Samantha', 'Teresa', 'Tiffany', 'Tristen']
  },
  {
    className: 'How to Write a Meme',
    mentorName: 'Ben Bernardy',
    startTime: new Date(2022, 3, 24, 6, 0),
    endTime: new Date(2022, 3, 24, 7, 30),
    classThumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkuciZ5KT6W7Xv6-WHJxpbpp2dpssC-l5GgpsyUfsiYzH9HdXcR_0I9XG0x9GduSgAKys&usqp=CAU',
    zoomLink: 'https://us02web.zoom.us/j/5773664084?pwd=MlVFWnJodytZdkpTS1UxbEsyc3Nvdz09',
    studentList: ['Alex', 'Chris', 'Estevan', 'Kevin', 'Matt', 'Samantha', 'Teresa', 'Tiffany', 'Tristen']
  },
  {
    className: 'Blue Ocean Kick-off',
    mentorName: 'Quinton Bernardy',
    startTime: new Date(2022, 3, 24, 6, 0),
    endTime: new Date(2022, 3, 24, 7, 30),
    classThumbnail: 'https://media.bizj.us/view/img/10304667/howtoblueocean*1200xx3864-2183-0-44.jpg',
    zoomLink: 'https://us02web.zoom.us/j/5773664084?pwd=MlVFWnJodytZdkpTS1UxbEsyc3Nvdz09',
    studentList: ['Alex', 'Chris', 'Estevan', 'Kevin', 'Matt', 'Samantha', 'Teresa', 'Tiffany', 'Tristen']
  },
]

export default function myClasses() {
  const [myClassesData, setClassesData] = useState([]);

  useEffect(() => {
    setClassesData(data)
  }, []);

  return (
    <div className='justWork'>
      <h2>My Classes</h2>
      <br></br>
      <Grid container spacing={{ xs: 2, sm: 3, md: 4, lg: 5, xl: 6 }} columns={6}>
        {myClassesData.map(course => (
          <MyClasses course={course} key={`${course.classId}-${course.className}`}/>
        ))}
      </Grid>
    </div>
  )
}
