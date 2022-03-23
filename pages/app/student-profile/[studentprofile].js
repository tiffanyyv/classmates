import { useState } from 'react';

import { Avatar } from '@mui/material';

import styles from '../../../utils/styles/Profiles.module.css';
import {defaultProfilePic, defaultProfilePicDims} from '../../../utils/constants';

// account type: account_type
// first name: name.first_name
// last name: name.last_name
// location: location
// description: description
// endorsements: endorsements
export default function StudentProfile(props) {
  const [userType, setUserType] = useState('mentor');
  const [currentStudentRecommend, setCurrentStudentRecommend] = useState(10);

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
        {userType === 'mentor' &&
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