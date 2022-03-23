// Landing Page
import Head from 'next/head'
import Link from 'next/link'

import {AppBar, Box, Toolbar, Typography, Button} from '@mui/material';
import { useAuthContext } from '../utils/context/AuthProvider';

import styles from '../utils/styles/NavLayoutStyles/HomePage.module.css';

export default function LandingPage() {
  const { logout} = useAuthContext();
  return (
    <div className={styles.homePage}>
    <Box sx={{ flexGrow: 1 }}>
    <AppBar className={styles.homeAppBar} position="static">
      <Toolbar>
        <Typography className={styles.siteTitle} variant="h4" component="div" sx={{ flexGrow: 1 }}>
          ClassMates
        </Typography>
        <Link href="/login">
          <Button color="inherit" className={styles.loginButton}>Login</Button>
        </Link>
        <Link href="/signup">
          <Button color="inherit" className={styles.signupButton}>Sign Up</Button>
        </Link>
      </Toolbar>
    </AppBar>
  </Box>
      <div className={styles.motto}>
        <h1>THE LATEST IN ONLINE CLASS MANAGEMENT</h1>
      </div>
      <div className={styles.reporter}>
        <h7>"It's so simple to use and the style is AMAZING!!!"  - Q. Maki Hack Reactor</h7>
      </div>
    </div>
  )
}
