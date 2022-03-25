import Head from 'next/head'
import Link from 'next/link'
import { AppBar, Box, Toolbar, Typography, Button, } from '@mui/material';

import styles from '../utils/styles/NavLayoutStyles/HomePage.module.css';

export default function LandingPage() {
  return (
    <div className={styles.homePage}>
      <Head>
        <title>ClassMates</title>
      </Head>
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

      <div className={styles.inlayPhoto}>
        <div className={styles.inlayText}>
          <h1>Learn from the best!</h1>
          <span>Take classes on any subject you choose, and learn an endless list of skills,</span>
          <h6 className={styles.inlayTextSapcer}>OR</h6>
          <h1>Share your skills!</h1>
          <span>Teach a class of your own, and collaborate with people from all over the GLOBE!</span>
        </div>
      </div>
      <div className={styles.homeFacts}>
        <div className={styles.homeFactsStudents}>
        <span>More than</span>
        <h1>6,000</h1>
        <span>students enrolled successfully!</span>
        </div>
        <div className={styles.homeFactsCountries}>
        <span>In over</span>
        <h1>23</h1>
        <span>countries!</span>
        </div>
        <div className={styles.homeFactsCourses}>
        <span>with</span>
        <h1>THOUSANDS</h1>
        <span>of classes to choose from!</span>
        </div>
      </div>
      <div className={styles.reporter}>
        <h1>A NOTE FROM OUR SUPPORTERS!</h1>
        <h7>&quot;THIS is official documentation&quot; - Q. Maki CTO GeeksforGeeks</h7>
        <h7>&quot;Good sh** guys&quot; - E. Zhang CTO Apple</h7>
        <h7>&quot;The Harvard of online Mentorship&quot; - K. Lopez CTO Google</h7>
      </div>
    </div>
  )
}



