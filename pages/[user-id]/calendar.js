// Calendar Widget //
import Head from 'next/head';
import dynamic from 'next/dynamic';
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
import CreateClassModal from '../../components/CreateClassModal/CreateClassModal.js';
import CalendarDayView from '../../components/Calendar/CalendarDayView.js';

import {
  getCoursesByMentorId,
  getCoursesByMenteeId,
  getUserInfo,
} from '../../utils/api/apiCalls.js';
import useWindowWidth from '../../utils/customHooks/useWindowWidth.js'


export default function Calendar({ userInfo, formattedAllCoursesData }) {

  const [appointmentData, setAppointmentData] = useState(formattedAllCoursesData);
  const [userType, setUserType] = useState(userInfo.account_type);
  const [currUserId, setCurrUserId] = useState(userInfo.id);

  if (typeof window === 'object') {
    const { width } = useWindowWidth();
  }

  const getCoursesData = () => {
    if (userType === 'Mentor') {
      getCoursesByMentorId(currUserId)
        .then(res => {
          let apptDataResult = res.map((course) => {
            return {
              title: course.name,
              startDate: new Date(course.start_date),
              endDate: new Date(course.end_date),
              zoomLink: course.meeting_url,
              capacity: course.capacity,
              description: course.description,
              id: course.id,
              subject: course.subject,
              photo: course.photo,
              mentor: course.mentor,
              mentees: course.mentees,
            }
          })
          setAppointmentData(apptDataResult);
        })
        .catch(err => {
          console.log(err);
        })
    } else {
      getCoursesByMenteeId(currUserId)
        .then(res => {
          let apptDataResult = res.map(course => {
            return {
              title: course.name,
              startDate: new Date(course.start_date),
              endDate: new Date(course.end_date),
              zoomLink: course.meeting_url,
              capacity: course.capacity,
              description: course.description,
              id: course.id,
              subject: course.subject,
              photo: course.photo,
              mentor: course.mentor,
              mentees: course.mentees,
            }
          })
          setAppointmentData(apptDataResult);
        })
        .catch(err => {
          console.log(err);
        })
    }
  }

  if (typeof width === 'number') {
    if (width <= 800) {
      return <CalendarDayView userInfo={userInfo} formattedAllCoursesData={formattedAllCoursesData} />
    }
  }
  return (
    <div className="pageData">
      <Head>
        <title>My Calendar</title>
      </Head>
      <div className={styles.calendarContainer}>
        <div>
          <Paper elevation={6} className={styles.paper}>
            <Scheduler
              data={appointmentData}
              height={'950'}
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
              {userType === 'Mentor' &&
                <div className={styles.createClassContainer}>
                  <div className={styles.createClass}>
                    <CreateClassModal getCoursesData={getCoursesData} userInfo={userInfo} />
                  </div>
                </div>
              }
              <Appointments />
              <AppointmentTooltip
                contentComponent={TooltipContent}
              />
            </Scheduler>
          </Paper>
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  const userId = context.params['user-id'];
  const userInfo = await getUserInfo(userId);
  let allCoursesData;

  if (userInfo.account_type === 'Mentor') {
    allCoursesData = await getCoursesByMentorId(userInfo.id)
  } else if (userInfo.account_type === 'Mentee') {
    allCoursesData = await getCoursesByMenteeId(userInfo.id)
  }

  let formattedAllCoursesData = allCoursesData.map((course) => {
    return {
      title: course.name,
      startDate: course.start_date,
      endDate: course.end_date,
      zoomLink: course.meeting_url,
      capacity: course.capacity,
      description: course.description,
      id: course.id,
      subject: course.subject,
      photo: course.photo,
      mentor: course.mentor,
      mentees: course.mentees,
    }
  });

  return {
    props: { userInfo, formattedAllCoursesData }
  }
}