import { styled } from '@mui/material/styles';
import { WeekView } from '@devexpress/dx-react-scheduler-material-ui';

const classes = {
  todayCell: `todayCell`,
  dayCell: `dayCell`,
  todayHeader: `today`,
  dayHeader: `weekday`,
};

export const StyledWeekViewTimeTableCell = styled(WeekView.TimeTableCell)(({ theme }) => ({
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


export const StyledWeekViewDayScaleCell = styled(WeekView.DayScaleCell)(({ theme }) => ({
  [`&.${classes.todayHeader}`]: {
    backgroundColor: 'white',
  },
  [`&.${classes.dayHeader}`]: {
    backgroundColor: 'white',
  },
}));


export const TimeTableCell = (props) => {
  const { startDate } = props;
  const date = new Date(startDate);

  if (date.getDate() === new Date().getDate()) {
    return <StyledWeekViewTimeTableCell {...props} className={classes.todayCell} />;
  } if (startDate.getDay() >= 0 && startDate.getDay() <= 6) {
    return <StyledWeekViewTimeTableCell {...props} className={classes.dayCell} />;
  }
  return <StyledWeekViewTimeTableCell {...props} />;
};


export const DayScaleCell = (props) => {
  const { startDate, today } = props;
  if (today) {
    return <StyledWeekViewDayScaleCell {...props} className={classes.todayHeader} />;
  } if (startDate.getDay() >= 0 && startDate.getDay() <= 6) {
    return <StyledWeekViewDayScaleCell {...props} className={classes.dayHeader} />;
  }
  return <StyledWeekViewDayScaleCell {...props} />;
};