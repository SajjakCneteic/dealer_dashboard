import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

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

export const UserDetails = createAsyncThunk('user/details', async () => {
  const response = await axios.get(`${API_URL}/api/v1/dealer/me`, getAuthHeaders());
  return response.data;
});

export const fetchAllProducts = createAsyncThunk('products/fetchAll', async () => {
  const response = await axios.get(`${API_URL}/api/v1/dealer/products`, getAuthHeaders());
  return response.data;
});

export const createProductItem = createAsyncThunk('products/createItem', async (data) => {
  const response = await axios.post(`${API_URL}/api/v1/dealer/products`, data, getAuthHeaders());
  return response.data;
});

export const deleteProductItem = createAsyncThunk('products/deleteItem', async (id) => {
  const response = await axios.delete(`${API_URL}/api/v1/dealer/products/${id}`, getAuthHeaders());
  return response.data;
});

export const fetchSingleProduct = createAsyncThunk('products/fetchSingle', async (id) => {
  const response = await axios.get(`${API_URL}/api/v1/dealer/products/${id}`, getAuthHeaders());
  return response.data;
});

const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    product: null,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetCreateItemState: (state) => {
      state.success = false;
      state.error = null;
    },
  },
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
      })
      .addCase(createProductItem.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(createProductItem.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.products.push(action.payload); // Optional: If you want to add the created item to the products array
      })
      .addCase(createProductItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteProductItem.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(deleteProductItem.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.products = state.products.filter(
          (product) => product.id !== action.meta.arg
        );
      })
      .addCase(deleteProductItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { resetCreateItemState } = productSlice.actions;
export default productSlice.reducer;
