import { useState, useEffect } from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  TextField,
  Select,
  DialogTitle,
  Dialog,
  DialogContent,
  Stack,
  } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DateTimePicker from '@mui/lab/DateTimePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import { useAuthContext } from '../../utils/context/AuthProvider';
import MainButton from '../basecomponents/MainButton.js'
import styles from '../../utils/styles/CreateClassModalStyles/CreateClassModalStyles.module.css';

import { createNewCourse, getUserInfo } from '../../utils/api/apiCalls.js';

const subjects = ['Math', 'Science', 'History', 'Literature', 'Language'];


export default function CreateClassModal({ getCoursesData, userInfo }) {
  console.log('this is userInfo in CreateClassModal: ', userInfo);
  const [subject, setSubject] = useState('');
  const [type, setType] = useState('');
  const [newStartTime, setNewStartTime] = useState(null);
  const [newEndTime, setNewEndTime] = useState(null);
  const [classObj, setClassObj] = useState({});
  const [open, setOpen] = useState(false);

  const handleChange = (e) => {
    if(e.target.name === 'capacity') {
      setClassObj({ ...classObj, [e.target.name]: Number(e.target.value) })
    } else {
      setClassObj({ ...classObj, [e.target.name]: e.target.value })
    }
  }

  const handleCreate = async (e) => {
    e.preventDefault();
    await createNewCourse(classObj);
    setOpen(false);
    getCoursesData();
  }

  useEffect(() => {
    setClassObj({
      ...classObj,
      mentorFirstName: userInfo.name.first_name,
      mentorLastName: userInfo.name.last_name,
      mentorId: userInfo.id
    })
    return () => setClassObj({})
  }, [])

  return (
    <div>
      <MainButton value="Create a Class" onClick={() => setOpen(true)} />
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle className={styles.formHeader}>Create a Class</DialogTitle>
        <DialogContent>
          {/* ----------------------COURSE NAME-------------------------- */}
          <FormControl component="fieldset" required className={styles.classForm} >
            <TextField
              required
              name="name"
              label="New Course Name"
              type="text"
              fullWidth
              color='primary'
              onChange={handleChange}
              placeholder="E.g. Calculus II"
            />
            {/* ----------------------COURSE DESCRIPTION-------------------------- */}
            <TextField
              required
              className={styles.classForm}
              multiline
              rows={4}
              name="description"
              margin="dense"
              label="Course Description"
              type="text"
              color='primary'
              onChange={handleChange}
              placeholder="E.g. Advanced Level Calculus for those looking to build upon their Calculus fundamentals."
            />
            {/* ----------------------SELECT SUBJECT-------------------------- */}
            <FormControl className={styles.subjectSelector}>
              <InputLabel>Select a Subject</InputLabel>
              <Select
                required
                label="Select a Subject"
                defaultValue="Select a subject"
                value={subject}
                name="subject"
                onChange={(e) => {
                  handleChange(e);
                  setSubject(e.target.value);
                }}
              >
                {subjects.map((subject, index) => (
                  <MenuItem value={subject} key={`${subject}, ${index}`}>{subject}</MenuItem>
                ))}
              </Select>
            </FormControl>
            {/* ----------------------START TIME PICKER-------------------------- */}
            <Stack direction="row" spacing={1} className={styles.stackMargin}>
              <LocalizationProvider dateAdapter={AdapterDateFns} className={styles.dateTimePick}>
                <DateTimePicker
                  required
                  renderInput={(params) => <TextField {...params} fullWidth />}
                  label="New Start Time"
                  value={newStartTime}
                  name="start_date"
                  onChange={(newTimeValue) => {
                    setClassObj({ ...classObj, 'start_date': newTimeValue })
                    setNewStartTime(newTimeValue)
                  }}
                />
              </LocalizationProvider>
              {/* ----------------------END TIME PICKER-------------------------- */}
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  required
                  renderInput={(props) => <TextField {...props} fullWidth />}
                  label="New End Time"
                  name="end_date"
                  value={newEndTime}
                  onChange={(newTimeValue) => {
                    setClassObj({ ...classObj, 'end_date': newTimeValue });
                    setNewEndTime(newTimeValue)
                  }}
                />
              </LocalizationProvider>
            </Stack>
            {/* ----------------------ZOOM LINK-------------------------- */}
            <TextField
              required
              className={styles.classForm}
              name="meeting_url"
              margin="dense"
              label="Classroom Link"
              type="text"
              color='primary'
              onChange={handleChange}
              placeholder="Please enter your Zoom Meeting Room Link"
            />
            {/* ----------------------CLASS CAPACITY-------------------------- */}
            <TextField
              required
              className={styles.classSizeMargin}
              name="capacity"
              margin="dense"
              label="Class Size"
              type="Number"
              color='primary'
              onChange={handleChange}
            />
            <MainButton value="Submit" onClick={handleCreate}/>
          </FormControl>
        </DialogContent>
      </Dialog>
    </div>
  )
}
