import {auth} from '../components/authConfig/firebase.config'
import React, {useState} from 'react';
import { FormControl } from '@mui/material';
import { Input } from '@mui/material';
import { Button } from '@mui/material';
import { Card } from '@mui/material';
import { makeStyles } from '@mui/styles';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup
} from "firebase/auth";

const useStyles = makeStyles({
  card: {
    background: '#B0B4D4',
    border: 0,
    borderRadius: 3,
    boxShadow: 20,
    color: 'white',
    height: '100%',
    padding: '0 30px',
    maxWidth:'100%',
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

    return (
        <div >
            <div className={classes.container}>
              <Card className={classes.card}>
              <FormControl onSubmit={(e) => createUser(e,email, pass)}>
                <Input placeholder='Email' onChange={(e) => setEmail(e.target.value)}></Input>
                <Input placeholder='Password' onChange={(e) => setPass(e.target.value)}></Input>
                <Button type='submit'></Button>
              </FormControl>
              <div className={{flexDirection:'column'}}>
              <Button onClick={signInWithGoogle} className={classes.googleButton} startIcon={<GoogleIcon />}>Continue with Google</Button>
              <Button onClick={signInWithFacebook} className={classes.facebookButton} startIcon={<FacebookIcon/>}>Continue with Facebook</Button>
              </div>
                <p><a href="/">Go Home</a></p>
              </Card>
           </div>
        </div>
    )
}


