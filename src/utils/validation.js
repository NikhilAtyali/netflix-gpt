// Form Validation Utilities

// Email validation using regex
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Password validation - at least 8 characters, 1 uppercase, 1 lowercase, 1 number
export const validatePassword = (password) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return passwordRegex.test(password);
};

// Name validation - at least 2 characters
export const validateName = (name) => {
  return name.trim().length >= 2;
};

// Validate signup form
export const validateSignupForm = (email, password, name) => {
  const errors = {};

  if (!name) {
    errors.name = "Name is required";
  } else if (!validateName(name)) {
    errors.name = "Name must be at least 2 characters";
  }

  if (!email) {
    errors.email = "Email is required";
  } else if (!validateEmail(email)) {
    errors.email = "Invalid email format";
  }

  if (!password) {
    errors.password = "Password is required";
  } else if (!validatePassword(password)) {
    errors.password = "Password must be at least 8 characters with uppercase, lowercase, and number";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

// Validate login form
export const validateLoginForm = (email, password) => {
  const errors = {};

  if (!email) {
    errors.email = "Email is required";
  } else if (!validateEmail(email)) {
    errors.email = "Invalid email format";
  }

  if (!password) {
    errors.password = "Password is required";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

// Get user-friendly Firebase error messages
export const getFirebaseErrorMessage = (errorCode) => {
  const errorMessages = {
    'auth/user-not-found': 'No account found with this email',
    'auth/wrong-password': 'Incorrect password',
    'auth/invalid-credential': 'Invalid email or password',
    'auth/email-already-in-use': 'An account with this email already exists',
    'auth/weak-password': 'Password should be at least 6 characters',
    'auth/too-many-requests': 'Too many failed attempts. Please try again later',
    'auth/network-request-failed': 'Network error. Please check your connection',
    'auth/invalid-email': 'Invalid email address',
    'auth/user-disabled': 'This account has been disabled',
    'auth/operation-not-allowed': 'Operation not allowed. Please contact support',
    'auth/popup-closed-by-user': 'Sign-in popup was closed',
  };

  return errorMessages[errorCode] || 'An error occurred. Please try again';
};

