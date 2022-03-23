import { useState, useEffect } from 'react';
import { getUserInfo, updateUserEndorsements } from '../../../utils/api/apiCalls.js';

import { Avatar } from '@mui/material';

import styles from '../../../utils/styles/Profiles.module.css';
import {defaultProfilePic, defaultProfilePicDims} from '../../../utils/constants';


export default function StudentProfile(props) {
  const [userType, setUserType] = useState('Mentor');
  const [userID, setUserID] = useState('51');
  const [studentID, setStudentID] = useState('1');
  const [currentStudentInfo, setCurrentStudentInfo] = useState({
    // studentID: '',
    fullName: '',
    location: '',
    description: '',
    endorsements: 0,
    photo: ''
  });

  useEffect(() => {
    fetchUserInfo();
    fetchStudentInfo();
  }, [])

  const fetchUserInfo = () => {
    getUserInfo(userID)
    .then(res => {
      // console.log(window.location.pathname.split('/')[3])
      // setCurrentStudentInfo({...currentStudentInfo, studentID: window.location.pathname.split('/')[3]})
      // setStudentID(window.location.pathname.split('/')[3])
      console.log('thiS IS STUDENT ID ', studentID)
      setUserType(res.account_type)
    }).catch(err => {
      console.log('Error getting user data')
    })
  }

  const fetchStudentInfo = () => {
    getUserInfo(studentID).then(res => {
      setCurrentStudentInfo({
        fullName: res.name.first_name + ' ' + res.name.last_name,
        location: res.location,
        description: res.description,
        endorsements: res.endorsements,
        photo: res.photo
      })
    })
  }

  const updateVoteStudents = () => {
    updateUserEndorsements(studentID).then(res => {
      console.log('Updated vote for student')
    }).catch(err => {
      console.log('Error voting for student')
    })
  }


  // increment with axios put request
  // re render page with new count
  // add user type: teacher or student
  const handleUpvoteStudent = () => {
    setCurrentStudentRecommend(currentStudentRecommend + 1);
  }

  const handleDownvoteStudent = () => {
    setCurrentStudentRecommend(currentStudentRecommend - 1);
  }

  return (
    <div className="pageData">
      <div className={styles.profileContainer}>
          <div className={styles.profilePic}>
            <Avatar
              className="my-profile-view-avatar"
              alt="Student Profile Picture"
              src={currentStudentInfo.photo ? currentStudentInfo.photo : defaultProfilePic}
              sx={defaultProfilePicDims}
            /></div>
        <div className={styles.profileDescription}>
          <h2>{currentStudentInfo.fullName}</h2>
          <h3>{currentStudentInfo.location}</h3>
          <p>{currentStudentInfo.description}</p>
        </div>
      </div>
        {userType === 'Mentor' &&
          <div>
            <div>Recommended: {currentStudentInfo.endorsements}</div>
            <div>Would you recommend this student?</div>
            <span onClick={updateUserEndorsements}>Yes</span>
            <span> | </span>
            <span onClick={handleDownvoteStudent}>No</span>
          </div>
        }
    </div>
  )
}