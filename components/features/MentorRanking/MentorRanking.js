import { useState } from 'react';

import {Button, Menu} from '@mui/material';

import styles from '../../../utils/styles/NavLayoutStyles/SideBar.module.css';
import topRankings from '../../../utils/constants/exData';
import MentorItem from './MentorItem.js';

export default function Leaderboard() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={styles.leaderboardButton}>
      <Button
        className={styles.leaderboardButtonText}
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Leaderboard
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {topRankings.map((mentor, index) => (
          <MentorItem key={index} mentor={mentor} placement={index}/>
        ))}
      </Menu>
    </div>
  );
}