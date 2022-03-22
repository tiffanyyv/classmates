import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Stack,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  TextField
} from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
import Link from 'next/link'

import MainButton from '../basecomponents/MainButton.js'

export default function MyCourses({ course }) {
  const [showStudentList, setShowStudentList] = useState(false);
  const [editCourseInfo, setEditCourseInfo] = useState(false);
  const [userType, setUserType] = useState('mentor');
  const [currCourseName, setCurrCourseName] = useState(course.courseName);
  const [currStartTime, setCurrStartTime] = useState(course.startTime);
  const [currEndTime, setCurrEndTime] = useState(course.endTime);
  const [newCourseName, setNewCourseName] = useState('');
  const [newStartTime, setNewStartTime] = useState(currStartTime);
  const [newEndTime, setNewEndTime] = useState(currEndTime);

  const handleStudentList = () => {
    if (userType === 'mentor') {
      setShowStudentList(!showStudentList)
    }
  }

  const handleEditCourse = () => {
    setEditCourseInfo(!editCourseInfo)
  }

  const handleSubmitCourseChanges = () => {
    if (newCourseName === '') {
      alert("Please enter new course name")
    } else {
      setEditCourseInfo(!editCourseInfo)
      setCurrStartTime(newStartTime)
      setCurrEndTime(newEndTime)
      setCurrCourseName(newCourseName)
    }
  }
  const mentorProfile = () => {
  }

  const handleZoomLink = () => {

  }

  return (
    <Card sx={{ maxWidth: 300, margin: 1.5 }}>
      <CardMedia
        component="img"
        height="175"
        image={course.courseThumbnail}
        alt=""
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          <Stack direction="row">
            {currCourseName}
            {userType === 'mentor' &&
              <EditIcon onClick={handleEditCourse} />}
              <Dialog open={editCourseInfo} onClose={handleEditCourse}>
                <DialogTitle>Update Course Info</DialogTitle>
                <DialogContent>
                  <TextField
                    autoFocus
                    margin="dense"
                    label="New Course Name"
                    type="text"
                    fullWidth
                    variant="standard"
                    color='info'
                    focused
                    onChange={(e) => setNewCourseName(e.target.value)}
                  />
                  <Stack direction="row" spacing={2}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                      renderInput={(props) => <TextField {...props}/>}
                      label="New Start Time"
                      value={newStartTime}
                      onChange={(newValue) => {
                        setNewStartTime(newValue);
                      }}
                    />
                  </LocalizationProvider>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                      renderInput={(props) => <TextField {...props} />}
                      label="New End Time"
                      value={newEndTime}
                      onChange={(newValue) => {
                        setNewEndTime(newValue);
                      }}
                    />
                  </LocalizationProvider>
                  </Stack>
                </DialogContent>
                <MainButton value="Submit Changes" onClick={handleSubmitCourseChanges}/>
              </Dialog>
          </Stack>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Teacher: </strong> {course.teacherName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong >Course Start Time: </strong> {`${currStartTime}`}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong> Course End Time: </strong> {`${currEndTime}`}
        </Typography>
        <MainButton value="Attendance List" onClick={handleStudentList}/>
        <Dialog onClose={handleStudentList} open={showStudentList} fullWidth={true}>
          <DialogTitle>Students</DialogTitle>
            <DialogContent>
              {course.studentList.map((student, index) => (
                <DialogContentText key={`${index}`}>{`${student}`}</DialogContentText>
              ))}
            </DialogContent>
        </Dialog>
        <br></br>
        <a href={`${course.zoomLink}`} target="_blank" rel="noreferrer">
          Zoom Link
        </a>
      </CardContent >
    </Card >
  )
}