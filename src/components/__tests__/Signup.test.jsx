/* eslint-env jest */
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { renderWithProviders } from '../../test/utils/test-utils';
import Signup from '../Signup';
import { mockUser } from '../../test/mocks/firebase';

jest.mock('../../utils/firebase', () => ({
  auth: {},
}));

jest.mock('firebase/auth', () => ({
  createUserWithEmailAndPassword: jest.fn(),
  updateProfile: jest.fn(),
  signInWithPopup: jest.fn(),
  GoogleAuthProvider: jest.fn(),
}));

describe('Signup Component', () => {
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render signup form with all essential fields', () => {
      renderWithProviders(<Signup />);
      
      expect(screen.getByRole('heading', { name: /sign up/i })).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/full name/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/email address/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/password \(min 8 characters\)/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /^sign up$/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /sign up with google/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /sign in now/i })).toBeInTheDocument();
    });
  });

  describe('Validation', () => {
    it('should show validation errors for empty fields', async () => {
      renderWithProviders(<Signup />);
      
      const submitButton = screen.getByRole('button', { name: /^sign up$/i });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText(/name is required/i)).toBeInTheDocument();
      });
      
      await waitFor(() => {
        expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      });
      
      await waitFor(() => {
        expect(screen.getByText(/password is required/i)).toBeInTheDocument();
      });
    });

    it('should show error for invalid email format', async () => {
      renderWithProviders(<Signup />);
      
      const nameInput = screen.getByPlaceholderText(/full name/i);
      const emailInput = screen.getByPlaceholderText(/email address/i);
      const passwordInput = screen.getByPlaceholderText(/password \(min 8 characters\)/i);
      const submitButton = screen.getByRole('button', { name: /^sign up$/i });
      
      fireEvent.change(nameInput, { target: { value: 'John Doe' } });
      fireEvent.change(emailInput, { target: { value: 'test@invalid' } });
      fireEvent.change(passwordInput, { target: { value: 'Test@12345' } });
      
      fireEvent.submit(submitButton.closest('form'));
      
      await waitFor(() => {
        expect(screen.getByText('Invalid email format')).toBeInTheDocument();
      });
    });

    it('should show error for weak password', async () => {
      renderWithProviders(<Signup />);
      
      const nameInput = screen.getByPlaceholderText(/full name/i);
      const emailInput = screen.getByPlaceholderText(/email address/i);
      const passwordInput = screen.getByPlaceholderText(/password \(min 8 characters\)/i);
      const submitButton = screen.getByRole('button', { name: /^sign up$/i });
      
      fireEvent.change(nameInput, { target: { value: 'John Doe' } });
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'weak' } });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText(/password must be at least 8 characters with uppercase, lowercase, and number/i)).toBeInTheDocument();
      });
    });
  });

  describe('Signup Functionality', () => {
    it('should successfully create account with valid credentials', async () => {
      const { createUserWithEmailAndPassword, updateProfile } = require('firebase/auth');
      const mockUserCredential = { user: mockUser };
      createUserWithEmailAndPassword.mockResolvedValue(mockUserCredential);
      updateProfile.mockResolvedValue();
      
      renderWithProviders(<Signup />);
      
      const nameInput = screen.getByPlaceholderText(/full name/i);
      const emailInput = screen.getByPlaceholderText(/email address/i);
      const passwordInput = screen.getByPlaceholderText(/password \(min 8 characters\)/i);
      const submitButton = screen.getByRole('button', { name: /^sign up$/i });
      
      fireEvent.change(nameInput, { target: { value: 'John Doe' } });
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'Test@123' } });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
          expect.anything(),
          'test@example.com',
          'Test@123'
        );
      });
      
      await waitFor(() => {
        expect(updateProfile).toHaveBeenCalledWith(
          mockUser,
          { displayName: 'John Doe' }
        );
      });
    });

    it('should show error when email already exists', async () => {
      const { createUserWithEmailAndPassword } = require('firebase/auth');
      createUserWithEmailAndPassword.mockRejectedValue({ 
        code: 'auth/email-already-in-use' 
      });
      
      renderWithProviders(<Signup />);
      
      const nameInput = screen.getByPlaceholderText(/full name/i);
      const emailInput = screen.getByPlaceholderText(/email address/i);
      const passwordInput = screen.getByPlaceholderText(/password \(min 8 characters\)/i);
      const submitButton = screen.getByRole('button', { name: /^sign up$/i });
      
      fireEvent.change(nameInput, { target: { value: 'John Doe' } });
      fireEvent.change(emailInput, { target: { value: 'existing@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'Test@123' } });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText(/an account with this email already exists/i)).toBeInTheDocument();
      });
    });

    it('should show loading state during signup', async () => {
      const { createUserWithEmailAndPassword } = require('firebase/auth');
      let resolveSignup;
      createUserWithEmailAndPassword.mockReturnValue(
        new Promise((resolve) => { resolveSignup = resolve; })
      );
      
      renderWithProviders(<Signup />);
      
      const nameInput = screen.getByPlaceholderText(/full name/i);
      const emailInput = screen.getByPlaceholderText(/email address/i);
      const passwordInput = screen.getByPlaceholderText(/password \(min 8 characters\)/i);
      const submitButton = screen.getByRole('button', { name: /^sign up$/i });
      
      fireEvent.change(nameInput, { target: { value: 'John Doe' } });
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'Test@123' } });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByRole('button', { name: /creating account/i })).toBeInTheDocument();
      });
      
      expect(submitButton).toBeDisabled();
      
      resolveSignup({ user: mockUser });
    });
  });

  describe('Google Signup', () => {
    it('should successfully sign up with Google', async () => {
      const { signInWithPopup } = require('firebase/auth');
      signInWithPopup.mockResolvedValue({ user: mockUser });
      
      renderWithProviders(<Signup />);
      
      const googleButton = screen.getByRole('button', { name: /sign up with google/i });
      fireEvent.click(googleButton);
      
      await waitFor(() => {
        expect(signInWithPopup).toHaveBeenCalled();
      });
    });
  });

  describe('Navigation', () => {
    it('should navigate to login page when sign in link is clicked', () => {
      renderWithProviders(<Signup />);
      
      const signInLink = screen.getByRole('link', { name: /sign in now/i });
      
      expect(signInLink).toBeInTheDocument();
      expect(signInLink).toHaveAttribute('href', '/login');
    });
  });

  describe('User Interaction', () => {
    it('should allow user to type in all input fields', async () => {
      renderWithProviders(<Signup />);
      
      const nameInput = screen.getByPlaceholderText(/full name/i);
      const emailInput = screen.getByPlaceholderText(/email address/i);
      const passwordInput = screen.getByPlaceholderText(/password \(min 8 characters\)/i);
      
      fireEvent.change(nameInput, { target: { value: 'John Doe' } });
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'Test@123' } });
      
      expect(nameInput).toHaveValue('John Doe');
      expect(emailInput).toHaveValue('test@example.com');
      expect(passwordInput).toHaveValue('Test@123');
    });
  });

  describe('Accessibility', () => {
    it('should have proper input types and placeholders', () => {
      renderWithProviders(<Signup />);
      
      const nameInput = screen.getByPlaceholderText(/full name/i);
      const emailInput = screen.getByPlaceholderText(/email address/i);
      const passwordInput = screen.getByPlaceholderText(/password \(min 8 characters\)/i);
      
      expect(nameInput).toHaveAttribute('type', 'text');
      expect(emailInput).toHaveAttribute('type', 'email');
      expect(passwordInput).toHaveAttribute('type', 'password');
      
      expect(nameInput).toHaveAttribute('placeholder', 'Full Name');
      expect(emailInput).toHaveAttribute('placeholder', 'Email Address');
      expect(passwordInput).toHaveAttribute('placeholder', 'Password (min 8 characters)');
    });
  });

});
