import Head from 'next/head';
import { useState } from 'react';

import { Typography, Stack } from '@mui/material';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';

import { getUserInfo, getCoursesByMenteeId, getCoursesByMentorId } from '../../utils/api/apiCalls';

export default function Notifications({ userInfo, userCourses }) {
  const getMentorNotificationCount = () => {
    let tempCount = 0;
    allUserCourses[0].map(course => {
      tempCount += course.mentees.length
    })
    return tempCount;
  }

  const [allUserCourses, setAllUserCourses] = useState([userCourses]);
  const [menteeNotificationCount, setMenteeNotificationCount] = useState(userCourses.length);
  const [mentorNotificationCount, setMentorNotificationCount] = useState(getMentorNotificationCount);

  const handleDeleteMenteeNotification = (courseIndex) => {
    let allCoursesCopy = [...allUserCourses];
    allCoursesCopy[0].splice(courseIndex, 1);
    setAllUserCourses(allCoursesCopy);
    setMenteeNotificationCount(menteeNotificationCount - 1)
  }

  const handleDeleteMentorNotification = (courseIndex, studentIndex) => {
    let allCoursesCopy = [...allUserCourses];
    allCoursesCopy[0][courseIndex].mentees.splice(studentIndex, 1);
    setAllUserCourses(allCoursesCopy);
    setMentorNotificationCount(mentorNotificationCount - 1)
  }

  return (
    <div className='pageData'>
      <Head>
        <title>My Notifications</title>
      </Head>
      <Typography gutterBottom variant="h5" component="div">
        <strong>My Notifications</strong>
        </Typography>
      <br></br>

      {!menteeNotificationCount
      && userInfo.account_type === 'Mentee' &&
      <Typography gutterBottom variant="h7" component="div">No new notifications</Typography>}

      {!mentorNotificationCount
      && userInfo.account_type === 'Mentor' &&
      <Typography gutterBottom variant="h7" component="div">No new notifications</Typography>}

      <Stack spacing={0.5}>
      {userInfo.account_type === 'Mentee' &&
        allUserCourses[0].map((course, courseIndex) =>
          <Stack direction="row" key={`${courseIndex}`}>
            <Typography >You have signed up for <strong>{course.name}</strong> </Typography>
            <ClearOutlinedIcon onClick={() => handleDeleteMenteeNotification(courseIndex)}/>
          </Stack>
        )}
      </Stack>

        <Stack spacing={0.5}>
          {userInfo.account_type === 'Mentor' &&
            allUserCourses[0].map((course, courseIndex) => {
              return course.mentees.map((mentee, menteeIndex) => {
                return (
                  <Stack direction="row" key={`${courseIndex}-${menteeIndex}`}>
                    <Typography><strong>{mentee.name.first_name} {mentee.name.last_name}</strong> has signed up for <strong>{course.name}</strong></Typography>
                    <ClearOutlinedIcon onClick={() => handleDeleteMentorNotification(courseIndex, menteeIndex)}/>
                  </Stack>
                )
              })
            })
          }
        </Stack>
    </div>
  )
}

export async function getServerSideProps(context) {
  const userId = context.params['user-id'];
  const userInfo = await getUserInfo(userId)
  const userCourses = (userInfo.account_type === 'Mentor') ? await getCoursesByMentorId(userId) : await getCoursesByMenteeId(userId);

  if (!userInfo || !userInfo?.account_type) {
    return {
      notFound: true,
    }
  }

  if (!userCourses) {
    return {
      notFound: true,
    }
  }

  return {
    props: { userInfo, userCourses }
  }
}
