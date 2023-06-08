import { fireEvent, screen } from "@testing-library/react";
import { describe, expect, it } from 'vitest';
import Signup from '../pages/Signup';
import { customRender } from "../test-utils";

describe('Login', () => {
  it('renders the signup page with the correct title', () => {
    customRender(<Signup />);
    expect(
      screen.getByRole('heading', {
        level: 2,
      })
    ).toHaveTextContent('Create an account');
  });
  it('renders the signup form with username input field', () => {
    customRender(<Signup />);
    const usernameInput = screen.getByLabelText('Name') as HTMLInputElement;
    expect(usernameInput).toBeInTheDocument();
    fireEvent.change(usernameInput, { target: { value: 'test username' } });
    expect(usernameInput.value).toBe('test username');
  });
  it('renders the signup form with email input field', () => {
    customRender(<Signup />);
    const emailInput = screen.getByLabelText('Email address') as HTMLInputElement;
    expect(emailInput).toBeInTheDocument();
    fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
    expect(emailInput.value).toBe('test@test.com');
  });
  it('renders the signup form with password input field', () => {
    customRender(<Signup />);
    const passwordInput = screen.getByLabelText('Password') as HTMLInputElement;
    expect(passwordInput).toBeInTheDocument();
    fireEvent.change(passwordInput, { target: { value: 'test password' } });
    expect(passwordInput.value).toBe('test password');
  });
});
