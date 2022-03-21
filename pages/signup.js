import { auth } from '../utils/api/firebase.config'

import { useAuthContext } from '../utils/context/AuthProvider';
import React, { useState } from 'react';
import { FormControl } from '@mui/material';
import { Input } from '@mui/material';
import { Button } from '@mui/material';
import { Card, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import useStyles from '../utils/styles/signup.module'
import { useRouter } from 'next/router';


export default function Signup() {
  const classes = useStyles();
  const router = useRouter();

  const { user, loading, error, signup, signInWithGoogle, signInWithFacebook } = useAuthContext();
  const [signupInfo, setSignupInfo] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleSignUpFormInput = (text, field) => {
    setSignupInfo({
      ...signupInfo,
      [field]: text
    })
  }
  const handleSubmitSignUpInput = (e) => {
    e.preventDefault();
    signup(signupInfo.email, signupInfo.password, signupInfo.username)
  }
  if (user !== null) {
    router.push('/app')
    return null;
  }
  return (
    <div className={classes.root}>
      <Grid container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: '100vh' }}
      >
        <Card className={classes.card}>
          {console.log(signupInfo)}
          <form onSubmit={(e) => handleSubmitSignUpInput(e)} sx={{ my: 3 }}>
            <Input sx={{ my: 2 }} disableUnderline='true' onChange={(e) => handleSignUpFormInput(e.target.value, 'username')} placeholder="Username" className={classes.userInput}></Input>
            <Input sx={{ my: 2 }} disableUnderline='true' onChange={(e) => handleSignUpFormInput(e.target.value, 'email')} placeholder="Email" className={classes.userInput}></Input>
            <Input sx={{ my: 2 }} disableUnderline='true' onChange={(e) => handleSignUpFormInput(e.target.value, 'password')} placeholder="Password" className={classes.userInput}></Input>
            <Button sx={{ my: 2 }} type='submit' className={classes.loginButton}>Create Account</Button>
          </form>
          <div className={{ flexDirection: 'column' }}>
            <Button sx={{ my: 2 }} onClick={signInWithGoogle} className={classes.googleButton} startIcon={<GoogleIcon />}>Continue with Google</Button>
            <Button onClick={signInWithFacebook} className={classes.facebookButton} startIcon={<FacebookIcon />}>Continue with Facebook</Button>
          </div>
          <p><a href="/">Go Home</a></p>
        </Card>
      </Grid>
    </div>
  )
}

