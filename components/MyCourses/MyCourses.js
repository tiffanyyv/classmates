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

  const [newCourseName, setNewCourseName] = useState(course.name);
  const [newStartTime, setNewStartTime] = useState(course.start_date);
  const [newEndTime, setNewEndTime] = useState(course.end_date);

  const [userType, setUserType] = useState('mentor');
  const [userID, setUserID] = useState(51);

  const handleStudentList = () => {
    if (userType === 'mentor') {
      setShowStudentList(!showStudentList)
    }
  }

  const handleEditModal = () => {
    setEditCourseInfo(!editCourseInfo)
    setNewCourseName(course.name)
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
        image={course.photo}
        alt=""
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          <Stack direction="row">
            {course.name}
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
          <Link href={`/app/teacher-profile/${course.mentor.name.first_name}_${course.mentor.name.last_name}`} passHref>
              <Avatar
                alt="Teacher Avatar"
                src={defaultProfilePic}
                sx={{ width: 20, height: 20 }}
                className={styles.cardUserAvatar}
              />
            </Link>
            <Typography variant="body2" color="text.secondary">
              <strong>{course.mentor.name.first_name} {course.mentor.name.last_name}</strong>
            </Typography>
          </Stack>

          <Typography variant="body2" color="text.secondary">
            <strong >Course Start Time: </strong> {`${course.start_date}`}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong> Course End Time: </strong> {`${course.end_date}`}
          </Typography>

          <Stack spacing={1}>
            <MainButton value="Zoom Link" onClick={() => handleOpenZoomLink(course.meeting_url)}/>
            {userType === 'mentor' &&
              <>
                <MainButton value="Attendance List" onClick={handleStudentList}/>
                <MainButton value="Cancel Course" onClick={() => handleDeleteCourse(currentIndex)}/>
              </>}
            <Dialog onClose={handleStudentList} open={showStudentList} fullWidth={true}>
              <DialogTitle>Students</DialogTitle>
                <DialogContent>
                  {course.mentees.map((student, index) => (
                    <Stack direction="row" spacing={1} key={`${index}`}>
                      <Link href={`/app/student-profile/${student.name.first_name}_${student.name.last_name}`} passHref>
                        <Avatar
                          alt="Student Avatar"
                          src={defaultProfilePic}
                          sx={{ width: 20, height: 20 }}
                          className={styles.cardUserAvatar}
                        />
                      </Link>
                      <DialogContentText>{`${student.name.first_name} ${student.name.last_name}`}</DialogContentText>
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