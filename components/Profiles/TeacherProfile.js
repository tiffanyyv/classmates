import { useState, useEffect } from 'react';

export default function TeacherProfile() {
  const [userType, setUserType] = useState('mentor');

  // current user profile
  // mentors can see endorsement count
  // change profile picture div to image
  return (
    <div className="teacher-profile-view">
      <div>Profile Picture</div>
      <h2>My Profile Page</h2>
      <h3>Location</h3>
      <p>Description</p>
      <h3>Classes Offered</h3>
      <h4>Recommended:</h4>
      {userType === 'student' && <div>Would you recommend this teacher?</div>}
    </div>


  )
}

// teacher: can upvote/downvote students
// teacher: can't endorse themselves

// student: can't see their own votes
// student: can upvote/downvote mentors only