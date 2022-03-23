import { useState } from 'react';

import { Button, Menu } from '@mui/material';

import styles from '../../../utils/styles/NavLayoutStyles/SideBar.module.css';
import topRankings from '../../../utils/constants/exData';
import MainButton from '../../basecomponents/MainButton.js'
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
      <MainButton value="Leaderboard" onClick={handleClick} />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {topRankings.map((mentor, index) => (
          <MentorItem key={index} mentor={mentor} placement={index} />
        ))}
      </Menu>
    </div>
  );
}

