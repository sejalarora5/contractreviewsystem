import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL, // Your base URL from .env
});
export const loginUser = createAsyncThunk('auth/token', async ({ username, password }, { rejectWithValue }) => {

  try {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    const response = await api.post('/auth/token', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log("response", response.data.access_token)
    return response.data;
  } catch (error) {
    // return rejectWithValue(error.response.data); 
    const errorMessage = error.response?.data?.detail || 'An unexpected error occurred';
    console.log(errorMessage, 'this is error')
    return rejectWithValue(errorMessage);
  }
});


const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: false,
    error: null,
    token: null
  },
  reducers: {
    logout: (state) => {
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
      });
  },
});

export const { logout, token } = authSlice.actions;
export default authSlice.reducer;
