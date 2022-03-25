import Head from 'next/head';
import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import { Scheduler, DayView, Toolbar, DateNavigator, Appointments, TodayButton, AppointmentTooltip } from '@devexpress/dx-react-scheduler-material-ui';

import TooltipContent from '../Calendar/subcomponents/TooltipContent.js';
import styles from '../../utils/styles/CalendarStyles/Calendar.module.css';
import { TimeTableCell, DayScaleCell } from './Calendar.js';
import CreateClassModal from '../CreateClassModal/CreateClassModal.js';

import { getCoursesByMentorId, getCoursesByMenteeId, getUserInfo } from '../../utils/api/apiCalls.js';


export default function Calendar({ userInfo, formattedAllCoursesData }) {
  const [appointmentData, setAppointmentData] = useState(formattedAllCoursesData);
  const [userType, setUserType] = useState(userInfo.account_type);
  const [currUserId, setCurrUserId] = useState(userInfo.id);

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
          // console.log(apptDataResult);
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
        .catch (err => {
        console.log(err);
      })
    }
  }

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
              height={'950'}
            >
              <ViewState
              defaultCurrentViewName="Day"
              />
              <DayView
                startDayHour={6}
                endDayHour={22}
              />
              <Toolbar />
              <DateNavigator />
              <TodayButton />
              {userType === 'Mentor' &&
              <div className={styles.createClassContainer}>
                <div className={styles.createClass}>
                  <CreateClassModal getCoursesData={getCoursesData} userInfo={userInfo}/>
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