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
  TextField,
} from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import EditIcon from '@mui/icons-material/Edit';

import MainButton from '../basecomponents/MainButton.js';
import { defaultProfilePic } from '../../utils/constants/index.js';
import SelectedStudentProfile from '../UserProfileView/SelectedStudentProfileView.js';
import SelectedTeacherProfile from '../UserProfileView/SelectedTeacherProfileView.js';
import styles from '../../utils/styles/CourseCatalogStyles/CourseCatalog.module.css';

export default function CourseCatalogCard({ course, handleStudentAddCourse, userInfo }) {
  const [showCourseInfo, setShowCourseInfo] = useState(false);
  const [showStudentList, setShowStudentList] = useState(false);
  const [editCourseInfo, setEditCourseInfo] = useState(false);
  const [selectedStudentID, setSelectedStudentID] = useState('');

  const [showNewModal, setShowNewModal] = useState(false);

  const handleNewModal = (studentID) => {
    setShowNewModal(!showNewModal)
    setSelectedStudentID(studentID)
  }

  const handleShowCourseInfo = () => {
    setShowCourseInfo(!showCourseInfo)
  }

  const handleShowStudentList = () => {
    setShowStudentList(!showStudentList)
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
        alt=""
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {course.name}
        </Typography>

        <Stack spacing={1}>
          <Typography variant="body2" color="text.secondary">
            <strong>Subject: </strong>{course.subject}
          </Typography>
          <Stack direction="row" spacing={1}>
            <Link href={`/app/teacher-profile/${course.mentor.name.first_name}_${course.mentor.name.last_name}`} passHref>
              <Avatar
                alt="Teacher Avatar"
                src={course.mentor.photo}
                sx={{ width: 20, height: 20 }}
                className={styles.cardUserAvatar}
              />
            </Link>
            <Typography variant="body2" color="text.secondary">
              <strong>{course.mentor.name.first_name} {course.mentor.name.last_name}</strong>
            </Typography>
          </Stack>

          <Stack spacing={1}>
            <MainButton value="Course Info" onClick={handleShowCourseInfo} />
            <Dialog onClose={handleShowCourseInfo} open={showCourseInfo} fullWidth={true}>
              <DialogTitle><strong>{course.name}</strong></DialogTitle>
              <DialogContent>
                <Stack spacing={1}>
                  <DialogContentText><strong>Subject:</strong> {course.subject}</DialogContentText>
                  <DialogContentText><strong>Taught By:</strong> {course.mentor.name.first_name} {course.mentor.name.last_name}</DialogContentText>
                  <DialogContentText><strong>Description:</strong> {course.description}</DialogContentText>
                  <DialogContentText><strong>Course Begins:</strong> {`${course.start_date}`}</DialogContentText>
                  <DialogContentText><strong>Course Ends:</strong> {`${course.end_date}`}</DialogContentText>
                  <DialogContentText><strong>Student Recommendations:</strong> {course.endorsements}</DialogContentText>
                  <MainButton value="Zoom Link" onClick={() => handleOpenZoomLink(course.meeting_url)}/>
                  <MainButton value="Would You Recommend This Course?"/>
                </Stack>
              </DialogContent>
            </Dialog>

            {userInfo.userType === 'Mentor' &&
              <MainButton value="Attendance List" onClick={handleShowStudentList} />}
            <Dialog onClose={handleShowStudentList} open={showStudentList} fullWidth={true}>
              <DialogTitle>Attendance List</DialogTitle>
              <DialogContent>
                {course.mentees.length === 0 &&
                <DialogContentText>No Students Currently Attending</DialogContentText>}

                {course.mentees.map((student, index) => (
                  <Stack direction="row" spacing={1} key={`${index}`}>
                    {/* <Link href={`/app/student-profile/${course.mentor.name.first_name}_${course.mentor.name.last_name}`} passHref> */}
                      <Avatar
                        alt="Student Avatar"
                        src={student.photo}
                        sx={{ width: 20, height: 20 }}
                        className={styles.cardUserAvatar}
                        onClick={() => handleNewModal(student.id)}
                      />
                    {/* </Link> */}
                    <DialogContentText >{student.name.first_name} {student.name.last_name}</DialogContentText>
                  </Stack>
                ))}
                <Dialog onClose={handleNewModal} open={showNewModal} fullWidth={true}>
                  <DialogContent>
                    <SelectedStudentProfile selectedStudentID={selectedStudentID} currentUserType={userInfo.userType}/>
                  </DialogContent>
                </Dialog>
              </DialogContent>
            </Dialog>
            {userInfo.userType === 'Mentee' && course.mentees.length < course.capacity &&
              <MainButton value="Join class" onClick={() => handleStudentAddCourse(course)} />}
            {userInfo.userType === 'Mentee' && course.mentees.length >= course.capacity &&
              <MainButton value="COURSE FULL"/>}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}