import { useState } from 'react';
import Link from 'next/link';

import {
  Avatar,
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

import MainButton from '../basecomponents/MainButton.js'
import { defaultProfilePic } from '../../utils/constants/index.js'
import styles from '../../utils/styles/MyCoursesStyles/MyCourses.module.css';

export default function MyCourses({ course, index, handleDeleteCourse, handleEditCourse }) {
  const [showStudentList, setShowStudentList] = useState(false);
  const [editCourseInfo, setEditCourseInfo] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(index);
  const [userType, setUserType] = useState('mentor');

  const [newCourseName, setNewCourseName] = useState(course.courseName);
  const [newStartTime, setNewStartTime] = useState(course.startTime);
  const [newEndTime, setNewEndTime] = useState(course.endTime);

  const handleStudentList = () => {
    if (userType === 'mentor') {
      setShowStudentList(!showStudentList)
    }
  }

  const handleEditModal = () => {
    setEditCourseInfo(!editCourseInfo)
    setNewCourseName(course.courseName)
  }

  const handleSubmitEditCourse = () => {
    handleEditModal();
    handleEditCourse(currentIndex, newCourseName, newStartTime, newEndTime);
  }

  const handleOpenZoomLink = (url) => {
    window.open(url, '_blank', 'noreferrer')
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
            {course.courseName}
            {userType === 'mentor' &&
              <EditIcon onClick={handleEditModal} className={styles.editCourseButton}/>}
              <Dialog open={editCourseInfo} onClose={handleEditModal}>
                <DialogTitle>Update Course Info</DialogTitle>
                <DialogContent>
                  <TextField
                    autoFocus
                    margin="dense"
                    label="Edit Course Name"
                    value={newCourseName}
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
                      label="Edit Start Time"
                      value={newStartTime}
                      onChange={(newValue) => {
                        setNewStartTime(newValue);
                      }}
                    />
                  </LocalizationProvider>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                      renderInput={(props) => <TextField {...props} />}
                      label="Edit End Time"
                      value={newEndTime}
                      onChange={(newValue) => {
                        setNewEndTime(newValue);
                      }}
                    />
                  </LocalizationProvider>
                  </Stack>
                </DialogContent>
                <MainButton
                  value="Submit Changes"
                  onClick={handleSubmitEditCourse}/>
              </Dialog>
          </Stack>
        </Typography>

        <Stack spacing={1}>
          <Stack direction="row" spacing={1}>
          <Link href={`/app/teacher-profile/${course.teacherName}`} passHref>
              <Avatar
                alt="Teacher Avatar"
                src={defaultProfilePic}
                sx={{ width: 20, height: 20 }}
                className={styles.cardUserAvatar}
              />
            </Link>
            <Typography variant="body2" color="text.secondary">
              <strong>{course.teacherName}</strong>
            </Typography>
          </Stack>

          <Typography variant="body2" color="text.secondary">
            <strong >Course Start Time: </strong> {`${course.startTime}`}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong> Course End Time: </strong> {`${course.endTime}`}
          </Typography>

          <Stack spacing={1}>
            <MainButton value="Zoom Link" onClick={() => handleOpenZoomLink(course.zoomLink)}/>
            {userType === 'mentor' &&
              <>
                <MainButton value="Attendance List" onClick={handleStudentList}/>
                <MainButton value="Cancel Course" onClick={() => handleDeleteCourse(currentIndex)}/>
              </>}
            <Dialog onClose={handleStudentList} open={showStudentList} fullWidth={true}>
              <DialogTitle>Students</DialogTitle>
                <DialogContent>
                  {course.studentList.map((student, index) => (
                    <Stack direction="row" spacing={1} key={`${index}`}>
                      <Link href={`/app/student-profile/${student}`} passHref>
                        <Avatar
                          alt="Student Avatar"
                          src={defaultProfilePic}
                          sx={{ width: 20, height: 20 }}
                          className={styles.cardUserAvatar}
                        />
                      </Link>
                      <DialogContentText>{`${student}`}</DialogContentText>
                    </Stack>
                  ))}
                </DialogContent>
            </Dialog>
          </Stack>
        </Stack>
      </CardContent >
    </Card >
  )
}