import Head from 'next/head'
import Link from 'next/link'

import { AppBar, Box, Toolbar, Typography, Button } from '@mui/material';

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
        <h7>"THIS is official documentation" - Q. Maki CTO GeeksforGeeks</h7>
        <h7>"Good sh** guys" - E. Zhang CTO Apple</h7>
        <h7>"The Harvard of online Mentorship" - K. Lopez CTO Google</h7>
      </div>
    </div>
  )
}