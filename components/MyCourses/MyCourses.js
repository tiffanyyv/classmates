import {
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Typography,
  Box,
  Stack,
  List,
  ListItem,
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
import MainButton from '../basecomponents/MainButton.js'

export default function MyCourses({ course }) {
  const [showStudentList, setShowStudentList] = useState(false);
  const [editCourseInfo, setEditCourseInfo] = useState(false);
  const [userType, setUserType] = useState('mentor');
  const [currCourseName, setCurrCourseName] = useState(course.courseName);
  const [currStartTime, setCurrStartTime] = useState(course.startTime);
  const [currEndTime, setCurrEndTime] = useState(course.endTime);
  const [newCourseName, setNewCourseName] = useState('');
  const [newStartTime, setNewStartTime] = useState(null);
  const [newEndTime, setNewEndTime] = useState(null);

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

  return (
    <Card sx={{ maxWidth: 350, margin: 1.5 }}>
      <CardMedia
        component="img"
        height="200"
        image={course.courseThumbnail}
        alt=""
        onClick={handleStudentList}
      />
      <Dialog onClose={handleStudentList} open={showStudentList} fullWidth={true}>
        <DialogTitle>Students</DialogTitle>
        <List>
          {course.studentList.map((student, index) => (
            <ListItem key={`${index}`}>{`${student}`}</ListItem>
          ))}
        </List>
      </Dialog>
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
                    error
                    autoFocus
                    margin="dense"
                    // id="courseName"
                    label="New Course Name"
                    type="text"
                    fullWidth
                    variant="standard"
                    color='info'
                    focused
                    onChange={(e) => setNewCourseName(e.target.value)}
                  />
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                      renderInput={(props) => <TextField {...props}/>}
                      label="New Start Time"
                      value={newStartTime}
                      onChange={(newValue) => {
                        setNewStartTime(newValue);
                        // setCurrStartTime(newValue);
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
                        // setCurrEndTime(newValue);
                      }}
                    />
                  </LocalizationProvider>
                </DialogContent>
                <MainButton value="Submit Changes" onClick={handleSubmitCourseChanges}/>
              </Dialog>
          </Stack>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Mentor:</strong> {course.mentorName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong >Course Start Time:</strong> {`${currStartTime}`}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong> Course End Time:</strong> {`${currEndTime}`}
        </Typography>
        <a href={`${course.zoomLink}`} target="_blank" rel="noreferrer">
          Zoom Link
        </a>
      </CardContent >
    </Card >
  )
}