import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL, 
});
export const signupUser = createAsyncThunk('auth/signup', async ({ username,
  email,
  fullname,
  password }, { rejectWithValue }) => {
  try {
    const response = await api.post('/auth/register', {
      username: username,
      email: email,
      fullname: fullname,
      password: password,
    });
    console.log("response of signup api", response)
    return response.data;
  } catch (error) {
    console.log("Signup error", error)

    return rejectWithValue(error.response?.data?.detail || error.message);
  }
});

const initialState = {
  username: '',
  email: '',
  fullname: '',
  password: '',
  loading: false,
  error: null,
};

const signupSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setFullname: (state, action) => {
      state.fullname = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    clearSignupData: (state) => {
      state.username = '';
      state.email = '';
      state.fullname = '';
      state.password = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        // Optional: Handle successful signup, such as setting user data or redirecting
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export const { setUsername, setEmail, setFullname, setPassword, clearSignupData } = signupSlice.actions;

export default signupSlice.reducer;