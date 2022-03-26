import React from 'react';

import {render, screen, getByText, fireEvent, waitFor } from '@testing-library/react'
import Signup from '../pages/signup'
import { AuthProvider} from '../utils/context/AuthProvider'


function renderAuthContext() {
  return render(
    <AuthProvider value={{user: '1'}}>
      <Signup />
    </AuthProvider>
  );
}

test('Should render Sinup on page', () => {
  renderAuthContext();
   expect(screen.getByText('Signup')).toBeDefined()
})

test('Should render a drop down with Account Type',  () => {
  renderAuthContext();
   expect(screen.getByRole('testAccountType')).toBeDefined()
})
test('Should render a Button that says Coninue With Facebook', () => {
  renderAuthContext();
  expect(screen.getByText('Continue with Facebook')).toBeDefined()
})
test('Should render a Button that says Coninue With Google', () => {
  renderAuthContext();
  expect(screen.getByText('Continue with Google')).toBeDefined()
})



test('Input Variable Should contain a placeholder of Password', () => {
  renderAuthContext();
  expect(screen.getByPlaceholderText('Password')).toBeDefined()
})
test('Input Variable Should contain a placeholder of Fist Name', () => {
  renderAuthContext();
  expect(screen.getByPlaceholderText('First Name')).toBeDefined()
})
test('Input Variable Should contain a placeholder of Last Name', () => {
  renderAuthContext();
  expect(screen.getByPlaceholderText('Last Name')).toBeDefined()
})
test('Input Variable Should contain a placeholder of Location', () => {
  renderAuthContext();
  expect(screen.getByPlaceholderText('Location')).toBeDefined()
})
test('Input Variable Should contain a placeholder of Email', () => {
  renderAuthContext();
  expect(screen.getByPlaceholderText('Email')).toBeDefined()
})


// test('Button Click', () => {
//   renderAuthContext();
//   // var createButton = waitFor(() => screen.getByRole('CreateAccountButton'))
//   // fireEvent.click(createButton)
//   expect(screen.getByRole('CreateAccountButton').closest('button')).toHaveAttribute('disabled');
// })
