// src/slices/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://49.205.192.156:1775' ;
// const API_URL = 'http://49.205.192.156:1775';

console.log(API_URL)

export const login = createAsyncThunk('user/login', async (credentials, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_URL}/api/v1/seller/login`, credentials);
    const { token, 'dealer-token': dealerToken } = response.data.data;

    // Save tokens to local storage
    localStorage.setItem('token', token);
    localStorage.setItem('dealer-token', dealerToken);

    return response.data.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

export const signup = createAsyncThunk('user/signup', async (userInfo, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, userInfo);
    return response.data.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload.message : action.error.message;
      })
      .addCase(signup.pending, (state) => {
        state.loading = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload.message : action.error.message;
      });
  },
});

export default userSlice.reducer;
