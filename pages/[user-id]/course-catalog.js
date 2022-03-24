// ClassCatalog widget
import { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import CourseCatalogCard from '../../components/CourseCatalog/CourseCatalogCard.js'
import MainButton from '../../components/basecomponents/MainButton.js';
import MyCoursesExampleData from '../../components/MyCourses/data/MyCourses.example.js';
// import { getUserInfo,  } from '../../utils/api/apiCalls.js';

// search based on: teacher name, class name
// filter based on category or all
export default function CourseCatalog() {
  const [searchInput, setSearchInput] = useState('');
  const [allCourses, setAllCourses] = useState(MyCoursesExampleData);
  const [displayCourses, setDisplayCourses] = useState(allCourses);
  const [currentCategory, setCurrentCategory] = useState('');
  const [openCreateClass, setOpenCreateClass] = useState(false);

  // after get request, set allCourses to results

  const handleCreateClass = () => {
    setOpenCreateClass(!openCreateClass);
  };

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
  };

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

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
          <MainButton value="Add a Class +" onClick={handleCreateClass} />
        </Stack>
      </Stack>
      <br></br>
      <br></br>
      <Grid container spacing={{ xs: 2, sm: 3, md: 4, lg: 5, xl: 6 }} columns={6}>
        {displayCourses.map((course, index) => (
          <CourseCatalogCard course={course} key={`${index}`} />
        ))}
      </Grid>
    </div>
  )
}

