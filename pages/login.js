import { useState } from 'react';
import { useRouter } from 'next/router';

import { useAuthContext } from '../utils/context/AuthProvider';

export default function Login() {
  const { user, loading, error, login, signInWithGoogle, signInWithFacebook, logout } = useAuthContext(); // check if user context import is necessary
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: ''
  })

  const router = useRouter();

  const handleLoginFormInput = (e, field) => {
    setLoginInfo({
      ...loginInfo,
      [field]: e.target.value
    })
  }

  const handleStandardLogin = (e) => {
    e.preventDefault();
    login(loginInfo.email, loginInfo.password)
  }


  if (loading) {
    return (
      <div>
        <p>Loading</p>
      </div>
    )
  }

  if (error) {
    return (
      <div>
        <p>error: {error}</p>
      </div>
    )
  }

  if (user) {
    router.push(`/${user.uid}`);
  }

  return (
      <div>
        <form onSubmit={(e) => handleStandardLogin(e)}>
          <input onChange={(e) => handleLoginFormInput(e, 'email')} placeholder="Email"></input>
          <input onChange={(e) => handleLoginFormInput(e, 'password')} placeholder="Password"></input>
          <button type="submit">Login</button>
        </form>
        <div>
          <button onClick={signInWithGoogle}>Google</button>
          <button onClick={signInWithFacebook}>Facebook</button>
            <p><a href="/">Go Home</a></p>
        </div>
      </div>
  )
}
