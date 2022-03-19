import styles from './NavLayoutStyles/SideBar.module.css';

export default function SideBar({ children, ...props }) {
  return (
    <nav className={styles.nav}>
      <h3>My Classes</h3>
      <h3>Calendar</h3>
      <h3>Notifications</h3>
      <h3>Class Catalog</h3>
    </nav>
  )
}
