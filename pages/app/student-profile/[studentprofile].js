import { useState, useEffect } from 'react';
import { getUserInfo } from '../../../utils/api/apiCalls.js';

import { Avatar } from '@mui/material';

import styles from '../../../utils/styles/Profiles.module.css';
import {defaultProfilePic, defaultProfilePicDims} from '../../../utils/constants';


export default function StudentProfile(props) {
  const [userType, setUserType] = useState('Mentor');
  const [userID, setUserID] = useState('51');
  const [currentStudentRecommend, setCurrentStudentRecommend] = useState(10);
  const [studentID, setStudentID] = useState('');
  const [currentStudentInfo, setCurrentStudentInfo] = useState({
    // studentID: '',
    fullName: '',
    location: '',
    description: '',
    endorsements: 0
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
      setStudentID(window.location.pathname.split('/')[3])
      console.log('thiS IS STUDENT ID ', studentID)
      setUserType(res.account_type)
    }).catch(err => {
      console.log('Error getting user data')
    })
  }

  const fetchStudentInfo = () => {
    getUserInfo(studentID).then(res => {
      console.log('THIS IS STUDENT ', res)
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
              src={defaultProfilePic}
              sx={defaultProfilePicDims}
            /></div>
        <div className={styles.profileDescription}>
          <h2>Current User</h2>
          <h3>Location</h3>
          <p>Description</p>
        </div>
      </div>
        {userType === 'Mentor' &&
          <div>
            <div>Recommended: {currentStudentRecommend}</div>
            <div>Would you recommend this student?</div>
            <span onClick={handleUpvoteStudent}>Yes</span>
            <span> | </span>
            <span onClick={handleDownvoteStudent}>No</span>
          </div>
        }
    </div>
  )
}