import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// export const signupUser = createAsyncThunk('auth/signup', async (userDetails, { rejectWithValue }) => {
//   try {
//     const response = await api.post('/auth/register', userDetails);
//     console.log(response)
//     return response.data;
//   } catch (error) {
//     console.log(error)

//     return rejectWithValue(error.response?.data || error.message);
//   }
// });
const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL, // Your base URL from .env
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

    return rejectWithValue(error.response?.data || error.message);
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
        state.error = action.payload;
      });
  },
});

export const { setUsername, setEmail, setFullname, setPassword, clearSignupData } = signupSlice.actions;

export default signupSlice.reducer;