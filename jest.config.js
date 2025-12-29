export default {
  // Use jsdom environment for React testing
  testEnvironment: 'jsdom',

  // Setup files to run before tests
  setupFilesAfterEnv: ['<rootDir>/src/test/setupTests.js'],

  // Module name mapper for CSS and assets
  moduleNameMapper: {
    // Handle CSS imports (with CSS modules)
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',

    // Handle CSS imports (without CSS modules)
    '^.+\\.(css|sass|scss)$': '<rootDir>/src/test/__mocks__/styleMock.js',

    // Handle image imports
    '^.+\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/src/test/__mocks__/fileMock.js',

    // Handle path aliases
    '^@/(.*)$': '<rootDir>/src/$1',
  },

  // Transform files with babel-jest
  transform: {
    '^.+\\.(js|jsx)$': ['babel-jest', { configFile: './babel.config.cjs' }],
  },

  // File extensions Jest will look for
  moduleFileExtensions: ['js', 'jsx', 'json'],

  // Test match patterns
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[jt]s?(x)',
  ],

  // Coverage configuration
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/main.jsx',
    '!src/**/*.test.{js,jsx}',
    '!src/**/__tests__/**',
    '!src/test/**',
  ],

  // Coverage thresholds (optional - can be adjusted)
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },

  // Ignore patterns
  testPathIgnorePatterns: ['/node_modules/', '/build/', '/dist/'],

  // Watch plugins for better DX
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
};

