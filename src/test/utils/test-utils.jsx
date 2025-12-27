import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../../store/userSlice';
import myListReducer from '../../store/myListSlice';

/**
 * Custom render function that wraps components with necessary providers
 * @param {ReactElement} ui - Component to render
 * @param {Object} options - Render options
 * @param {Object} options.preloadedState - Initial Redux state
 * @param {Object} options.store - Custom store instance
 * @param {Object} ...renderOptions - Additional render options
 */
export function renderWithProviders(
  ui,
  {
    preloadedState = {},
    store = configureStore({
      reducer: {
        user: userReducer,
        myList: myListReducer,
      },
      preloadedState,
    }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <BrowserRouter>{children}</BrowserRouter>
      </Provider>
    );
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

/**
 * Creates a mock Redux store for testing
 * @param {Object} initialState - Initial state
 */
export function createMockStore(initialState = {}) {
  return configureStore({
    reducer: {
      user: userReducer,
      myList: myListReducer,
    },
    preloadedState: initialState,
  });
}

// Re-export everything from React Testing Library
export * from '@testing-library/react';

