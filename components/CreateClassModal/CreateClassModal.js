import { useState } from 'react';

import {
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  MenuItem,
  TextField,
  Select,
  DialogTitle,
  CardContent
  } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DateTimePicker from '@mui/lab/DateTimePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MainButton from '../basecomponents/MainButton.js'

export default function CreateClassModal ()  {
  const [subject, setSubject] = useState('');
  const [type, setType] = useState('');
  const [newStartTime, setNewStartTime] = useState(null);
  const [newEndTime, setNewEndTime] = useState(null);
  const [classObj, setClassObj] = useState({});



  const handleChange = (e) => {
    setClassObj({ ...classObj, [e.target.name]: e.target.value })
  }

  return (
    <div>
      <FormControl component="fieldset" required sx={{width: '50%', display: 'flex', flexWrap: 'nowrap'}}>
        <DialogTitle>Create a Class</DialogTitle>
          {/* <InputLabel>Class Name</InputLabel> */}

          <TextField
            name="name"
            margin="dense"
            label="New Course Name"
            type="text"
            fullWidth
            // variant="standard"
            color='primary'
            // focused
            onChange={handleChange}
            placeholder="Enter a course name"
          />

          <TextField
            multiline
            rows={4}
            name="description"
            margin="dense"
            label="Course Description"
            type="text"
            fullWidth
            // variant="standard"
            color='primary'
            // focused
            onChange={handleChange}
            placeholder="Describe your course"
          />

          <FormControl>
          <InputLabel>Select a Subject</InputLabel>
          <Select
            label="Select a Subject"
            defaultValue="Select a subject"
            value={subject}
            name="subject"
            onChange={(e) => {
              handleChange(e);
              setSubject(e.target.value);
            }}
            >
            <MenuItem value="Math">Math</MenuItem>
            <MenuItem value="Science">Science</MenuItem>
            <MenuItem value="History">History</MenuItem>
            <MenuItem value="Literature">Literature</MenuItem>
            <MenuItem value="Language">Language</MenuItem>
          </Select>
        </FormControl>

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePicker
            renderInput={(props) => <TextField {...props}/>}
            label="New Start Time"
            value={newStartTime}
            name="start_date"
            onChange={(newTimeValue) => {
              setClassObj({ ...classObj, 'startTime': newTimeValue})
              setNewStartTime(newTimeValue)
            }}
          />
        </LocalizationProvider>

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePicker
            renderInput={(props) => <TextField {...props}/>}
            label="New End Time"
            name="end_date"
            value={newEndTime}
            onChange={(newTimeValue) => {
              setClassObj({ ...classObj, 'endTime': newTimeValue});
              setNewEndTime(newTimeValue)
            }}
          />
        </LocalizationProvider>
        <TextField
            name="meeting_url"
            margin="dense"
            label="Classroom Link"
            type="text"
            fullWidth
            // variant="standard"
            color='primary'
            onChange={handleChange}
            placeholder="Please enter your Zoom Meeting Room Link"
          />
        <FormControl>
          <InputLabel>Privacy Type Settings</InputLabel>
          <Select label="Privacy Type Settings" defaultValue="Privacy" value={type} name="type" onChange={(e) => {
            handleChange(e);
            setType(e.target.value);
          }}
          >
            <MenuItem value="Public">Public</MenuItem>
            <MenuItem value="Private">Private</MenuItem>
          </Select>
        </FormControl>
          <TextField
            name="capacity"
            margin="dense"
            label="Class Size"
            type="Number"
            fullWidth
            // variant="standard"
            color='primary'
            onChange={handleChange}
          />
          <MainButton value={"Submit"}/>
    </FormControl>

   </div>
  )
}
