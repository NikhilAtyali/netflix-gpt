// Mock Firebase Auth for testing
export const mockUser = {
  uid: 'test-user-id-123',
  email: 'test@example.com',
  displayName: 'Test User',
  photoURL: null,
  emailVerified: true,
};

export const mockAuthError = {
  code: 'auth/wrong-password',
  message: 'The password is invalid or the user does not have a password.',
};

// Mock Firebase auth functions
export const mockSignInWithEmailAndPassword = jest.fn();
export const mockCreateUserWithEmailAndPassword = jest.fn();
export const mockSignInWithPopup = jest.fn();
export const mockSignOut = jest.fn();
export const mockOnAuthStateChanged = jest.fn();
export const mockUpdateProfile = jest.fn();

// Mock Firebase auth object
export const mockAuth = {
  currentUser: null,
  signInWithEmailAndPassword: mockSignInWithEmailAndPassword,
  createUserWithEmailAndPassword: mockCreateUserWithEmailAndPassword,
  signInWithPopup: mockSignInWithPopup,
  signOut: mockSignOut,
  onAuthStateChanged: mockOnAuthStateChanged,
};

// Mock Google Auth Provider
export const mockGoogleAuthProvider = jest.fn();

// Helper to setup Firebase mocks
export function setupFirebaseMocks() {
  jest.mock('../../utils/firebase', () => ({
    auth: mockAuth,
  }));

  jest.mock('firebase/auth', () => ({
    getAuth: jest.fn(() => mockAuth),
    signInWithEmailAndPassword: mockSignInWithEmailAndPassword,
    createUserWithEmailAndPassword: mockCreateUserWithEmailAndPassword,
    signInWithPopup: mockSignInWithPopup,
    signOut: mockSignOut,
    onAuthStateChanged: mockOnAuthStateChanged,
    GoogleAuthProvider: mockGoogleAuthProvider,
    updateProfile: mockUpdateProfile,
  }));
}

// Helper to reset Firebase mocks
export function resetFirebaseMocks() {
  mockSignInWithEmailAndPassword.mockReset();
  mockCreateUserWithEmailAndPassword.mockReset();
  mockSignInWithPopup.mockReset();
  mockSignOut.mockReset();
  mockOnAuthStateChanged.mockReset();
  mockUpdateProfile.mockReset();
  mockAuth.currentUser = null;
}

