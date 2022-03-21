import { useAuthContext } from '../../utils/context/AuthProvider'
import styles from '../../utils/styles/NavLayoutStyles/TopBar.module.css';

export default function TopBar(props) {
  // will need to pass props to profile icon and add proper linking
  const { logout } = useAuthContext();

  return (
    <div className={styles.topbar}>
      <h2>Classmates</h2>
      <p>profile icon</p>
      <button onClick={logout}>Log out</button>
    </div>
  )
}