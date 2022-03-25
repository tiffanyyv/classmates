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
import { formatDate } from '../../utils/helpers/helpers.js';
import SelectedUserProfile from '../UserProfileView/SelectedUserProfileView.js';
import styles from '../../utils/styles/CourseCatalogStyles/CourseCatalog.module.css';
import { updateCourseEndorsements } from '../../utils/api/apiCalls.js';

export default function CourseCatalogCard({ course, handleStudentAddCourse, userInfo }) {
  const [showCourseInfo, setShowCourseInfo] = useState(false);
  const [showStudentList, setShowStudentList] = useState(false);
  const [selectedStudentID, setSelectedStudentID] = useState('');
  const [showProfileView, setShowProfileView] = useState(false);
  const [didUserVote, setDidUserVote] = useState(false);
  const [courseEndorsements, setCourseEndorsements] = useState(course.endorsements)

  const handleProfileView = (studentID) => {
    setShowProfileView(!showProfileView)
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

  const handleIncreaseEndorsement = (currentCourseID, type) => {
    updateCourseEndorsements(currentCourseID, { "type": type })
      .then(() => setDidUserVote(true))
      .then(() => setCourseEndorsements(courseEndorsements + 1))
      .catch(err => console.warn('Error recommending course'));
  }

  const handleDecreaseEndorsement = (currentCourseID, type) => {
    updateCourseEndorsements(currentCourseID, { "type": type })
      .then(() => setDidUserVote(true))
      .then(() => setCourseEndorsements(courseEndorsements - 1))
      .catch(err => console.warn('Error recommending course'));
  }

  return (
    <Card sx={{ width: 300, margin: 1.5 }}>
      <CardMedia
        component="img"
        height="175"
        image={course.photo}
        alt="Course photo"
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
            <Avatar
              alt="Teacher Avatar"
              src={course.mentor.photo}
              sx={{ width: 20, height: 20 }}
              className={styles.cardUserAvatar}
              onClick={() => handleProfileView(course.mentor.id)}
            />
            <Dialog onClose={handleProfileView} open={showProfileView} fullWidth={true}>
              <DialogContent>
                <SelectedUserProfile selectedUserID={course.mentor.id} currentaccount_type={userInfo.account_type}/>
              </DialogContent>
            </Dialog>
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
                  <DialogContentText><strong>Course Begins:</strong> {formatDate(`${course.start_date}`)}</DialogContentText>
                  <DialogContentText><strong>Course Ends:</strong> {formatDate(`${course.end_date}`)}</DialogContentText>
                  <Stack direction="row" spacing={1}>
                    <DialogContentText><strong>Student Recommendations:</strong> {courseEndorsements} </DialogContentText>
                    {!didUserVote && userInfo.account_type === "Mentee" &&
                      <>
                        <DialogContentText className={styles.recommendCourse} onClick={() => handleIncreaseEndorsement(course.id, 'increase')}><strong>Yes</strong></DialogContentText>
                        <DialogContentText>|</DialogContentText>
                        <DialogContentText className={styles.recommendCourse} onClick={() => handleDecreaseEndorsement(course.id, 'decrease')}><strong>No</strong></DialogContentText>
                      </>
                    }
                  </Stack>
                  <MainButton value="Zoom Link" onClick={() => handleOpenZoomLink(course.meeting_url)}/>
                </Stack>
              </DialogContent>
            </Dialog>

            {userInfo.account_type === 'Mentor' &&
              <MainButton value="Attendance List" onClick={handleShowStudentList} />}
            <Dialog onClose={handleShowStudentList} open={showStudentList} fullWidth={true}>
              <DialogTitle>Attendance List</DialogTitle>
              <DialogContent>
                {course.mentees.length === 0 &&
                <DialogContentText>No Students Currently Attending</DialogContentText>}

                {course.mentees.map((student, index) => (
                  <Stack direction="row" spacing={1} key={`${index}`}>
                    <Avatar
                      alt="Student Avatar"
                      src={student.photo}
                      sx={{ width: 20, height: 20 }}
                      className={styles.cardUserAvatar}
                      onClick={() => handleProfileView(student.id)}
                    />
                    <DialogContentText >{student.name.first_name} {student.name.last_name}</DialogContentText>
                  </Stack>
                ))}
                <Dialog onClose={handleProfileView} open={showProfileView} fullWidth={true}>
                  <DialogContent>
                    <SelectedUserProfile selectedUserID={selectedStudentID} currentUserType={userInfo.account_type}/>
                  </DialogContent>
                </Dialog>
              </DialogContent>
            </Dialog>
            {userInfo.account_type === 'Mentee' &&
              <MainButton value="Join class" onClick={() => handleStudentAddCourse(course)} />}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}