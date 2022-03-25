import { useState, useEffect } from 'react';
import { getUserInfo, updateUserEndorsements } from '../../utils/api/apiCalls.js';

import { Avatar } from '@mui/material';

import { defaultProfilePic, defaultProfilePicDims } from '../../utils/constants';
import styles from '../../utils/styles/Profiles.module.css';


export default function SelectedUserProfile({ selectedUserID, currentUserType }) {
  const [selectedUserInfo, setSelectedUserInfo] = useState({
    accountType: 'Loading User',
    fullName: '',
    location: '',
    description: '',
    endorsements: '',
    photo: ''
  });
  const [didVoteUser, setDidVoteUser] = useState(false);

  const updateVoteUser = (type) => {
    updateUserEndorsements(selectedUserID, { "type": type })
      .then(res => {
        setDidVoteUser(true);
      }).catch(err => {
        console.warn('Error voting for user')
      })
  }

  useEffect(() => {
    getUserInfo(selectedUserID)
      .then(res => setSelectedUserInfo({
        accountType: res.account_type,
        fullName: `${res.name.first_name} ${res.name.last_name}`,
        location: res.location,
        description: res.description,
        endorsements: res.endorsements,
        photo: res.photo
      }))
      .catch(err => {
        console.warn('Error getting user info')
      })
  }, [didVoteUser])


  return (
    <div className="pageData">
      <div className={styles.selectedProfileContainer}>
        <div className={styles.profilePic}>
          <Avatar
            className="my-profile-view-avatar"
            alt="User Profile Picture"
            src={selectedUserInfo.photo ? selectedUserInfo.photo : defaultProfilePic}
            sx={defaultProfilePicDims}
          /></div>
        <h2>{selectedUserInfo.fullName}</h2>
        <h3>{selectedUserInfo.accountType}</h3>
        <h4>{selectedUserInfo.location}</h4>
        <p>{selectedUserInfo.description}</p>

        {/* teacher viewing a student profile */}
        {currentUserType === 'Mentor' && selectedUserInfo.accountType === 'Mentee' &&
          <div className={styles.profileEndorsementSection}>
            <h4>Recommended: {selectedUserInfo.endorsements}</h4>
            {!didVoteUser && <>
              <div>Would you recommend this mentee?</div>
              <span className={styles.endorsementUpdate} onClick={() => updateVoteUser('increase')}>Yes</span>
              <span> | </span>
              <span className={styles.endorsementUpdate} onClick={() => updateVoteUser('decrease')}>No</span>
            </>}
          </div>
        }

        {/* teacher viewing teacher profile */}
        {currentUserType === 'Mentor' && selectedUserInfo.accountType === 'Mentor' &&
          <div className={styles.profileEndorsementSection}>
            <h4>Recommended: {selectedUserInfo.endorsements}</h4>
          </div>
        }

        {/* student viewing a teacher profile */}
        {currentUserType === 'Mentee' && selectedUserInfo.accountType === 'Mentor' &&
          <div className={styles.profileEndorsementSection}>
            <h4>Recommended: {selectedUserInfo.endorsements}</h4>
            {!didVoteUser && <>
              <div>Would you recommend this mentor?</div>
              <span className={styles.endorsementUpdate} onClick={() => updateVoteUser('increase')}>Yes</span>
              <span> | </span>
              <span className={styles.endorsementUpdate} onClick={() => updateVoteUser('decrease')}>No</span>
            </>}
          </div>
        }
      </div>
    </div>
  )
}