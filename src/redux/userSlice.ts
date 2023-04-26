import { createSlice } from '@reduxjs/toolkit';
import appApi from './appApi';

export const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {},

  extraReducers: (builder) => {
    // save user after signup
    builder.addMatcher(
      appApi.endpoints.signupUser.matchFulfilled,
      (state, { payload }) => payload
    );
    // save user after login
    builder.addMatcher(
      appApi.endpoints.loginUser.matchFulfilled,
      (state, { payload }) => payload
    );
    // logout: destroy user session
    builder.addMatcher(appApi.endpoints.logoutUser.matchFulfilled, () => null);
  },
});

export default userSlice.reducer;
