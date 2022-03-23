import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { FormControl } from '@mui/material';
import { Input } from '@mui/material';
import { Button } from '@mui/material';
import { Card, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import CircularProgress from '@mui/material/CircularProgress';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';

import { useAuthContext } from '../utils/context/AuthProvider';
import { auth } from '../utils/api/firebase.config'
import useStyles from '../utils/styles/signup.module'

export default function Login() {
  const classes = useStyles();
  const router = useRouter();

  const {
     user, login,
     loading,
     error,
     signInWithGoogle, signInWithFacebook
  } = useAuthContext();

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
    setIsLoading(true);
    console.log(loginInfo.email, loginInfo.password)
    login(loginInfo.email, loginInfo.password)
      // .then(() => setIsLoading(false));
  }
  if (user) {
    router.push('/app/my-courses');
    return null;
  }

  // if (isLoading) {
  //   return (
  //     <CircularProgress />
  //   )
  // }

  // if (error) {
  //   return (
  //     <Grid container
  //         spacing={0}
  //         direction="column"
  //         alignItems="center"
  //         justifyContent="center"
  //         alignItems="center"
  //         style={{ minHeight: '100vh' }}
  //       >
  //         <Card className={classes.card}>
  //           <p>There was a problem logging you in. <Link href="/login"><a>Return to Log in</a></Link></p>
  //         </Card>
  //     </Grid>
  //   )
  // }

  return(
    <div className={classes.root}>
      <Grid container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}
      >
        <Card className={classes.card}>
          <form onSubmit={(e) => handleStandardLogin(e)} sx={{my:3}}>
            <Input sx={{my:2}} disableUnderline={true} onChange={(e) => handleLoginFormInput(e.target.value, 'email')} placeholder="Email" className={classes.userInput}></Input>
            <Input sx={{my:2}} disableUnderline={true} onChange={(e) => handleLoginFormInput(e.target.value, 'password')} placeholder="Password" className={classes.userInput} type="password"></Input>
            <Button sx={{my:2}} type='submit' className={classes.loginButton}>Login</Button>
          </form>
          <div className={{ flexDirection: 'column' }}>
            <Button sx={{my:2}} onClick={signInWithGoogle} className={classes.googleButton} startIcon={<GoogleIcon />}>Continue with Google</Button>
            <Button onClick={signInWithFacebook} className={classes.facebookButton} startIcon={<FacebookIcon />}>Continue with Facebook</Button>
          </div>
          <Link href="/"><a>Go Home</a></Link>
        </Card>
      </Grid>
    </div>
  )
}


