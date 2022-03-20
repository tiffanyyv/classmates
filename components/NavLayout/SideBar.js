import styles from '../../utils/styles/NavLayoutStyles/SideBar.module.css';
import Link from 'next/link';
import { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { Box, Container, Stack, Avatar } from '@mui/material';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Toolbar, List, CssBaseline, Typography, IconButton } from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
// Tristen cleaned up these imports as much as possible, can't import certain components through destructuring for some reason.


// change to make more responsive
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function SideBar({ children, ...props }) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // hard coded data, eventually change sampleUser to [username]
  const pageUrls = {
    0: "/sampleUser/my-classes",
    1: "/sampleUser/calendar",
    2: "/sampleUser/notifications",
    3: "/sampleUser/class-catalog"
  }

  // TODO: change "Current User" to [username]'s name
  // TODO: change avatar src to dynamically render user's profile picture
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} className={styles.topbar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={styles.siteTitle} variant="h5" noWrap component="div">
            ClassMates
          </Typography>
          <Container className={styles.profileIcon} sx={{ flexGrow: 0 }}>
            <Typography className={styles.profileName}>Current User</Typography>
            <Avatar
              className={styles.profileAvatar}
              alt="Remy Sharp"
              src="https://www.vhv.rs/dpng/d/426-4264903_user-avatar-png-picture-avatar-profile-dummy-transparent.png"
              sx={{ width: 50, height: 50 }}
            />
          </Container>
        </Toolbar>
      </AppBar>
      <Drawer className='drawer' variant="permanent" open={open} >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon style={{ color: '#FFFFFF' }} /> : <ChevronLeftIcon style={{ color: '#FFFFFF' }} />}
          </IconButton>
        </DrawerHeader>

        <List>
          {['My Classes', 'Calendar', 'Notifications', 'Class Catalog'].map((text, index) => (
            <ListItemButton
              key={text}
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                {index === 0 && <Link href={pageUrls[index]}><ClassOutlinedIcon style={{ color: '#FFFFFF' }} /></Link>}
                {index === 1 && <Link href={pageUrls[index]}><CalendarMonthOutlinedIcon style={{ color: '#FFFFFF' }} /></Link>}
                {index === 2 && <Link href={pageUrls[index]}><NotificationsOutlinedIcon style={{ color: '#FFFFFF' }} /></Link>}
                {index === 3 && <Link href={pageUrls[index]}><SearchOutlinedIcon style={{ color: '#FFFFFF' }} /></Link>}
              </ListItemIcon>
              <Link href={pageUrls[index]}><ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} /></Link>
            </ListItemButton>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <div className='justWork'>
          {children}
        </div>
      </Box>
    </Box >
  )
}
