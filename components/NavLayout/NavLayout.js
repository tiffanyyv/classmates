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

  // console.log(router.pathname);

 // useEffect with user in dependency array
  // add conditional to only run if user ID is defined
  // will run getUserInfo when user state changes ie after login
  // update a userInfo state with api call results
  // useEffect( () => {
  //   if (user) {
  //     getUserInfo(user?.uid)
  //       .then(response => {
  //         console.log(response, "Response-----")
  //         //setUserInfo(response)
  //       })
  //   }
  //    if (!userInfo?.account_type) {
  //      logoutError()
  //   }
  // },[user])
  // add condition if user is signed in AND userInfo.account_type no defined
  // logout and reroute to sign up page with error message

  // pass userInfo props down to sidebar instead to save an api call

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