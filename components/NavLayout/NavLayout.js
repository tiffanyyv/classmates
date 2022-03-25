import { useRouter } from 'next/router';
import {useEffect, useState} from 'react'
import SideBar from './SideBar';
import styles from '../../utils/styles/NavLayoutStyles/NavLayout.module.css';
import {useAuthContext} from '../../utils/context/AuthProvider'
import {getUserInfo} from '../../utils/api/apiCalls'

export default function NavLayout({ children }) {
  const router = useRouter();
  const { user, loading, error } = useAuthContext();
  const [userInfo, setUserInfo] = useState(null);

  if (!user) {
    return (
      <>
        {children}
      </>
    )
  }

  if (user && router.pathname === '/' || user && router.pathname === '/login' || user && router.pathname === '/signup') {
    return (
      <>
        {children}
      </>
    )
  }

  return (
    <div className={styles.loggedInView}>
      <SideBar userId={user.uid}>

      </SideBar>
      <div>
        <section>{children}</section>
      </div>
    </div>
  )
}