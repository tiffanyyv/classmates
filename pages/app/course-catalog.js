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
import MyCoursesExampleData from '../../components/MyCourses/data/MyCourses.example.js';
import { getUserInfo, getAllCourses, updateCourseMenteeList } from '../../utils/api/apiCalls.js';

// search based on: teacher name, class name
// filter based on category or all
export default function CourseCatalog() {
  const [searchInput, setSearchInput] = useState('');
  const [allCourses, setAllCourses] = useState([]);
  const [displayCourses, setDisplayCourses] = useState([]);
  const [currentCategory, setCurrentCategory] = useState('all');
  const [openCreateClass, setOpenCreateClass] = useState(false);
  const [userInfo, setUserInfo] = useState({ userType: '', userID: '51', first_name: '', last_name: '' })

  useEffect(() => {
    getUserInfo(userInfo.userID)
      .then(res => setUserInfo({ userType: res.account_type, userID: res.id, first_name: res.name.first_name, last_name: res.name.last_name }))
      .catch(err => console.log('Error getting user information'));
    getAllCourses()
      .then(() => getAllCourses())
      .then(res => setAllCourses(res))
      .catch(err => console.log('Error getting course catalog'));
  }, []);

  useEffect(() => {
    setDisplayCourses(allCourses)
  }, [allCourses])

  const handleCreateClass = () => {
    setOpenCreateClass(!openCreateClass);
  };

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
  };

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  const handleStudentAddCourse = (currentCourse) => {
    let studentBody = {
      mentee_id: userInfo.userID,
      mentee_firstName: userInfo.first_name,
      mentee_lastName: userInfo.last_name
    }
    updateCourseMenteeList(currentCourse.id, studentBody)
      .then(() => alert(`Successfully signed-up for ${currentCourse.name} with ${currentCourse.mentor.name.first_name} ${currentCourse.mentor.name.last_name}`))
      .catch(err => console.log('Could not sign up for class'))
  }

  // if search input not empty, filter based on inputted course name/teacher name
  const handleSearchSubmit = () => {
    if (searchInput) {
      let filteredCourses = allCourses.filter(course => {
        return course.name.toLowerCase().includes(searchInput.toLowerCase()) || course.mentor.name.first_name.toLowerCase().includes(searchInput.toLowerCase()) || course.mentor.name.last_name.toLowerCase().includes(searchInput.toLowerCase())
      })
      setDisplayCourses(filteredCourses);
    } else {
      setDisplayCourses(allCourses)
    }
  }

  // if category set to all, display all courses. otherwise, filter based on current selected category
  const filterCategories = () => {
    if (searchInput || currentCategory === 'all') {
      setDisplayCourses(allCourses)
    } else {
      let filteredCourses = allCourses.filter(course => {
        return course.subject === currentCategory
      })
      setDisplayCourses(filteredCourses);
    }
  }

  return (
    <div className='pageData'>
      <Typography gutterBottom variant="h5" component="div"><strong>Course Catalog</strong></Typography>
      <Stack spacing={2} direction="row">
        <TextField id="standard-basic" label="Search by course name, teacher" variant="standard" sx={{ width: '30%' }} onChange={e => handleSearchInput(e)} />
        <FormControl sx={{ width: '10%' }}>
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={currentCategory}
            label="Category"
            onChange={handleChange}
          >
            <MenuItem value='all'>All</MenuItem>
            <MenuItem value='history'>History</MenuItem>
            <MenuItem value='language'>Language</MenuItem>
            <MenuItem value='literature'>Literature</MenuItem>
            <MenuItem value='math'>Math</MenuItem>
            <MenuItem value='science'>Science</MenuItem>
          </Select>
        </FormControl>
        <Stack direction="row" spacing={1}>
          <MainButton value="Search" onClick={handleSearchSubmit} />
          <MainButton value="Create A Class +" onClick={handleCreateClass} />
          <CreateClassModal />
        </Stack>
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
