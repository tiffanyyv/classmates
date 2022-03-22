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

// filter based on: teacher name,subcategory, class name, all
export default function CourseCatalog() {
  const [searchInput, setSearchInput] = useState('');
  // const [category, setCategory] = useState('');

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
  }
  // const handleChange = (event) => {
  //   setCategory(event.target.value);
  // };

  const handleSearchSubmit = () => {
    console.log('replace with post request')
  }

  return (
    <div className='pageData'>
      <Stack spacing={2} direction="row">
        <TextField id="standard-basic" label="Search by course name, teacher" variant="standard" sx={{width: '50%'}} onChange={e => handleSearchInput}/>
        <MainButton value="Search" onClick={handleSearchSubmit}/>
        <MainButton value="Add a Class +" />
        {/* <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={category}
          label="Category"
          onChange={handleChange}
        >
          <MenuItem value='history'>History</MenuItem>
          <MenuItem value='math'>Math</MenuItem>
          <MenuItem value='language'>Language</MenuItem>
          <MenuItem value='literature'>Literature</MenuItem>
          <MenuItem value='science'>Science</MenuItem>
        </Select>
      </FormControl> */}
      </Stack>
      <br></br>
      <br></br>
      <Grid container spacing={{ xs: 2, sm: 3, md: 4, lg: 5, xl: 6 }} columns={6}>
        {MyCoursesExampleData.map((course, index) => (
          <CourseCatalogCard course={course} key={`${index}`}/>
        ))}
      </Grid>
    </div>
  )
}
