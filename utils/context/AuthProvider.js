import { createContext, useContext, useState, useEffect } from 'react';
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

  const signup = (email, password, username) => {
     createUserWithEmailAndPassword(auth, email, password)
      .then((response) => {
        router.push('/app')
        console.log(response)
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
      router.push('/app');
      console.log(response)
    })
      .catch((err) => {
        // needs to set an error state
        console.warn('Problem with log in: ', err.message);
      })
  }

  const logout = async () => {
    router.push('/login');
    await signOut(auth);
  }

  // OAuth Google + FB
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(res => {
        console.log(res)
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