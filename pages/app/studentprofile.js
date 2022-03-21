import { useState, useEffect } from 'react';
import { Avatar } from '@mui/material';
import styles from '../../utils/styles/Profiles.module.css';
import defaultProfilePic from '../../utils/constants';
// import StudentProfileView from '../../components/Profiles/StudentProfileView.js';
// import TeacherProfileView from '../../components/Profiles/TeacherProfileView.js';

export default function StudentProfile(props) {
  const [userType, setUserType] = useState('mentor');
  const [currentStudentRecommend, setCurrentStudentRecommend] = useState(10);

  // increment with axios put request
  // re render page with new count
  const handleUpvoteStudent = () => {
    setCurrentStudentRecommend(currentStudentRecommend++);
  }

  const handleDownvoteStudent = () => {
    setCurrentStudentRecommend(currentStudentRecommend--);
  }

  return (
    <div className="pageData">
      <div className={styles.profileContainer}>
          <div className={styles.profilePic}>
            <Avatar
              className="my-profile-view-avatar"
              alt="Student Profile Picture"
              src={defaultProfilePic}
              sx={{ width: 300, height: 300 }}
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
            <span>{" "}|{" "}</span>
            <span onClick={handleDownvoteStudent}>No</span>
          </div>
        }
    </div>
  )
}