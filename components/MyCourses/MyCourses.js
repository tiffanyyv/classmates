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
import { useEffect, useState } from 'react';

export default function MyCourses({ course }) {
  const [showStudentList, setShowStudentList] = useState(false);
  const [editCourseInfo, setEditCourseInfo] = useState(false);
  const [userType, setUserType] = useState('mentor');
  const [currCourseName, setCurrCourseName] = useState(course.courseName);
  const [currStartTime, setCurrStartTime] = useState(course.startTime);
  const [currEndTime, setCurrEndTime] = useState(course.endTime);
  const [newStartTime, setNewStartTime] = useState(new Date());
  const [newEndTime, setNewEndTime] = useState(new Date());

  const handleStudentList = () => {
    if (userType === 'mentor') {
      setShowStudentList(!showStudentList)
    }
  }

  const handleEditCourse = () => {
    setEditCourseInfo(!editCourseInfo)
  }

  const mentorProfile = () => {
  }

  const onCourseEdit = () => {

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
                    autoFocus
                    margin="dense"
                    // id="courseName"
                    label="New Course Name"
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={(e) => setCurrCourseName(e.target.value)}
                  />
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                      renderInput={(props) => <TextField {...props} />}
                      label="New Start Time"
                      value={newStartTime}
                      onChange={(newValue) => {
                        setCurrStartTime(newValue);
                      }}
                  />
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                      renderInput={(props) => <TextField {...props} />}
                      label="New End Time"
                      value={newEndTime}
                      onChange={(newValue) => {
                        setCurrEndTime(newValue);
                      }}
                  />
                </LocalizationProvider>
                </DialogContent>
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

{/* <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePicker
            renderInput={(props) => <TextField {...props} />}
            label="DateTimePicker"
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
          />
        </LocalizationProvider> */}