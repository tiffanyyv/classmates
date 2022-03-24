import { useState, useEffect } from 'react';
import { getUserInfo, updateUserEndorsements } from '../../utils/api/apiCalls.js';

import { Avatar } from '@mui/material';

import styles from '../../utils/styles/Profiles.module.css';
import { defaultProfilePic, defaultProfilePicDims } from '../../utils/constants';


export default function StudentProfile({ studentID }) {
  const [userType, setUserType] = useState('Mentor');
  // refactor
  const [userID, setUserID] = useState('51');
  const [currentStudentID, setCurrentStudentID] = useState(studentID);
  const [currentStudentInfo, setCurrentStudentInfo] = useState({
    fullName: '',
    location: '',
    description: '',
    endorsements: 0,
    photo: ''
  });

  // refactor later
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
        setUserType(res.account_type)
      }).catch(err => {
        console.warn('Error getting user data')
      })
  }

  const fetchStudentInfo = () => {
    getUserInfo(currentStudentID).then(res => {
      setCurrentStudentInfo({
        fullName: res.name.first_name + ' ' + res.name.last_name,
        location: res.location,
        description: res.description,
        endorsements: res.endorsements,
        photo: res.photo
      })
    })
  }

  const updateVoteStudent = () => {
    updateUserEndorsements(currentStudentID).then(res => {
      console.log('Updated vote for student')
    }).catch(err => {
      console.warn('Error voting for student')
    })
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
        <h2>{currentStudentInfo.fullName}</h2>
        <h3>Mentee</h3>
        <h4>{currentStudentInfo.location}</h4>
        <p>{currentStudentInfo.description}</p>
        {userType === 'Mentor' &&
          <div className={styles.profileEndorsementSection}>
            <h4>Recommended: {currentStudentInfo.endorsements}</h4>
            <div>Would you recommend this mentee?</div>
            <span className={styles.endorsementUpdate} onClick={updateVoteStudent}>Yes</span>
            <span> | </span>
            <span className={styles.endorsementUpdate}>No</span>
          </div>
        }
      </div>
    </div>
  )
}