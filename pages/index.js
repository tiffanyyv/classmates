// Landing Page
import Head from 'next/head'
import styles from '../utils/styles/NavLayoutStyles/HomePage.module.css';

export default function LandingPage() {
  return (
    <div className={styles.homePage}>
      <div className={styles.titleBox}>
        <h1 className={styles.siteTitle}>ClassMates</h1>
      </div>
      <div className={styles.buttonBox}>
        <button className={styles.loginButton}>Login</button>
        <button className={styles.signupButton}>Sign Up</button>
      </div>
      <div className={styles.motto}>
        <h1>THE LATEST IN ONLINE CLASS MANAGEMENT</h1>
      </div>
      <div className={styles.reporter}>
        <h7>"It's so simple to use and the style is AMAZING!!!" Q. Maki Hack Reactor</h7>
      </div>
    </div>
  )
}
