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
import UserInfo from '../mockData/UserInfo.js';
import Notifications from '../../pages/[user-id]/notifications.js';
import { getServerSideProps } from '../../pages/[user-id]/my-profile.js';
import "@testing-library/jest-dom/extend-expect";
import jestFetchMock from "jest-fetch-mock";

jestFetchMock.enableMocks();


beforeAll(() => testServer.listen({ onUnhandledRequest: "bypass" }));
afterEach(() => {
  testServer.resetHandlers();
  cleanup;
});
afterAll(() => testServer.close());

beforeEach(() => {
  act(() => {
    render(<MyProfile userInfo={UserInfo} />);
  });
  fetch.resetMocks();
});

describe('Notifications', () => {

  test('Loads User Name', async() => {
    const text = await waitFor(() => screen.getByText('Quinton Maki'))

    expect(text).toHaveTextContent('Quinton')
  })

})

describe('get server side props', () => {
const context = {
  params: { 'user-id': 'uQy9o1GcXPRbD9lVoNPTqROMwvs2' }
}

it('should handle errors', async () => {
    fetch.mockResponseOnce(JSON.stringify({ notFound: true }));

    const response = await getServerSideProps(context);
    expect(response).toEqual(
      expect.objectContaining({ notFound: true })
    )
  });
})