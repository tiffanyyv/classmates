import SideBar from './SideBar';
import styles from '../../utils/styles/NavLayoutStyles/NavLayout.module.css';

import { useAuthContext } from '../../utils/context/AuthProvider';

export default function NavLayout({ children }) {
  const { user, loading, error } = useAuthContext();

  console.log(user);

  if (!user) {
    return (
      <>
        {children}
      </>
    )
  }

  return (
    <div className={styles.loggedInView}>
      <SideBar>

      </SideBar>
      <div>
        <section>{children}</section>
      </div>
    </div>
  )
}