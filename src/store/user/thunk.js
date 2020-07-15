import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';
import { LOGIN, SIGNUP } from '../../api/endpoints';

export const login = createAsyncThunk(
  'user/login',
  async ({ email, password }) => {
    const response = await api.post(LOGIN, {
      email, password
    })
    return response.data
  }
)

export const signup = createAsyncThunk(
  'user/signup',
  async (data) => {
    const response = await api.post(SIGNUP, {
      ...data
    })
    return response.data
  }
)