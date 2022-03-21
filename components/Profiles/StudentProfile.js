import { useState, useEffect } from 'react';

export default function StudentProfile() {
  const [userType, setUserType] = useState('mentor');
  // current user profile
  // mentors can see endorsement count
  // change profile picture div to image
  return (
    <div className="student-profile-view">
      <div>Profile Picture</div>
      <div>My Profile Page</div>
      <h3>Location</h3>
      <p>Description</p>
      <h3>Classes Offered</h3>
      {userType === 'mentor' && <h4>Recommended:</h4>}
      {userType === 'mentor' && <div>Would you recommend this student?</div>}
    </div>


  )
}

// teacher: can upvote/downvote students
// teacher: can't endorse themselves

// student: can't see their own votes
// student: can upvote/downvote mentors only