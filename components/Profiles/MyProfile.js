import { useState, useEffect } from 'react';

export default function MyProfile() {
  const [userType, setUserType] = useState('mentor');

  // current user profile
  // mentors can see endorsement count
  // change profile picture div to image
  return (
    <div>
      <div>Profile Picture</div>
        <div>My Profile Page</div>
        <div>Location</div>
        <div>Description</div>
        {userType === 'mentor' && <div>Endorsements:</div>}
    </div>
  )
}