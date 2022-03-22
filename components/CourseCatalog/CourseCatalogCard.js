import { useState } from 'react';

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
  TextField,
} from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import EditIcon from '@mui/icons-material/Edit';
import MainButton from '../basecomponents/MainButton.js'

export default function CourseCatalogCard({ course }) {
  const [userType, setUserType] = useState('mentor');
  const [showCourseInfo, setShowCourseInfo] = useState(false);
  const [showStudentList, setShowStudentList] = useState(false);

  const [editCourseInfo, setEditCourseInfo] = useState(false);

  const handleShowCourseInfo = () => {
    setShowCourseInfo(!showCourseInfo)
  }

  const handleShowStudentList = () => {
    setShowStudentList(!showStudentList)
  }

  // write out after connecting with API
  // student will join class and be added to the list
  // need to check if class is public or private
  const handleJoinClass = () => {
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
          {course.courseName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Taught By: </strong>{course.teacherName}
        </Typography>

        <Stack spacing={1}>
          <MainButton value="Course Info" onClick={handleShowCourseInfo} />
          <Dialog onClose={handleShowCourseInfo} open={showCourseInfo} fullWidth={true}>
            <DialogTitle>Course Info</DialogTitle>
            <DialogContent>
              <DialogContentText><strong>Course Name:</strong> {course.courseName}</DialogContentText>
              <DialogContentText><strong>Subject:</strong> </DialogContentText>
              <DialogContentText><strong>Taught By:</strong> {course.teacherName}</DialogContentText>
              <DialogContentText><strong>Course Begins:</strong> {`${course.startTime}`}</DialogContentText>
              <DialogContentText><strong>Course Ends:</strong> {`${course.endTime}`}</DialogContentText>
              <DialogContentText>
                <a href={`${course.zoomLink}`} target="_blank" rel="noreferrer">Course Zoom Link</a>
              </DialogContentText>
            </DialogContent>
          </Dialog>

          {userType === 'mentor' &&
            <MainButton value="Attendance List" onClick={handleShowStudentList} />}
          <Dialog onClose={handleShowStudentList} open={showStudentList} fullWidth={true}>
            <DialogTitle>Attendance List</DialogTitle>
            <DialogContent>
              {course.studentList.map((student, index) => (
                <DialogContentText key={`${index}`}>{`${student}`}</DialogContentText>
              ))}
            </DialogContent>
          </Dialog>
          {userType === 'student' &&
            <MainButton value="Join class" onClick={handleJoinClass} />}
        </Stack>
      </CardContent>
    </Card>
  )
}