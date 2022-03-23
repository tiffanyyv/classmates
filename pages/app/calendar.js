// Calendar Widget //
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  WeekView,
  Toolbar,
  DateNavigator,
  Appointments,
  TodayButton,
  AppointmentTooltip,
} from '@devexpress/dx-react-scheduler-material-ui';

import { useAuthContext } from '../../utils/context/AuthProvider';
import TooltipContent from '../../components/Calendar/subcomponents/TooltipContent.js';
import styles from '../../utils/styles/CalendarStyles/Calendar.module.css';
import { TimeTableCell, DayScaleCell } from '../../components/Calendar/Calendar.js';
import { mentorData, menteeData } from '../../components/Calendar/data/dummyData.js';
import CreateClassModal from '../../components/CreateClassModal/CreateClassModal.js'
import { getCoursesByMentorId } from '../../utils/api/apiCalls.js';


//import render Calendar component



//use username from GET request, current is just mock data


export default function Calendar({ courses }) {
  //import user state (mentor/mentee)
  const { user } = useAuthContext();
  const [appointmentData, setAppointmentData] = useState([]);
  const [userType, setUserType] = useState('mentee');
  useEffect(() => {
    setAppointmentData(mentorData);
  }, []);


  return (
    <div className="pageData">
      <div className={styles.calendarContainer}>
        <Head>
          <title>My Calendar</title>
        </Head>
        <div>
          <Paper elevation={6} className={styles.paper}>
            <Scheduler
              data={appointmentData}
              height={'800'}
            >
              <ViewState
              defaultCurrentViewName="Week"
              />
              <WeekView
                startDayHour={6}
                endDayHour={22}
                timeTableCellComponent={TimeTableCell}
                dayScaleCellComponent={DayScaleCell}
              />
              <Toolbar />
              <DateNavigator />
              <TodayButton />
              {userType === 'mentor' &&
              <div className={styles.createClassContainer}>
                <div className={styles.createClass}>
                  <CreateClassModal />
                </div>
              </div>
              }
              <Appointments />
              <AppointmentTooltip
              // contentComponent={TooltipContent}
              />
            </Scheduler>
          </Paper>
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps({ params }) {

  const req = await fetch('http://localhost:3000/api/courses/mentors/54');
  const data = await req.json();

  return {
    props: {courses: data},
  }
}