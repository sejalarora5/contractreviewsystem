import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Axios instance with base URL
const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL, // Your base URL from .env
});

// Login API thunk
export const loginUser = createAsyncThunk(
  'auth/token',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('password', password);
      const response = await api.post('/auth/token', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('response', response.data.access_token);
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.detail || 'An unexpected error occurred';
      console.log(errorMessage, 'this is error');
      return rejectWithValue(errorMessage);
    }
  }
);

// Logout API thunk
export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { getState, rejectWithValue }) => {
    const state = getState();
    const token = state.auth.token; // Access token from state

    try {
      const response = await api.post(
        '/auth/logout',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Logout response:', response.data.message);
      return response.data.message;
    } catch (error) {
      const errorMessage =
        error.response?.data?.detail || 'Failed to logout. Please try again.';
      console.log(errorMessage, 'Logout error');
      return rejectWithValue(errorMessage);
    }
  }
);

// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: false,
    error: null,
    token: null,
  },
  reducers: {
    clearState: (state) => {
      state.user = null;
      state.error = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.token = action.payload.access_token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearState } = authSlice.actions;
export default authSlice.reducer;
