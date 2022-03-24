import Link from 'next/link';
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import { Tooltip, IconButton, Typography } from '@mui/material';
import { Avatar, Menu, MenuItem } from '@mui/material';

import styles from '../../../utils/styles/NavLayoutStyles/SideBar.module.css';
import {defaultProfilePic} from '../../../utils/constants';
import { useAuthContext } from '../../../utils/context/AuthProvider';

import { getUserInfo } from '../../../utils/api/apiCalls.js'

const settings = ['Profile', 'Logout'];

const ProfileMenu = ({ userId }) => {
  const { logout } = useAuthContext();
  const [AnchorUser, setAnchorUser] = useState(null);
  const [currentUserProfileInfo, setCurrentUserProfileInfo] = useState({
    photo: ''
  })

  const handleOpenUserMenu = (event) => {
    setAnchorUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorUser(null);
  };

  useEffect(() => {
    getUserInfo(userId)
      .then(res => {
      setCurrentUserProfileInfo({photo: res.photo});
      });
  }, [])

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar
            className={styles.profileAvatar}
            alt="User Avatar"
            src={currentUserProfileInfo.photo}
            sx={{ width: 50, height: 50 }}
          />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={AnchorUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(AnchorUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem>
          <Typography textAlign="center">
            <Link href={`/${userId}/my-profile`}><a>Profile</a></Link>
          </Typography>
        </MenuItem>
        <MenuItem onClick={logout}>
          <Typography textAlign="center">Logout</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};
export default ProfileMenu;