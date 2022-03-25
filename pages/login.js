import Link from 'next/link';
import Head from 'next/head'
import { Input } from '@mui/material';
import { Button } from '@mui/material';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { makeStyles } from '@mui/styles';
import { FormControl } from '@mui/material';
import { auth } from '../utils/api/firebase.config'
import GoogleIcon from '@mui/icons-material/Google';
import useStyles from '../utils/styles/signup.module'
import FacebookIcon from '@mui/icons-material/Facebook';
import CircularProgress from '@mui/material/CircularProgress';
import { useAuthContext } from '../utils/context/AuthProvider';
import { Card, Grid, ToggleButtonGroup, ToggleButton, Typography } from '@mui/material';


export default function Login() {
  const classes = useStyles();
  const router = useRouter();
  const { user, login, signInWithGoogle, signInWithFacebook } = useAuthContext();
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  })

  const handleLoginFormInput = (text, field) => {
    setLoginInfo({
      ...loginInfo,
      [field]: text
    })
  }

  const handleStandardLogin = (e) => {
    e.preventDefault();
    login(loginInfo.email, loginInfo.password)
  }

  if (user) {
    router.push(`${user.uid}/my-courses`);
    return null;
  }

  return (
    <div className={classes.root}>
      <Head>
        <title>Login Page</title>
      </Head>
      <Grid container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}
      >
        <Card className={classes.card}>
          <Typography sx={{fontSize: 26, mb: 1}}>Login</Typography>
          <form onSubmit={(e) => handleStandardLogin(e)} sx={{ my: 3 }}>
            <Input sx={{ my: 2 }} disableUnderline={true} onChange={(e) => handleLoginFormInput(e.target.value, 'email')} placeholder="Email" className={classes.userInput}></Input>
            <Input sx={{ my: 2 }} disableUnderline={true} onChange={(e) => handleLoginFormInput(e.target.value, 'password')} placeholder="Password" className={classes.userInput} type="password"></Input>
            <Button sx={{ my: 2 }} type='submit' className={classes.loginButton}>Login</Button>
          </form>
          <div className={{ flexDirection: 'column' }}>
            <Button sx={{ my: 2 }} onClick={signInWithGoogle} className={classes.googleButton} startIcon={<GoogleIcon />}>Continue with Google</Button>
            <Button onClick={signInWithFacebook} className={classes.facebookButton} startIcon={<FacebookIcon />}>Continue with Facebook</Button>
          </div>
          <Link href="/"><a>Go Home</a></Link>
        </Card>
      </Grid>
    </div>
  )
}
