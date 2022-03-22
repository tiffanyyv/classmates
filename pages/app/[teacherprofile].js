import { useState } from 'react';

import { Avatar } from '@mui/material';

import styles from '../../utils/styles/Profiles.module.css';
import defaultProfilePic from '../../utils/constants';

export default function TeacherProfile(props) {
  const [userType, setUserType] = useState('mentor');
  const [currentTeacherRecommend, setCurrentTeacherRecommend] = useState(10);

  // increment with axios put request
  // re render page with new count
  // add user type: teacher or student
  const handleUpvoteTeacher = () => {
    setCurrentTeacherRecommend(currentTeacherRecommend++);
  }

  const handleDownvoteTeacher = () => {
    setCurrentTeacherRecommend(currentTeacherRecommend--);
  }

  return (
    <div className="pageData">
      <div className={styles.profileContainer}>
          <div className={styles.profilePic}>
            <Avatar
              className="my-profile-view-avatar"
              alt="Teacher Profile Picture"
              src={defaultProfilePic}
              sx={{ width: 300, height: 300 }}
            /></div>
        <div className={styles.profileDescription}>
          <h2>Current User</h2>
          <h3>Location</h3>
          <p>Description</p>
        </div>
      </div>
        {userType === 'mentor' && <div>Recommended: {currentTeacherRecommend}</div>}
        {userType === 'student' &&
          <div>
            <div>Would you recommend this teacher?</div>
            <span onClick={handleUpvoteTeacher}>Yes</span>
            <span>{" "}|{" "}</span>
            <span onClick={handleDownvoteStudent}>No</span>
          </div>
        }
    </div>
  )
}
