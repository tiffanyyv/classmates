import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { FormControl } from '@mui/material';
import { Input } from '@mui/material';
import { Button } from '@mui/material';
import { Card, Grid, Select, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import useStyles from '../utils/styles/signup.module'
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

import { auth } from '../utils/api/firebase.config'
import { useAuthContext } from '../utils/context/AuthProvider';

export default function Signup() {
  const classes = useStyles();
  const router = useRouter();
  const [accountType, setAccountType] = useState('')
  const [filledFormFlag, setFilledFormFlag] = useState('true')
  const { user, loading, error, signup, signInWithGoogle, signInWithFacebook } = useAuthContext();
  const [signupInfo, setSignupInfo] = useState({
    username: '',
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    account_type: '',
    location: '',
  });

  useEffect(() => {
    if (accountType.length > 0 ) {
      setFilledFormFlag(false)
    }
  },[accountType])

  const handleSignUpFormInput = (text, field) => {
    setSignupInfo({
      ...signupInfo,
      [field]: text
    })
  }

  const handleSubmitSignUpInput = (e) => {
    e.preventDefault();
    signup(signupInfo)
  }

  if (user) {
    router.push('/app/my-courses')
    return null;
  }

  return (
    <div className={classes.root}>
      <Grid container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}
      >
        <Card className={classes.card}>
        <Typography sx={{fontSize: 26, mb: 1}}>Signup</Typography>
          <form onSubmit={(e) => handleSubmitSignUpInput(e)} sx={{ my: 3 }}>
            <InputLabel id="accountDropDown">Account Type</InputLabel>
            <Select
              labelId='accountDropDown'
              id="accountDropDown"
              label="Account Type"
              value={accountType}
              className={classes.userInput}
              sx={{ height: 30 }}
              onChange={(e) => { handleSignUpFormInput(e.target.value, 'account_type'), setAccountType(e.target.value) }}
            >
              <MenuItem value={'Mentor'}>Mentor</MenuItem>
              <MenuItem value={'Mentee'}>Mentee</MenuItem>
            </Select>
            <Input sx={{ my: .5 }} disableUnderline={true} onChange={(e) => handleSignUpFormInput(e.target.value, 'username')} placeholder="Username" className={classes.userInput}></Input>
            <div className={{
              display: 'flex',
              flexDirection: 'row'
            }}>
              <Input sx={{ my: .3 }} disableUnderline={true} onChange={(e) => handleSignUpFormInput(e.target.value, 'firstName')} placeholder="First Name" className={classes.userInput}></Input>
              <Input sx={{ my: .3 }} disableUnderline={true} onChange={(e) => handleSignUpFormInput(e.target.value, 'location')} placeholder="Location" className={classes.userInput}></Input>
            </div>
            <Input sx={{ my: .3 }} disableUnderline={true} onChange={(e) => handleSignUpFormInput(e.target.value, 'lastname')} placeholder="Last Name" className={classes.userInput}></Input>
            <Input sx={{ my: .3 }} disableUnderline={true} onChange={(e) => handleSignUpFormInput(e.target.value, 'email')} placeholder="Email" className={classes.userInput}></Input>
            <Input sx={{ my: .3 }} disableUnderline={true} onChange={(e) => handleSignUpFormInput(e.target.value, 'password')} placeholder="Password" className={classes.userInput} type="password"></Input>
            <Button sx={{ my: 2 }} type='submit' className={classes.loginButton}>Create Account</Button>
          </form>
          <div className={{ flexDirection: 'column' }}>
            <Button sx={{ my: 2 }} disabled={filledFormFlag} onClick={(e) => signInWithGoogle(signupInfo)} className={classes.googleButton} startIcon={<GoogleIcon />}>Continue with Google</Button>
            <Button onClick={(e) => signInWithFacebook(signupInfo) } disabled={filledFormFlag} className={classes.facebookButton} startIcon={<FacebookIcon />}>Continue with Facebook</Button>
          </div>
          <Link href="/"><a>Go Home</a></Link>
        </Card>
      </Grid>
    </div>
  )

}

