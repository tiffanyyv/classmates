import { useState, useEffect } from 'react';
import { getUserInfo, updateUserEndorsements } from '../../utils/api/apiCalls.js';

import { Avatar } from '@mui/material';

import styles from '../../utils/styles/Profiles.module.css';
import { defaultProfilePic, defaultProfilePicDims } from '../../utils/constants';


export default function TeacherProfile(props) {
  const [userType, setUserType] = useState('Mentor');
  // refactor
  const [teacherID, setTeacherID] = useState('51');
  const [currentTeacherInfo, setCurrentTeacherInfo] = useState({
    fullName: '',
    location: '',
    description: '',
    endorsements: 0,
    photo: ''
  });

  // refactor later
  useEffect(() => {
    fetchUserInfo();
    fetchTeacherInfo();
  }, [])

  const fetchUserInfo = () => {
    getUserInfo(teacherID)
      .then(res => {
        setUserType(res.account_type)
      }).catch(err => {
        console.warn('Error getting user data')
      })
  }

  const fetchTeacherInfo = () => {
    getUserInfo(teacherID).then(res => {
      setCurrentTeacherInfo({
        fullName: res.name.first_name + ' ' + res.name.last_name,
        location: res.location,
        description: res.description,
        endorsements: res.endorsements,
        photo: res.photo
      })
    })
  }

  const updateVoteTeacher = () => {
    updateUserEndorsements(studentID).then(res => {
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
            alt="Teacher Profile Picture"
            src={defaultProfilePic}
            sx={defaultProfilePicDims}
          /></div>
        <h2>{currentTeacherInfo.fullName}</h2>
        <h3>Mentor</h3>
        <h4>{currentTeacherInfo.location}</h4>
        <p>{currentTeacherInfo.description}</p>

        {userType === 'Mentor' && <h4 className={styles.profileEndorsementSection}>Recommended: {currentTeacherInfo.endorsements}</h4>}
        {userType === 'Student' &&
          <div className={styles.profileEndorsementSection}>
            <div>Would you recommend this teacher?</div>
            <span className={styles.endorsementUpdate} onClick={handleUpvoteTeacher}>Yes</span>
            <span> | </span>
            <span className={styles.endorsementUpdate}>No</span>
          </div>
        }
        <div>
          Classes I Teach:
        </div>
      </div>
    </div>
  )
}