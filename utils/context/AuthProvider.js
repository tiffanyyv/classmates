import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  onAuthStateChanged,
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

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        // need set redirect to login
      })
      .catch((err) => {
        // needs to set an error state
        console.warn('Problem with sign up: ', err.message);
      })
  }

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      // need to set redirect to /[username]/dashboard
      // need to set success state
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
  // const logout = async () => {
    // setUser(null);
    // await signOut(auth);
  // }

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
        user, loading, error, signup, login, logout,
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