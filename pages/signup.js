import { useState } from 'react';

import { useAuthContext } from '../utils/context/AuthProvider';

export default function Signup() {
  const { signup } = useAuthContext();
  const [signupInfo, setSignupInfo] = useState({});

  const handleSignUpFormInput = (e, field) => {
    setSignupInfo({
      ...signupInfo,
      [field]: e.target.value
    })
  }

  return (
    <div>
      <form>

      </form>
    </div>
  )
}