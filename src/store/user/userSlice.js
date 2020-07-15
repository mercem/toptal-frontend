/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { login, signup } from './thunk';

import history from '../../router/history';

const pending = (state) => {
  state.loading = true;
  state.failed = false;
};

const rejected = (state) => {
  state.loading = false;
  state.failed = true;
};

const auth = (state, action) => {
  state.loading = false;
  state.user = action.payload.user;
  state.token = action.payload.token;
  localStorage.setItem('token', action.payload.token);
  localStorage.setItem('id', action.payload.user._id);
  localStorage.setItem('role', action.payload.user.role);
};

const userSlice = createSlice({
  name: 'user',
  initialState: { token: null, loading: false, failed: false },
  reducers: {
    logout: {
      reducer(state) {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('id');
        history.push('/');
        state.token = null;
      },
    },
  },
  extraReducers: {
    [login.pending]: pending,
    [login.fulfilled]: auth,
    [login.rejected]: rejected,
    [signup.pending]: pending,
    [signup.fulfilled]: auth,
    [signup.rejected]: rejected,
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
