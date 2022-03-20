// #FFFFFF - white
// #F5F5F5 - off-white
// #B0B4D4 - light purp
// #84C7D0 - sea blue
// #4BD2D2 - ugly blue


import { useState, useEffect } from 'react';
// import { Scheduler, WeekView, DayView, Appointments, Toolbar, DateNavigator, ViewSwitcher,}
//import moment from 'moment';
import { styled, alpha } from '@mui/material/styles';
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
import TooltipContent from './subcomponents/TooltipContent.js';
import styles from '../../utils/styles/CalendarStyles/Calendar.module.css';


const data = [
  {
    title: 'KEvin CLASS',
    startDate: new Date(2022, 2, 19, 6, 35),
    endDate: new Date(2022, 2, 19, 18, 30),

    zoomlink: 'http://garbase.com'
  },
  {
  title: 'Other Class',
  startDate: new Date(2022, 2, 16, 6, 35),
  endDate: new Date(2022, 2, 16, 10, 30),
  zoomlink: 'http://assaffsaafs.com'
},]


const PREFIX = 'Pog';

const classes = {
  todayCell: `${PREFIX}-todayCell`,
  dayCell: `${PREFIX}-dayCell`,
  todayHeader: `${PREFIX}-today`,
  dayHeader: `${PREFIX}-weekday`,
};

const StyledWeekViewTimeTableCell = styled(WeekView.TimeTableCell)(({ theme }) => ({
  [`&.${classes.todayCell}`]: {
    backgroundColor: 'white',
    borderRight: 'none',
    '&:hover': {
      backgroundColor: 'aliceblue',
    },
    '&:focus': {
      backgroundColor: 'aliceblue',
    },
  },
  [`&.${classes.dayCell}`]: {
    backgroundColor: 'white',
    borderRight: 'none',
    '&:hover': {
      backgroundColor: 'aliceblue',
    },
    '&:focus': {
      backgroundColor: 'aliceblue',
    },
  },
}));

const StyledWeekViewDayScaleCell = styled(WeekView.DayScaleCell)(({ theme }) => ({
  [`&.${classes.todayHeader}`]: {
    backgroundColor: 'white',
  },
  [`&.${classes.dayHeader}`]: {
    backgroundColor: 'white',
  },
}));

const TimeTableCell = (props) => {
  const { startDate } = props;
  const date = new Date(startDate);

  if (date.getDate() === new Date().getDate()) {
    return <StyledWeekViewTimeTableCell {...props} className={classes.todayCell} />;
  } if (startDate.getDay() >= 0 && startDate.getDay() <= 6) {
    return <StyledWeekViewTimeTableCell {...props} className={classes.dayCell} />;
  }
  return <StyledWeekViewTimeTableCell {...props} />;
};

const DayScaleCell = (props) => {
  const { startDate, today } = props;
  if (today) {
    return <StyledWeekViewDayScaleCell {...props} className={classes.todayHeader} />;
  } if (startDate.getDay() >= 0 && startDate.getDay() <= 6) {
    return <StyledWeekViewDayScaleCell {...props} className={classes.dayHeader} />;
  }
  return <StyledWeekViewDayScaleCell {...props} />;
};

export default function Calendar () {
  const [appointmentData, setAppointmentData] = useState([]);


  useEffect(() => {
    setAppointmentData(data);
  }, [])


  return (
    <div>
        <Paper elevation={6} className={styles.paper}>
        <Scheduler
          data={appointmentData}
          height={'800'}
        >
          <ViewState />
          <WeekView
            startDayHour={9}
            endDayHour={20}
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
  );
}