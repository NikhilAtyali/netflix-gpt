import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,      // User object from Firebase
    loading: true,   // Loading state for auth check
    error: null,     // Error messages
  },
  reducers: {
    // Set user data when logged in
    setUser: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    
    // Clear user data when logged out
    clearUser: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
    },
    
    // Set loading state
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    
    // Set error message
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

// Export actions
export const { setUser, clearUser, setLoading, setError } = userSlice.actions;

// Selectors for easy access in components
export const selectUser = (state) => state.user.user;
export const selectLoading = (state) => state.user.loading;
export const selectError = (state) => state.user.error;
export const selectIsAuthenticated = (state) => state.user.user !== null;

export default userSlice.reducer;
