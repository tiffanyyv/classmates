import Link from 'next/link';
import { useState } from 'react';

import Box from '@mui/material/Box';
import { Tooltip, IconButton, Typography } from '@mui/material';
import { Avatar, Menu, MenuItem } from '@mui/material';

import styles from '../../../utils/styles/NavLayoutStyles/SideBar.module.css';
import defaultProfilePic from '../../../utils/constants';
import { useAuthContext } from '../../../utils/context/AuthProvider'


const settings = ['Profile', 'Logout'];

const ProfileMenu = () => {
  const [AnchorUser, setAnchorUser] = useState(null);

  const { logout } = useAuthContext();

  const handleOpenUserMenu = (event) => {
    setAnchorUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorUser(null);
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar
            className={styles.profileAvatar}
            alt="Remy Sharp"
            src={defaultProfilePic}
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
            <Link href="/app/my-profile">Profile</Link>
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