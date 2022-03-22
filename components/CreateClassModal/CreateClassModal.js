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
  const [privacy, setPrivacy] = useState('');
  const [newStartTime, setNewStartTime] = useState(null);
  const [newEndTime, setNewEndTime] = useState(null);
  const [classObj, setClassObj] = useState({});



  const handleChange = (e) => {
    setClassObj({ ...classObj, [e.target.name]: e.target.value })
  }

  return (
    <div>
      <FormControl component="fieldset" required>
        <DialogTitle>Create a Class</DialogTitle>
          {/* <InputLabel>Class Name</InputLabel> */}

          <TextField
            name="CourseName"
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
            sx={{ width: 300 }}>
            <MenuItem value="Math">Math</MenuItem>
            <MenuItem value="Science">Science</MenuItem>
            <MenuItem value="English">English</MenuItem>
          </Select>
        </FormControl>

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePicker
            renderInput={(props) => <TextField {...props}/>}
            label="New Start Time"
            value={newStartTime}
            name="newStartTime"
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
            name="newEndTime"
            value={newEndTime}
            onChange={(newTimeValue) => {
              setClassObj({ ...classObj, 'endTime': newTimeValue});
              setNewEndTime(newTimeValue)
            }}
          />
        </LocalizationProvider>

          {/* <DialogTitle>Privacy Settings</DialogTitle> */}
        <FormControl>
          <InputLabel>Privacy Settings</InputLabel>
          <Select label="Privacy Settings" defaultValue="Privacy" value={privacy} name="privacy" onChange={(e) => {
            handleChange(e);
            setPrivacy(e.target.value);
          }}
          sx={{width: 300 }}>
            <MenuItem value="Public">Public</MenuItem>
            <MenuItem value="Private">Private</MenuItem>
          </Select>
        </FormControl>
          <TextField
            name="ClassSize"
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

// <DialogTitle>Update Course Info</DialogTitle>
//                 <DialogContent>
//                   <TextField
//                     error
//                     autoFocus
//                     margin="dense"
//                     // id="courseName"
//                     label="New Course Name"
//                     type="text"
//                     fullWidth
//                     variant="standard"
//                     color='info'
//                     focused
//                     onChange={(e) => setNewCourseName(e.target.value)}
//                   />
//                   <LocalizationProvider dateAdapter={AdapterDateFns}>
//                     <DateTimePicker
//                       renderInput={(props) => <TextField {...props}/>}
//                       label="New Start Time"
//                       value={newStartTime}
//                       onChange={(newValue) => {
//                         setNewStartTime(newValue);
//                         // setCurrStartTime(newValue);
//                       }}
//                     />
//                   </LocalizationProvider>
//                   <LocalizationProvider dateAdapter={AdapterDateFns}>
//                     <DateTimePicker
//                       renderInput={(props) => <TextField {...props} />}
//                       label="New End Time"
//                       value={newEndTime}
//                       onChange={(newValue) => {
//                         setNewEndTime(newValue);
//                         // setCurrEndTime(newValue);
//                       }}
//                     />
//                   </LocalizationProvider>
//                 </DialogContent>
