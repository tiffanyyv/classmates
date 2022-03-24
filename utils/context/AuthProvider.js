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
      .catch((err) => console.warn('Problem with authentication creation: ', err.message))
      .then((response) => {
        body['uid'] = response.user.uid
        var postBody = {
          account_type: body.account_type,
          uid: body.uid,
          firstName: body.firstname,
          lastName: body.lastname,
          username: body.username,
          location: body.location
        }
        axios.post(`http://localhost:3000/api/users`, postBody)
      })
      .catch((err) => console.warn('Problem with sign up: ', err.message))
      .then(response => router.push(`/${response.user.uid}/my-courses`))
  }

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
      .then((response) => {
        router.push(`/${response.user.uid}/my-courses`);
      })
      .catch((err) => {
        console.warn('Problem with log in: ', err.message);
      })
  }

  const logout = async () => {
    router.push('/');
    await signOut(auth);
  }

  // OAuth Google + FB
  const signInWithGoogle = (accountInfoObj) => {

    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(async response => {
        accountInfoObj['uid'] = response.user.uid
        var postBody = {
          account_type: accountInfoObj.account_type,
          uid: accountInfoObj.uid,
          firstName: accountInfoObj.firstname,
          lastName: accountInfoObj.lastname,
          username: response.user.displayName,
          location: accountInfoObj.location
        }
        axios.post(`http://localhost:3000/api/users`, postBody)
          .then(response => {
            console.log(response)
          })
          .catch(err => {
            console.log(err.message)
          })

      })
      .catch((err) => console.warn('Problem with sign up: ', err.message))
      .then(response => router.push(`/${response.user.uid}/my-courses`))
  }
  const signInWithFacebook = (accountInfoObj) => {
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider)
      .then(response => {
        router.push(`/${response.user.uid}/my-courses`);
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
