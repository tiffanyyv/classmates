import {
  render,
  screen,
  fireEvent,
  getByText,
  waitFor,
  getAllByRole,
  fireEvent,
  getByTestId,
  getByAltText
} from '@testing-library/react';

import MyCourses from '../pages/[user-id]/my-courses/';


describe('My Profile', () => {
  it('renders a heading', () => {
    render(<Home />)

    const heading = screen.getByRole('heading', {
      name: /welcome to next\.js!/i,
    })

    expect(heading).toBeInTheDocument()
  })
})