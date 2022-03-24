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
import {
  getCoursesByMentorId,
  getCoursesByMenteeId,
  createNewCourse,
  updateCourseInfo,
  removeCourse,
  getUserInfo,
} from '../../utils/api/apiCalls.js';


//import render Calendar component

//use username from GET request, current is just mock data


export default function Calendar() {
  //import user state (mentor/mentee)
  const { user } = useAuthContext();
  const [appointmentData, setAppointmentData] = useState([]);
  const [userType, setUserType] = useState('');
  const [currUserId, setCurrUserId] = useState('51');

  const getCoursesData = () => {
    if (userType === 'Mentor') {
      getCoursesByMentorId(currUserId)
        .then(res => {
          // setAppointmentData(res);
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

  useEffect(() => {
    getUserInfo(currUserId)
      .then(res => {
        setUserType(res.account_type);
      })

      return () => setUserType('')
  }, [])

  useEffect(() => {
    getCoursesData();

    return () => setAppointmentData([]);
}, [userType]);




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
              {userType === 'Mentor' &&
              <div className={styles.createClassContainer}>
                <div className={styles.createClass}>
                  <CreateClassModal getCoursesData={getCoursesData}/>
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

// export async function getServerSideProps({ params }) {

//   const req = await fetch('http://localhost:3000/api/courses/mentors/54');
//   const data = await req.json();

//   return {
//     props: {courses: data},
//   }
// }