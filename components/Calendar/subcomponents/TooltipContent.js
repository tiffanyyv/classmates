import  AccessTimeIcon from '@mui/icons-material/AccessTime';
import CircleIcon from '@mui/icons-material/Circle';
import EventIcon from '@mui/icons-material/Event';

import styles from '../../../utils/styles/CalendarStyles/TooltipContent.module.css'
import MainButton from '../../basecomponents/MainButton.js'

export default function AppointmentContent (currentAppointmentMetadata) {
  const {
    capacity,
    description,
    zoomLink,
    title,
    subject,
    startDate,
    endDate,
    mentor,
    mentees,
    id,
    photo } = currentAppointmentMetadata.appointmentData;

    const handleOpenZoomLink = (url) => {
      window.open(url, '_blank', 'noreferrer')
    }

  return (
    <div className={styles.card}>
      <div className={styles.topBox}>
        <CircleIcon sx={{color: '#84C7D0'}}/>
        <h3 className={styles.title}>{title}</h3>
      </div>
      <div className={styles.dateBox}>
        <EventIcon sx={{marginRight: '2%', color: '#84C7D0'}}/>
        <div className={styles.date}>{startDate.toDateString()}</div>
      </div>
      <div className={styles.timeBox}>
        <AccessTimeIcon sx={{marginRight: '2%', color: '#84C7D0'}}/>
        <div className={styles.time}>{`${startDate.toLocaleTimeString()} - ${endDate.toLocaleTimeString()} `}</div>
        {/* <div>{`  ${endDate.toLocaleTimeString()}`}</div> */}
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

