import { useState, useEffect } from 'react';
import { getUserInfo, updateUserInfo } from '../../utils/api/apiCalls.js';

import {
  Avatar,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  TextField
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

import MainButton from '../../components/basecomponents/MainButton.js'
import { defaultProfilePic, defaultProfilePicDims } from '../../utils/constants';
import styles from '../../utils/styles/Profiles.module.css';


export default function MyProfile({ userInfo }) {
  const [open, setOpen] = useState(false);
  const [descriptionInput, setDescriptionInput] = useState('');
  const [userType, setUserType] = useState(userInfo.account_type);
  const [userID, setUserID] = useState(userInfo.id);
  const [currentUserProfileInfo, setCurrentUserProfileInfo] = useState({
    fullName: `${userInfo.name.first_name} ${userInfo.name.last_name}`,
    location: userInfo.location,
    description: userInfo.description,
    endorsements: userInfo.endorsements,
    photo: userInfo.photo
  })

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdateUserInfo = () => {
    updateUserInfo(userID, { "description": descriptionInput })
      .then(() => {
        setOpen(false);
        getUserInfo(userID)
          .then(res => setCurrentUserProfileInfo({
            fullName: `${res.name.first_name} ${res.name.last_name}`,
            location: res.location,
            description: res.description,
            endorsements: res.endorsements,
            photo: res.photo
          }))
      })
      .catch(err => console.warn('Error updating description'))
  }

  return (
    <div className="pageData">
      <div className={styles.myProfileContainer}>
        <div className={styles.myProfilePic}>
          <Avatar
            className="my-profile-view-avatar"
            alt="My Profile Picture"
            src={currentUserProfileInfo.photo ? currentUserProfileInfo.photo : defaultProfilePic}
            sx={defaultProfilePicDims}
          /></div>
        <h2>{currentUserProfileInfo.fullName}</h2>
        <h3>{userType}</h3>
        <h4>{currentUserProfileInfo.location}</h4>
        <p>{currentUserProfileInfo.description ?
          currentUserProfileInfo.description :
          <span>Edit description</span>}
          <EditIcon className={styles.editProfileDescription} onClick={handleClickOpen} />
        </p>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Edit your profile description</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Describe Yourself"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => setDescriptionInput(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <MainButton value="Cancel" onClick={handleClose} />
            <MainButton value="Save" onClick={handleUpdateUserInfo} />
          </DialogActions>
        </Dialog>
        {userType === 'Mentor' &&
          <div className={styles.profileEndorsementSection}>Recommended: {currentUserProfileInfo.endorsements}</div>}
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  const userId = context.params['user-id'];
  const userInfo = await getUserInfo(userId)

  if (!userInfo || !userInfo?.account_type) {
    return {
      notFound: true,
    }
  }

  return {
    props: { userInfo }
  }
}