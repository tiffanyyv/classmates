import { useState } from 'react'
import  AccessTimeIcon from '@mui/icons-material/AccessTime';
import CircleIcon from '@mui/icons-material/Circle';
import EventIcon from '@mui/icons-material/Event';
import {
  FormControl,
  InputLabel,
  MenuItem,
  TextField,
  Select,
  DialogTitle,
  Dialog,
  DialogContent,
  Stack,
  Button,
  Popover
  } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DateTimePicker from '@mui/lab/DateTimePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import { updateCourseInfo, removeCourse } from '../../../utils/api/apiCalls.js'
import styles from '../../../utils/styles/CalendarStyles/TooltipContent.module.css'
import MainButton from '../../basecomponents/MainButton.js'


export default function AppointmentContent (currentAppointmentMetadata) {
  const {
    capacity,
    description,
    zoomLink,
    title,
    subject,
    mentor,
    mentees,
    id,
    photo } = currentAppointmentMetadata.appointmentData;

    let {
      startDate,
      endDate,
    } = currentAppointmentMetadata.appointmentData;

    startDate = new Date(startDate);
    endDate = new Date(endDate);
  //-----------------------states for edit window-----------------------------//
  const [editor, setEditor] = useState(false);
  const [editChanges, setEditChanges] = useState({});
  const [newStartTime, setNewStartTime] = useState(null);
  const [newEndTime, setNewEndTime] = useState(null);
  const [realTitle, setRealTitle] = useState(title);
  const [realStartDate, setRealStartDate] = useState(startDate);
  const [realEndDate, setRealEndDate] = useState(endDate);
  //----------------------------------------------------------------------

  //-----------------------states for delete window-----------------------
  const [anchorEl, setAnchorEl] = useState(null);
  const [classDeleted, setclassDeleted] = useState(false);
  //-----------------------------------------------------------------------
    const formatDate = (date) => {
      return date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    }

    const handleOpenZoomLink = (url) => {
      window.open(url, '_blank', 'noreferrer')
    }

    // ---------------------------EDIT WINDOW FUNCTIONS -------------------------------------
    const handleEditorFieldChange = (e) => {
    setEditChanges({ ...editChanges, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
      e.preventDefault;
      updateCourseInfo(id, editChanges);
      if (editChanges.name || (editChanges.start_date && editChanges.end_date)) {
        window.location.reload();
      }
    }
    // ------------------------------------------------------------------------------------

    // --------------------------FUNCTIONS FOR DELETE BUTTON-------------------------------
    const deleteCourse = () => {
      removeCourse(id);
      setAnchorEl(null);
      window.location.reload();
    }

    const handleTrashClick = (e) => {
      setAnchorEl(e.currentTarget);
    };

    const open = Boolean(anchorEl);

    const handleClose = () => {
      setAnchorEl(null);
    };
   //----------------------------------------------------------------------------------------

  if (editor) {
    return (
      // -----------------------THIS IS THE EDITOR WINDOW-------------------------
      <form className={styles.editFormContainer} onSubmit={handleSubmit}>
        <div className={styles.editChangesTopBox}>
          <EditIcon style={{color: '#84C7D0'}} />
          <h3 className={styles.editChangeTitle}>Edit This Class</h3>
          <div className={styles.editDeleteButtonBox}>
            {/* ------------------------DELETE POPOVER------------------------------------ */}
            <DeleteForeverIcon className={styles.editDeleteButton} onClick={handleTrashClick}/>
            <Popover
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}>
                <div className={styles.editDeletePopover}>
                  <div className={styles.editDeleteText}>Delete Course?</div>
                  <Button variant="contained" className={styles.editDeleteConfirm} onClick={deleteCourse}>Confirm</Button>
                </div>
              </Popover>
            {/* ----------------------------------------------------------------------------------- */}
          </div>
        </div>
        <FormControl component="fieldset" required className={styles.editClassForm}>
        {/* ----------------------NEW COURSE NAME-------------------------- */}
          <TextField
            required
            name="name"
            label="New Course Name"
            type="text"
            fullWidth
            color='primary'
            onChange={handleEditorFieldChange}
            placeholder={realTitle}
          />
           {/* ----------------------NEW START TIME PICKER-------------------------- */}
          <Stack direction="row" spacing={1} className={styles.editStackMargin}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  required
                  renderInput={(params) => <TextField {...params} fullWidth />}
                  label="New Start Time"
                  value={newStartTime}
                  name="start_date"
                  onChange={(newTimeValue) => {
                    setEditChanges({ ...editChanges, 'start_date': newTimeValue })
                    setNewStartTime(newTimeValue)
                  }
                  }
                />
              </LocalizationProvider>
               {/* ----------------------NEW END TIME PICKER-------------------------- */}
              <LocalizationProvider dateAdapter={AdapterDateFns} >
                <DateTimePicker
                  required
                  renderInput={(props) => <TextField {...props} fullWidth />}
                  label="New End Time"
                  name="end_date"
                  value={newEndTime}
                  onChange={(newTimeValue) => {
                    setEditChanges({ ...editChanges, 'end_date': newTimeValue })
                    setNewEndTime(newTimeValue)
                  }}
                />
              </LocalizationProvider>
            </Stack>
            <div className={styles.editbottomBox}>
              <Button className={styles.editChangesButton} type="submit" variant="contained" onClick={handleSubmit}>
                Submit
              </Button>
              <Button className={styles.editChangesButton} variant="contained" onClick={() => setEditor(false)}>
                Cancel
              </Button>
            </div>
        </FormControl>
      </form>
    )
  }
    return (
    // -----------------------THIS IS THE CLASS INFO WINDOW-------------------------
      <div className={styles.card}>
        <div className={styles.topBox}>
          <CircleIcon sx={{color: '#84C7D0'}}/>
          <h3 className={styles.title}>{realTitle}</h3>
          <EditIcon onClick={() => setEditor(true)} className={styles.editor}/>
        </div>
        <div className={styles.dateBox}>
          <EventIcon sx={{marginRight: '2%', color: '#84C7D0'}}/>
          <div className={styles.date}>{realStartDate.toDateString()}</div>
        </div>
        <div className={styles.timeBox}>
          <AccessTimeIcon sx={{marginRight: '2%', color: '#84C7D0'}}/>
          <div className={styles.time}>
            {`${formatDate(realStartDate)} - ${formatDate(realEndDate)} `}
          </div>
        </div>
        <div className={styles.bottomBox}>
          <div className={styles.subject}>{subject}</div>
          <div className={styles.description}>{description}</div>
          <div className={styles.mentor}>{`Mentor: ${mentor.name.first_name} ${mentor.name.last_name}`}</div>
          <div className={styles.zoomLink}>
            <MainButton value="Zoom Link" onClick={() => handleOpenZoomLink(zoomLink)}/>
        </div>

        </div>
      </div>

    );

}
//change bottom box styles so that description is a bit smaller

