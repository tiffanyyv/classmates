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
import { useRouter } from 'next/router';
import useStyles from '../utils/styles/signup.module'


export default function Login() {
  const classes = useStyles();
  const router = useRouter();

  const { user, login, signInWithGoogle, signInWithFacebook } = useAuthContext(); // check if user context import is necessary
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: ''
  })

  const handleLoginFormInput = (text, field) => {
    setLoginInfo({
      ...loginInfo,
      [field]: text
    })
  }

  const handleStandardLogin = (e) => {
    e.preventDefault();
    console.log(loginInfo.email, loginInfo.password)
    login(loginInfo.email, loginInfo.password)
  }
  if (user) {
    router.push('/app/my-courses');
    return null;
  }
  return(
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
          <form onSubmit={(e) => handleStandardLogin(e)} sx={{my:3}}>
            <Input sx={{my:2}} disableUnderline='true' onChange={(e) => handleLoginFormInput(e.target.value, 'email')} placeholder="Email" className={classes.userInput}></Input>
            <Input sx={{my:2}} disableUnderline='true' onChange={(e) => handleLoginFormInput(e.target.value, 'password')} placeholder="Password" className={classes.userInput} type="password"></Input>
            <Button sx={{my:2}} type='submit' className={classes.loginButton}>Login</Button>
          </form>
          <div className={{ flexDirection: 'column' }}>
            <Button sx={{my:2}} onClick={signInWithGoogle} className={classes.googleButton} startIcon={<GoogleIcon />}>Continue with Google</Button>
            <Button onClick={signInWithFacebook} className={classes.facebookButton} startIcon={<FacebookIcon />}>Continue with Facebook</Button>
          </div>
          <p><a href="/">Go Home</a></p>
        </Card>
      </Grid>
    </div>
  )
}


