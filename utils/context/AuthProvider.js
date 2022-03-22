import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios'
import { useRouter } from 'next/router';
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth } from '../api/firebase.config.js';

const AuthContext = createContext();

// need to implement state machine for idle,loading, success, and error states
export function AuthProvider({ children }) {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();

  const signup = (body) => {
    createUserWithEmailAndPassword(auth, body.email, body.password)
      .then(async (response) => {
        body['uid'] = response.user.uid
        if (body.account_type === 'Mentor') {
           await fetch('/api/pages/mentors/index.js', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: body,
          });
        } else {
          await fetch('/api/pages/mentees/index.js', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: body,
          });
        }
        router.push('/app/my-courses')
      })
      .catch((err) => {
        console.warn('Problem with sign up: ', err.message);
      })
  }

  const login = (email, password) => {
    console.log(email, password)
    return signInWithEmailAndPassword(auth, email, password)
      .then((response) => {
        // need to set redirect to /[username]/dashboard
        // need to set success state
        router.push('/app/my-courses');
        console.log(response)
      })
      .catch((err) => {
        // needs to set an error state
        console.warn('Problem with log in: ', err.message);
      })
  }

  const logout = async () => {
    router.push('/');
    await signOut(auth);
  }

  // OAuth Google + FB
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(res => {
        console.log(res)
        router.push('/app/my-courses');

      })
      .catch(error => {
        console.warn(error)
      })
  }
  const signInWithFacebook = () => {
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider)
      .then(res => {
        console.log(res)
        router.push('/app/my-courses');

      })
      .catch(error => {
        console.warn(error)
      })
  }

  return (
    <AuthContext.Provider
      value={{
        user, loading, error,
        signup, login, logout,
        signInWithGoogle, signInWithFacebook
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthContext() {
  return useContext(AuthContext);
}