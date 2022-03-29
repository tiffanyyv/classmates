import {
    render,
    screen,
    getByText,
    waitFor,
    getByRole,
    fireEvent,
    getByTestId,
    getByAltText,
    act,
  } from '@testing-library/react';
  import {
    test,
    expect,
    describe,
    beforeAll,
    beforeEach,
    afterAll,
    afterEach,
    cleanup,
  } from '@jest/globals';

import testServer from '../testServer.js'
const { UserInfo, MyCoursesMentor } = require('../mockData/allData');
import Calendar from '../../pages/[user-id]/calendar.js';
import TooltipContent from '../../components/Calendar/subcomponents/TooltipContent.js';

let formattedAllCoursesData = MyCoursesMentor.map((course) => {
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
    userType: UserInfo.account_type,
    uid: UserInfo.id,
  }
});


beforeAll(() => testServer.listen({ onUnhandledRequest: "bypass" }));
afterEach(() => {
  testServer.resetHandlers();
  cleanup;
});
afterAll(() => testServer.close());

beforeEach(() => {
  act(() => {
    render(<Calendar formattedAllCoursesData={formattedAllCoursesData} userInfo={UserInfo} />);
    // render(<TooltipContent currentAppointmentMetadata={ currentAppointmentMetadata } />);
  });
});

describe('Calendar', () => {

    test('Loads Calendar', async() => {
      const element = await waitFor(() => screen.getByTestId('calendar'))


      expect(element).toBeInTheDocument();
    });

    // test('Loads ToolTipContent', async() => {
    //   const element = await waitFor(() => screen.getByTestId('tooltip'))

    //   expect(element).toBeInTheDocument();
    // });

    // test('does this work?? didnt think so...', async() => {
    //   // const apptBlock = await waitFor(() => screen.getByRole('help'))
    //   const apptBlock = screen.getByText("Parsing Official Docs").closest("div").closest("div").closest("div").closest("div");
    //   console.log(apptBlock);
    //   expect(apptBlock).toBeInTheDocument();
    // })



  })