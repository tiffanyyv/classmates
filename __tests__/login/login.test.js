import React from 'react';

import {render, screen, getByText, fireEvent, waitFor } from '@testing-library/react'
import Login from '../pages/login'
import { AuthProvider} from '../utils/context/AuthProvider'


function renderAuthContext() {
  return render(
    <AuthProvider value={{user: '1'}}>
      <Login />
    </AuthProvider>
  );
}

test('Should render Login on page', () => {
  renderAuthContext();
   expect(screen.getByRole('LoginTitle')).toBeDefined()
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

test('Input Variable Should contain a placeholder of Email', () => {
  renderAuthContext();
  expect(screen.getByPlaceholderText('Email')).toBeDefined()
})