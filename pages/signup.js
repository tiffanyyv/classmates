import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { FormControl } from '@mui/material';
import { Input } from '@mui/material';
import { Button } from '@mui/material';
import { Card, Grid, Select, Typography, Modal, TextField, Stack } from '@mui/material';
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
  const [googleOpen, setGoogleOpen] = useState(false);
  const [facebookOpen, setFacebookOpen] = useState(false);
  const handleGoogleOpen = () => setGoogleOpen(true);
  const handleFacebookOpen = () => setFacebookOpen(true);
  const handleGoogleClose = () => setGoogleOpen(false);
  const handleFacebookClose = () => setFacebookOpen(false);
  const classes = useStyles();
  const router = useRouter();
  const [accountType, setAccountType] = useState('')
  const [filledFormFlag, setFilledFormFlag] = useState('true')
  const [passwordLengthColor, setPasswordLengthColor] = useState('red')
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
    if (accountType.length > 0 && signupInfo.username.length > 0 && signupInfo.firstname.length > 0 && signupInfo.lastname.length > 0 && signupInfo.email.length > 0 && signupInfo.password.length > 0 && signupInfo.location.length > 0) {
      setFilledFormFlag(false)
    }
  }, [accountType, signupInfo.username, signupInfo.firstname, signupInfo.lastname, signupInfo.email, signupInfo.password, signupInfo.location])

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

  const handlePasswordLength = () => {
    console.log(signupInfo.password.length)
    if (signupInfo.password.length <= 4.9) {
      setPasswordLengthColor('red')
    } else {
      setPasswordLengthColor('green')
    }
  }

  // Change reroute to dynamic route
  if (user) {
    router.push(`/${user.uid}/my-courses`)
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
          <Typography sx={{ fontSize: 26, mb: 1 }}>Signup</Typography>
          <form onSubmit={(e) => handleSubmitSignUpInput(e)} sx={{ my: 3 }}>
            <Button sx={{ my: 2 }} onClick={handleGoogleOpen} className={classes.googleButton} startIcon={<GoogleIcon />}>Continue with Google</Button>
            <Button sx={{ my: 2 }} onClick={handleFacebookOpen} className={classes.facebookButton} startIcon={<FacebookIcon />}>Continue with Facebook</Button>

            <InputLabel id="accountDropDown" >Account Type</InputLabel>
            <Select
              labelId='accountDropDown'
              id="accountDropDown"
              label="Account Type"
              value={accountType}
              className={classes.userInput}
              sx={{height: 30 }}
              onChange={(e) => { handleSignUpFormInput(e.target.value, 'account_type'), setAccountType(e.target.value) }}
            >
              <MenuItem value={'Mentor'}>Mentor</MenuItem>
              <MenuItem value={'Mentee'}>Mentee</MenuItem>
            </Select>
            <Stack direction="row" spacing={1} sx={{my: 1}}>
            <TextField size='small' placeholder='First Name' sx={{width:'50%', backgroundColor: '#F5F5F5'}} onChange={(e) => handleSignUpFormInput(e.target.value, 'firstname')}></TextField>
            <TextField size='small' placeholder='Last Name' sx={{width:'50%', backgroundColor: '#F5F5F5'}} onChange={(e) => handleSignUpFormInput(e.target.value, 'lastname')}></TextField>
            </Stack>
            <TextField size='small' placeholder='Username' sx={{width:'100%', backgroundColor: '#F5F5F5'}}  onChange={(e) => handleSignUpFormInput(e.target.value, 'username')}></TextField>
            <TextField size='small' placeholder='Email' sx={{width:'100%', backgroundColor: '#F5F5F5', my: 1}} onChange={(e) => handleSignUpFormInput(e.target.value, 'email')}></TextField>
            <TextField size='small' placeholder='Location'  sx={{width:'100%', backgroundColor: '#F5F5F5', mb:1}} onChange={(e) => handleSignUpFormInput(e.target.value, 'location')}></TextField>
            <TextField size='small' type='password' placeholder='Password' sx={{width:'100%', backgroundColor: '#F5F5F5', mb:1}} onChange={(e) => { handleSignUpFormInput(e.target.value, 'password'), handlePasswordLength() }}></TextField>
            {/* <Input sx={{ my: .5 }} required={true} disableUnderline={true} onChange={(e) => handleSignUpFormInput(e.target.value, 'username')} placeholder="Username" className={classes.userInput}></Input>

            <Input sx={{ my: .3 }} required={true} disableUnderline={true} onChange={(e) => handleSignUpFormInput(e.target.value, 'location')} placeholder="Location" className={classes.userInput}></Input>

            <Input sx={{ my: .3 }} required={true} disableUnderline={true} onChange={(e) => handleSignUpFormInput(e.target.value, 'firstname')} placeholder="First Name" className={classes.userInput}></Input>
            <Input sx={{ my: .3 }} required={true} disableUnderline={true} onChange={(e) => handleSignUpFormInput(e.target.value, 'lastname')} placeholder="Last Name" className={classes.userInput}></Input>
            <Input sx={{ my: .3 }} required={true} disableUnderline={true} onChange={(e) => handleSignUpFormInput(e.target.value, 'email')} placeholder="Email" className={classes.userInput}></Input> */}
            {/* <Input sx={{ my: .3 }} required={true} disableUnderline={true} onChange={(e) => { handleSignUpFormInput(e.target.value, 'password'), handlePasswordLength() }} placeholder="Password" className={classes.userInput} type="password"></Input> */}
            <Typography sx={{ fontWight: 'light', fontSize: 10, fontStyle: 'italic', color: passwordLengthColor }}  >*minimum password length of 6 characters</Typography>
            <Button sx={{ my: 2 }} type='submit' className={classes.loginButton} disabled={filledFormFlag}>Create Account</Button>
            <Modal open={googleOpen} onClose={handleGoogleClose}>
              <FormControl sx={{
                position: 'absolute',
                alignItems: 'center',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                borderRadius: 5,
                boxShadow: 24,
                p: 4,
              }}>
                <Typography sx={{fontSize: 28}}>Google Signup</Typography>
                <InputLabel id="accountDropDown"></InputLabel>
                <Select
                  labelId='accountDropDown'
                  id="accountDropDown"
                  value={accountType}
                  sx={{ height: 30, margin: 2, width: 336}}
                  onChange={(e) => { handleSignUpFormInput(e.target.value, 'account_type'), setAccountType(e.target.value) }}
                >
                  <MenuItem value={'Mentor'}>Mentor</MenuItem>
                  <MenuItem value={'Mentee'}>Mentee</MenuItem>
                </Select>
                <Stack direction="row" spacing={1}>
                  <TextField size='small' variant="filled" placeholder='First name' sx={{
                    my: .3,
                    borderRadius: 5,
                    width: '50%',
                  }} required onChange={(e) => handleSignUpFormInput(e.target.value, 'firstname')}></TextField>
                  <TextField size='small' variant="filled" placeholder='Last name' sx={{
                    my: .3,
                    borderRadius: 5,
                    width: '50%',
                  }} required onChange={(e) => handleSignUpFormInput(e.target.value, 'lastname')}></TextField>
                </Stack>
                <TextField size='small' variant="filled" placeholder='Location' sx={{ my: .3, width: 337}}  required onChange={(e) => handleSignUpFormInput(e.target.value, 'location')}></TextField>
                <Button sx={{ my: 2,  }} onClick={(e) => signInWithGoogle(signupInfo)} className={classes.moduleGoogleButton} startIcon={<GoogleIcon />}>Sign in with Google</Button>
              </FormControl>
            </Modal>
            <Modal open={facebookOpen} onClose={handleFacebookClose}>
              <FormControl sx={{
                position: 'absolute',
                alignItems: 'center',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                borderRadius: 5,
                boxShadow: 24,
                p: 4,
              }}>
                <Typography sx={{fontSize: 28}}>Facebook Signup</Typography>
                <InputLabel id="accountDropDown"></InputLabel>
                <Select
                  labelId='accountDropDown'
                  id="accountDropDown"
                  value={accountType}
                  sx={{ height: 30, margin: 2, width: 336}}
                  onChange={(e) => { handleSignUpFormInput(e.target.value, 'account_type'), setAccountType(e.target.value) }}
                >
                  <MenuItem value={'Mentor'}>Mentor</MenuItem>
                  <MenuItem value={'Mentee'}>Mentee</MenuItem>
                </Select>
                <Stack direction="row" spacing={1}>
                  <TextField size='small' variant="filled" placeholder='First name' sx={{
                    my: .3,
                    borderRadius: 5,
                    width: '50%',
                  }} required onChange={(e) => handleSignUpFormInput(e.target.value, 'firstname')}></TextField>
                  <TextField size='small' variant="filled" placeholder='Last name' sx={{
                    my: .3,
                    borderRadius: 5,
                    width: '50%',
                  }} required onChange={(e) => handleSignUpFormInput(e.target.value, 'lastname')}></TextField>
                </Stack>
                <TextField size='small' variant="filled" placeholder='Location' sx={{ my: .3, width: 337}}  required onChange={(e) => handleSignUpFormInput(e.target.value, 'location')}></TextField>
                <Button onClick={(e) => signInWithFacebook(signupInfo)} className={classes.moduleFacebookButton} startIcon={<FacebookIcon />}>Continue with Facebook</Button>
              </FormControl>
            </Modal>
          </form>
          <div className={{ flexDirection: 'column' }}>
          </div>
          <Link href="/"><a>Go Home</a></Link>
        </Card>
      </Grid>
    </div>
  )

}
{/* <Button sx={{ my: 2 }} disabled={filledFormFlag} onClick={(e) => signInWithGoogle(signupInfo)} className={classes.googleButton} startIcon={<GoogleIcon />}>Continue with Google</Button>
            <Button onClick={(e) => signInWithFacebook(signupInfo) } disabled={filledFormFlag} className={classes.facebookButton} startIcon={<FacebookIcon />}>Continue with Facebook</Button> */}
