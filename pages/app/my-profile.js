import { useState, useEffect } from 'react';
import { Avatar } from '@mui/material';
import styles from '../../utils/styles/Profiles.module.css';
import {defaultProfilePic, defaultProfilePicDims} from '../../utils/constants';

// word-wrap normal in the global page
// add user type: teacher or student
export default function MyProfile(props) {
  const [userType, setUserType] = useState('mentor');

  return (
    <div className="pageData">
      <div className={styles.profileContainer}>
          <div className={styles.profilePic}>
            <Avatar
              className="my-profile-view-avatar"
              alt="My Profile Picture"
              src={defaultProfilePic}
              sx={defaultProfilePicDims}
            /></div>
        <div className={styles.profileDescription}>
          <h2>Current User</h2>
          <h3>Location</h3>
          <p>Description</p>
        </div>
      </div>
        {userType === 'mentor' && <div>Recommended:</div>}
    </div>
  )
}
