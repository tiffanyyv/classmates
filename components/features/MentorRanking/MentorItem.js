import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';

import styles from '../../../utils/styles/NavLayoutStyles/SideBar.module.css';

export default function MentorItem(props) {

  if (props.placement === 0) {
    var icon = <p>🐐</p>
  } else if (props.placement > 0 && props.placement <= 4) {
    var icon = <p>🥈</p>
  } else if (props.placement > 4 && props.placement <= 9) {
    var icon = <p>🥉</p>
  }

  return (
    <div>
      <MenuItem className={styles.mentorListItem}>
        <div className={styles.mentorPlacement}>
          {icon}
        </div>
        <Divider orientation="vertical" flexItem />
        <div className={styles.mentorName}>
          {props.mentor.name.first_name}
          {' '}
          {props.mentor.name.last_name}
        </div>
        <Divider orientation="vertical" flexItem />
        <div className={styles.mentorEndorsements}>
          {props.mentor.endorsements}
        </div>
      </MenuItem>
    </div>
  );
}