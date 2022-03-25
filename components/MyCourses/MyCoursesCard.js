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
import { formatDate } from '../../utils/helpers/helpers.js';
import SelectedUserProfile from '../UserProfileView/SelectedUserProfileView.js';
import styles from '../../utils/styles/MyCoursesStyles/MyCourses.module.css';

export default function MyCoursesCard({ course, index, handleDeleteCourse, handleEditCourse, handleStudentDropCourse, userInfo }) {
  const [showStudentList, setShowStudentList] = useState(false);
  const [editCourseInfo, setEditCourseInfo] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(index);

  const [newCourseName, setNewCourseName] = useState(course.name);
  const [newStartTime, setNewStartTime] = useState(course.start_date);
  const [newEndTime, setNewEndTime] = useState(course.end_date);
  const [showProfileView, setShowProfileView] = useState(false);
  const [selectedStudentID, setSelectedStudentID] = useState('');

  const handleProfileView = (studentID) => {
    setShowProfileView(!showProfileView)
    setSelectedStudentID(studentID)
  }

  const handleStudentList = () => {
    if (userInfo.userType === 'Mentor') {
      setShowStudentList(!showStudentList)
    }
  }

  const handleEditModal = () => {
    setEditCourseInfo(!editCourseInfo)
    setNewCourseName(course.name)
  }

  const handleSubmitEditCourse = () => {
    handleEditModal();
    handleEditCourse(course, newCourseName, newStartTime, newEndTime);
  }

  const handleOpenZoomLink = (url) => {
    window.open(url, '_blank', 'noreferrer')
  }

  return (
    <Card sx={{ width: 300, margin: 1.5 }}>
      <CardMedia
        component="img"
        height="175"
        image={course.photo}
        alt="Course Photo"
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          <Stack direction="row">
            {course.name}
            {userInfo.userType === 'Mentor' &&
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
            <Avatar
              alt="Teacher Avatar"
              src={course.mentor.photo ? course.mentor.photo : defaultProfilePic}
              sx={{ width: 20, height: 20 }}
              className={styles.cardUserAvatar}
              onClick={() => handleProfileView(course.mentor.id)}
            />
            <Dialog onClose={handleProfileView} open={showProfileView} fullWidth={true}>
              <DialogContent>
                <SelectedUserProfile selectedUserID={course.mentor.id} currentUserType={userInfo.userType}/>
              </DialogContent>
            </Dialog>
            <Typography variant="body2" color="text.secondary">
              <strong>{course.mentor.name.first_name} {course.mentor.name.last_name}</strong>
            </Typography>
          </Stack>

          <Typography variant="body2" color="text.secondary">
            <strong>Start Time: </strong> {formatDate(`${course.start_date}`)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>End Time: </strong> {formatDate(`${course.end_date}`)}
          </Typography>

          <Stack spacing={1}>
            <MainButton value="Zoom Link" onClick={() => handleOpenZoomLink(course.meeting_url)}/>
            {userInfo.userType === 'Mentee' &&
              <MainButton value="Drop Course" onClick={() => handleStudentDropCourse(course.id)}/>}
            {userInfo.userType === 'Mentor' &&
              <>
                <MainButton value="Attendance List" onClick={handleStudentList}/>
                <MainButton value="Cancel Course" onClick={() => handleDeleteCourse(course.id)}/>
              </>}
            <Dialog onClose={handleStudentList} open={showStudentList} fullWidth={true}>
              <DialogTitle>Students</DialogTitle>
                <DialogContent>
                  {course.mentees.map((student, index) => (
                    <Stack direction="row" spacing={1} key={`${index}`}>
                        <Avatar
                          alt="Student Avatar"
                          src={student.photo ? student.photo : defaultProfilePic}
                          sx={{ width: 20, height: 20 }}
                          className={styles.cardUserAvatar}
                          onClick={() => handleProfileView(student.id)}
                        />
                      <DialogContentText>{`${student.name.first_name} ${student.name.last_name}`}</DialogContentText>
                    </Stack>
                  ))}
                  <Dialog onClose={handleProfileView} open={showProfileView} fullWidth={true}>
                    <DialogContent>
                      <SelectedUserProfile selectedUserID={selectedStudentID} currentUserType={userInfo.userType}/>
                    </DialogContent>
                  </Dialog>
                </DialogContent>
            </Dialog>
          </Stack>
        </Stack>
      </CardContent >
    </Card >
  )
}