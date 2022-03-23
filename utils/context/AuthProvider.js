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
  //In case we need an object containing the information
  const [loginDataObj, setLoginDataObject] = useState({})

  const signup = (body) => {
    createUserWithEmailAndPassword(auth, body.email, body.password)
      .then(async (response) => {
        body['uid'] = response.user.uid
        var postBody = {
          account_type: body.account_type,
          uid: body.uid,
          firstName: body.firstName,
          lastName: body.lastname,
          username: body.username,
          location: body.location
        }
        if (body.account_type === 'Mentor') {
          axios.post(`http://localhost:3000/api/users`, postBody)
            .then(response => {
              console.log(response)
            })
            .catch(err => {
              console.warn(err, 'Error on Signup Post request ');
            })
        }
        router.push('/app/my-courses')
      })
      .catch((err) => {
        console.warn('Problem with sign up: ', err.message);
      })
  }

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
      .then(async (response) => {
        console.log(response.user.uid, "USER")
        axios.get(`http://localhost:3000/api/users/${response.user.uid}`)
          .then(response => {
            //setting state in case we need extra information
            //if the auth doesnt work we can pass in this way
            setLoginDataObject(response)
          })
          .catch(error => {
            console.warn(err)
          })
        router.push('/app/my-courses');
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
        router.push('/app/my-courses');
      })
      .catch(error => {
        console.warn(error)
      })
  }
  const signInWithFacebook = (accountInfoObj) => {
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider)
      .then(async response => {
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