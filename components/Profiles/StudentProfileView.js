// import { useState } from 'react';

// export default function StudentProfileView() {
//   // always going to be mentor view of the student's profile
//   const [userType, setUserType] = useState('mentor');

//   return (
//     <div>
//       <div>Recommended: </div>
//       <div>Would you recommend this student?</div>
//       <div>Yes</div>
//       <div>No</div>
//     </div>
//   )

// }

// import { useState, useEffect } from 'react';
// import { Avatar } from '@mui/material';
// import styles from '../../utils/styles/Profiles.module.css';
// import defaultProfilePic from '../../utils/constants';

// export default function StudentProfile() {
//   const [userType, setUserType] = useState('mentor');
//   // current user profile
//   // mentors can see endorsement count
//   // change profile picture div to image
//   return (
//     <div className={styles.myProfileView}>
//       <h2>My Profile Page</h2>
//       <div className={styles.profilePic}>
//         <Avatar
//           className="my-profile-view-avatar"
//           alt="Remy Sharp"
//           src={defaultProfilePic}
//           sx={{ width: 150, height: 150 }}
//         /></div>
//       <div className={styles.profileDescription}>
//         <h3>Location</h3>
//         <p>Description</p>
//       </div>
//       {userType === 'mentor' && <h4>Recommended:</h4>}
//       {userType === 'mentor' && <div>Would you recommend this student?</div>}
//     </div>


//   )
// }

// // teacher: can upvote/downvote students
// // teacher: can't endorse themselves

// // student: can't see their own votes
// // student: can upvote/downvote mentors only