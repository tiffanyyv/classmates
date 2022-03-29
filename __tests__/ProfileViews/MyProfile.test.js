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
import MyProfile from '../../pages/[user-id]/my-profile.js';
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

describe('My Profile', () => {
  test('Displays User Name', async() => {
    const text = await waitFor(() => screen.getByText('Quinton Maki'))
    expect(text).toHaveTextContent('Quinton')
  })

  test('Lets user edit profile description', async() => {
    const editButton = await waitFor(() => screen.getByRole('edit-description-icon'))
    fireEvent.click(editButton);
    const editDescriptionText = await waitFor(() => screen.getByRole('description'))
    fireEvent.change(editDescriptionText, { target: { value: 'test description' } });
    expect(editDescriptionText.value).toBe('test description');
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

  it('should run getUserInfo API call', async () => {
    fetch.mockResponseOnce(
      JSON.stringify({ props: { userInfo: UserInfo } })
    )

    const response = await getServerSideProps(context, UserInfo);
    expect(response).toEqual(
      expect.objectContaining({
        props: {
          userInfo: UserInfo
        }
      })
    );
  });
})