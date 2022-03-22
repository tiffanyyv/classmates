// Landing Page
import Head from 'next/head'
import Link from 'next/link'

import {AppBar, Box, Toolbar, Typography, Button} from '@mui/material';

import styles from '../utils/styles/NavLayoutStyles/HomePage.module.css';


export default function LandingPage() {
  return (
    <div className={styles.homePage}>
    <Box sx={{ flexGrow: 1 }}>
    <AppBar className={styles.homeAppBar} position="static">
      <Toolbar>
        <Typography className={styles.siteTitle} variant="h4" component="div" sx={{ flexGrow: 1 }}>
          ClassMates
        </Typography>
        <Link href="/login" passHref>
          <Button color="inherit" className={styles.loginButton}>Login</Button>
        </Link>
        <Link href="/signup" passHref>
          <Button color="inherit" className={styles.signupButton}>Sign Up</Button>
        </Link>
      </Toolbar>
    </AppBar>
  </Box>
      <div className={styles.motto}>
        <h1>THE LATEST IN ONLINE CLASS MANAGEMENT</h1>
      </div>
      <div className={styles.reporter}>
        {/* Odd characters in here instead of quotions b/c ESlint throws errors otherwise */}
        <h7>&quot;THIS is official documentation.&quot;  - Q. Maki, GeeksforGeeks</h7>
        <br></br>
        <h7>&quot;The Harvard of online education.&quot;  - E. Zhang, Apple</h7>
        <br></br>
        <h7>&quot;I would use all my bitcoin to acquire them.&quot;  - K. Lopez, Google</h7>
      </div>
    </div>
  )
}
