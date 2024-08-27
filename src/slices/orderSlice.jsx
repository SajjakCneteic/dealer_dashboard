// src/slices/orderSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// Fetch all orders with an optional query
export const fetchAllOrders = createAsyncThunk(
  'orders/fetchAll', 
  async (query = '') => {
    let url = `${API_URL}/api/v1/dealer/orders`;
    if (query) {
      url += `?q=${query}`;
    }
    const response = await axios.get(url);
    return response.data;
  }
);

// Fetch a single order by ID
export const fetchSingleOrder = createAsyncThunk(
  'orders/fetchSingle', 
  async (id) => {
    const response = await axios.get(`${API_URL}/api/v1/dealer/orders/${id}`);
    return response.data;
  }
);

const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [],
    order: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all orders
      .addCase(fetchAllOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Fetch single order
      .addCase(fetchSingleOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSingleOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(fetchSingleOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default orderSlice.reducer;
