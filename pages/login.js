import React, {useState} from 'react';
import { FormControl } from '@mui/material';
import { Input } from '@mui/material';
import { Button } from '@mui/material';
import { Card } from '@mui/material';
import { makeStyles } from '@mui/styles';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';

import { useAuthContext } from '../utils/context/AuthProvider';

const useStyles = makeStyles({
    card: {
      background: '#B0B4D4',
      flexDirection: 'column',
      border: 0,
      borderRadius: 3,
      boxShadow: 20,
      color: 'white',
      height: '100%',
      padding: '0 30px',
      maxWidth:'60%',
      alignItems: 'center',
      justifyContent: 'center'
    },
    googleButton: {
      position:'relative',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor:'white',
      variant: 'contained',
      display: 'flex',
      width:250
    },
    facebookButton: {
      position: 'relative',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor:'#4267B2',
      color:'white',
      variant: 'contained',
      display: 'flex',
      width: 250
    },
    container: {
      flexDirection:'row',
      justifyContent: 'center',
      alignItems:'center'
    }
  });


export default function Login() {
    const classes = useStyles();
  const { user, login, signInWithGoogle, signInWithFacebook } = useAuthContext(); // check if user context import is necessary
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: ''
  })

  const handleLoginFormInput = (e, field) => {
    setLoginInfo({
      ...loginInfo,
      [field]: e.target.value
    })
  }

  const handleStandardLogin = (e) => {
    e.preventDefault();
    login(loginInfo.email, loginInfo.password)
  }

    return (
        <div>
          <Card className={classes.card}>
          <FormControl onSubmit={(e) => handleStandardLogin(e)}>

            <Input onChange={(e) => handleLoginFormInput(e, 'email')} placeholder="Email"></Input>
            <Input onChange={(e) => handleLoginFormInput(e, 'password')} placeholder="Password"></Input>
            <Button type="submit">Login</Button>
          </FormControl>
                <div className={{flexDirection:'column'}}>
               <Button onClick={signInWithGoogle} className={classes.googleButton} startIcon={<GoogleIcon />}>Continue with Google</Button>
               <Button onClick={signInWithFacebook} className={classes.facebookButton} startIcon={<FacebookIcon/>}>Continue with Facebook</Button>
               </div>
              <p><a href="/">Go Home</a></p>
          </Card>
          </div>

    )
}


