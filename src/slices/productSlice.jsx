// src/slices/productSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL ||'http://49.205.192.156:1775' ;

// Helper function to get tokens from local storage
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  const dealerToken = localStorage.getItem('dealer-token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      'Dealer-Token': dealerToken,
    },
  };
};

export const fetchAllProducts = createAsyncThunk('products/fetchAll', async () => {
  const response = await axios.get(`${API_URL}/api/v1/seller/products`, getAuthHeaders());
  return response.data;
});

export const fetchSingleProduct = createAsyncThunk('products/fetchSingle', async (id) => {
  const response = await axios.get(`${API_URL}/api/v1/seller/products/${id}`, getAuthHeaders());
  return response.data;
});

const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    product: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchSingleProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchSingleProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;
