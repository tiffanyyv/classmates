import { useState, useEffect } from 'react';
import { getUserInfo, updateUserEndorsements } from '../../utils/api/apiCalls.js';

import { Avatar } from '@mui/material';

import styles from '../../utils/styles/Profiles.module.css';
import { defaultProfilePic, defaultProfilePicDims } from '../../utils/constants';


export default function StudentProfile({ selectedStudentID, currentUserType }) {
  const [selectedStudentInfo, setSelectedStudentInfo] = useState({
    fullName: '',
    location: '',
    description: '',
    endorsements: 0,
    photo: ''
  });
  const [didVoteStudent, setDidVoteStudent] = useState(false);

  const updateVoteStudent = (type) => {
    updateUserEndorsements(selectedStudentID, { "type": type })
      .then(res => {
        setDidVoteStudent(true);
      }).catch(err => {
        console.warn('Error voting for student')
      })
  }

  useEffect(() => {
    getUserInfo(selectedStudentID)
      .then(res => setSelectedStudentInfo({
        fullName: res.name.first_name + ' ' + res.name.last_name,
        location: res.location,
        description: res.description,
        endorsements: res.endorsements,
        photo: res.photo
      }))
      .catch(err => console.log(err))
  }, [didVoteStudent])


  return (
    <div className="pageData">
      <div className={styles.profileContainer}>
        <div className={styles.profilePic}>
          <Avatar
            className="my-profile-view-avatar"
            alt="Student Profile Picture"
            src={selectedStudentInfo.photo ? selectedStudentInfo.photo : defaultProfilePic}
            sx={defaultProfilePicDims}
          /></div>
        <h2>{selectedStudentInfo.fullName}</h2>
        <h3>Mentee</h3>
        <h4>{selectedStudentInfo.location}</h4>
        <p>{selectedStudentInfo.description}</p>
        {currentUserType === 'Mentor' &&
          <div className={styles.profileEndorsementSection}>
            <h4>Recommended: {selectedStudentInfo.endorsements}</h4>
            {!didVoteStudent && <>
              <div>Would you recommend this mentee?</div>
            <span className={styles.endorsementUpdate} onClick={() => updateVoteStudent('increase')}>Yes</span>
            <span> | </span>
            <span className={styles.endorsementUpdate} onClick={() => updateVoteStudent('decrease')}>No</span>
            </>}
          </div>
        }
      </div>
    </div>
  )
}
