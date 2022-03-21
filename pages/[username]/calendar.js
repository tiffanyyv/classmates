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
import TooltipContent from '../../components/Calendar/subcomponents/TooltipContent.js';
import styles from '../../utils/styles/CalendarStyles/Calendar.module.css';
import { TimeTableCell, DayScaleCell } from '../../components/Calendar/Calendar.js';
import { data } from '../../components/Calendar/data/dummyData.js';

//import render Calendar component



//use username from GET request, current is just mock data
let username = 'Matt';


export default function Calendar () {
//import user state (mentor/mentee)

  const [appointmentData, setAppointmentData] = useState([]);


    useEffect(() => {
      setAppointmentData(data);
  }, []);

  return (
    <>
      <Head>
          <title>{`${username}'s Calendar`}</title>
      </Head>
      <div>
        <Paper elevation={6} className={styles.paper}>
        <Scheduler
          data={appointmentData}
          height={'800'}
        >
          <ViewState />
          <WeekView
            startDayHour={9}
            endDayHour={22}
            timeTableCellComponent={TimeTableCell}
            dayScaleCellComponent={DayScaleCell}
          />
          <Toolbar />
          <DateNavigator />
          <TodayButton />
          <Appointments />
          <AppointmentTooltip
          // contentComponent={Tooltipcontent}
          />
        </Scheduler>
      </Paper>
    </div>
    </>
  )
}
