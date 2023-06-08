import { fireEvent, screen } from "@testing-library/react";
import { describe, expect, it } from 'vitest';
import Login from '../pages/Login';
import { customRender } from '../test-utils';

describe('Login', () => {
  it('renders the login page with the correct title', () => {
    customRender(<Login />);
    expect(
      screen.getByRole('heading', {
        level: 2,
      })
    ).toHaveTextContent('Log In');
  });
  it('renders the login form with email input field', () => {
    customRender(<Login />);
    const emailInput = screen.getByLabelText('Email address') as HTMLInputElement;
    expect(emailInput).toBeInTheDocument();
    fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
    expect(emailInput.value).toBe('test@test.com');
  });
  it('renders the login form with password input field', () => {
    customRender(<Login />);
    const passwordInput = screen.getByLabelText('Password') as HTMLInputElement;
    expect(passwordInput).toBeInTheDocument();
    fireEvent.change(passwordInput, { target: { value: 'test password' } });
    expect(passwordInput.value).toBe('test password');
  });
});
