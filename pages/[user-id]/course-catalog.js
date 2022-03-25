// ClassCatalog widget
import { useEffect, useState } from 'react';
import {
  Grid,
  Typography,
  Stack,
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Select
} from '@mui/material';

import CourseCatalogCard from '../../components/CourseCatalog/CourseCatalogCard.js'
import CreateClassModal from '../../components/CreateClassModal/CreateClassModal.js'
import MainButton from '../../components/basecomponents/MainButton.js';
import styles from '../../utils/styles/CourseCatalogStyles/CourseCatalog.module.css'
import {
  getUserInfo,
  getAllCourses,
  addMenteeToCourse,
  getAllSubjects,
  updateCourseEndorsements } from '../../utils/api/apiCalls.js';

// search based on: teacher name, class name
// filter based on category or all
export default function CourseCatalog({ userInfo, allCourses, allSubjects }) {
  const [searchInput, setSearchInput] = useState('');
  const [displayCourses, setDisplayCourses] = useState(allCourses);
  const [currentCategory, setCurrentCategory] = useState('all');
  const [openCreateCourse, setOpenCreateCourse] = useState(false);

  const filterCategories = (category) => {
    if (category === 'all') {
      setDisplayCourses(allCourses)
    } else {
      let filteredCourses = allCourses.filter(course => {
        return course.subject === category
      })
      setDisplayCourses(filteredCourses);
    }
  }

  const handleChange = (e) => {
    setCurrentCategory(e.target.value);
    filterCategories(e.target.value);
  };

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearchSubmit = () => {
    if (searchInput) {
      let filteredCourses = allCourses.filter(course => {
        return course.name.toLowerCase().includes(searchInput.toLowerCase())
        || course.mentor.name.first_name.toLowerCase().includes(searchInput.toLowerCase())
        || course.mentor.name.last_name.toLowerCase().includes(searchInput.toLowerCase())
      })
      setDisplayCourses(filteredCourses);
      setSearchInput('');
    } else {
      setDisplayCourses(allCourses)
    }
  }

  const handleStudentAddCourse = (currentCourse) => {
    console.log(currentCourse)
    let studentBody = {
      mentee_id: userInfo.id,
      mentee_firstName: userInfo.name.first_name,
      mentee_lastName: userInfo.name.last_name
    }
    if (currentCourse.mentees.length < currentCourse.capacity) {
      addMenteeToCourse(currentCourse.id, studentBody)
      .then(() => alert(`Successfully signed-up for ${currentCourse.name} with
      ${currentCourse.mentor.name.first_name} ${currentCourse.mentor.name.last_name}`))
      .catch(err => console.log('Could not sign up for class'))
    } else {
      alert(`Sorry, ${currentCourse.name} is full. Please add a different course, or contact
       ${currentCourse.mentor.name.first_name} ${currentCourse.mentor.name.last_name} to increase course capacity.`)
    }
  }

  const handleOpenCreateCourse = () => {
    setOpenCreateCourse(!openCreateCourse);
  };

  const handleCreateCourse = () => {
    getAllCourses()
      .then(res => setAllCourses(res))
      .catch(err => console.log('Error getting course catalog'));
  }

  return (
    <div className='pageData'>
      <Typography gutterBottom variant="h5" component="div"><strong>Course Catalog</strong></Typography>
      <Stack spacing={3} direction="row">
        <TextField
          id="standard-basic"
          label="Search by course name, teacher"
          value={searchInput}
          variant="standard"
          sx={{ width: '40%' }}
          onChange={e => handleSearchInput(e)}
        />
        <FormControl sx={{ width: '20%' }}>
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={currentCategory}
            label="Category"
            onChange={handleChange}
          >
            <MenuItem value='all'>All</MenuItem>
            {allSubjects.map(subject => (
              <MenuItem value={subject} key={`${subject}`}>{subject}</MenuItem>
            ))}
          </Select>
        </FormControl>
          <MainButton value="Search" onClick={handleSearchSubmit} />
          {userInfo.account_type === "Mentor" &&
          <CreateClassModal getCoursesData={handleCreateCourse} userInfo={userInfo}/>}
      </Stack>
      <br></br>
      <br></br>
      <Grid container spacing={{ xs: 2, sm: 3, md: 4, lg: 5, xl: 6 }} columns={6}>
        {displayCourses.map((course, index) => (
          <CourseCatalogCard
            course={course}
            key={`${index}`}
            userInfo={userInfo}
            handleStudentAddCourse={handleStudentAddCourse}
          />
        ))}
      </Grid>
    </div>
  )
}

export async function getServerSideProps(context) {
  const userId = context.params['user-id'];
  const userInfo = await getUserInfo(userId);
  const allCourses = await getAllCourses();
  const allSubjects = await getAllSubjects();

  if (!userInfo || !userInfo?.account_type) {
    return {
      notFound: true,
    }
  }

  if (!allCourses) {
    return {
      notFound: true,
    }
  }

  if (!allSubjects) {
    return {
      notFound: true,
    }
  }

  return {
    props: { userInfo, allCourses, allSubjects }
  }
}
