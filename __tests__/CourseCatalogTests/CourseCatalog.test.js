import {
  render,
  screen,
  act,
  fireEvent,
  waitFor,
  fireEvent,
} from '@testing-library/react';

import CourseCatalog from '../pages/[user-id]/course-catalog/';


describe('My Profile', () => {
  it('renders a heading', () => {
    render(<Home />)

    const heading = screen.getByRole('heading', {
      name: /welcome to next\.js!/i,
    })

    expect(heading).toBeInTheDocument()
  })
})