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

export const createProductItem = createAsyncThunk(
  'products/createItem',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/api/v1/dealer/products`, data.product, getAuthHeaders());
      console.log(data.variant.price)
      const newData = {
        name: response.data.createProduct.name,
        sku: data.variant.sku,
        price: +((data.variant.price) * 100),
        stock: data.variant.stock
      };
      
console.log(newData)
      await axios.post(
        `${API_URL}/api/v1/dealer/products/${response.data.createProduct.id}/variants`,
        newData,
        getAuthHeaders()
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const uploadAssets = createAsyncThunk(
  'asset/upload',
  async (formData, { rejectWithValue }) => {
    try {
      const responseAssest = await axios.post(`${API_URL}/api/v1/dealer/uploads`, formData, getAuthHeaders());
      return responseAssest.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const updateProductById = createAsyncThunk(
  'update/product',
  async (data, { rejectWithValue }) => {
    try {
      const responseAssest = await axios.put(`${API_URL}/api/v1/dealer/products/${data.id}`, data.product, getAuthHeaders());
      return responseAssest.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteProductItem = createAsyncThunk(
  'products/deleteItem',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${API_URL}/api/v1/dealer/products/${id}`, getAuthHeaders());
      return id; // Return the ID of the deleted product
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getVariantsById = createAsyncThunk(
  'variants/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/api/v1/dealer/products/variants/${id}`, getAuthHeaders());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteVariantsById = createAsyncThunk(
  'variants/deleteById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${API_URL}/api/v1/dealer/products/variants/${id}`, getAuthHeaders());
      return id; // Return the ID of the deleted variant
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchSingleProduct = createAsyncThunk(
  'products/fetchSingle',
  async (id) => {
    const response = await axios.get(`${API_URL}/api/v1/dealer/products/${id}`, getAuthHeaders());
    return response.data;
  }
);

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
        state.error = action.payload || action.error.message;
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
        state.error = action.payload || action.error.message;
      })
      .addCase(createProductItem.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(createProductItem.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        if (!Array.isArray(state.products)) {
          state.products = [];
        }
        state.products.push(action.payload); // Add the created item to the products array
      })
      .addCase(createProductItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(deleteProductItem.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(deleteProductItem.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.products = state.products.filter(product => product.id !== action.payload);
      })
      .addCase(deleteProductItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(getVariantsById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getVariantsById.fulfilled, (state, action) => {
        state.loading = false;
        // Handle the fetched variant data here if needed
      })
      .addCase(getVariantsById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(deleteVariantsById.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteVariantsById.fulfilled, (state, action) => {
        state.loading = false;
        // Handle the deletion of a variant here if needed
      })
      .addCase(deleteVariantsById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { resetCreateItemState } = productSlice.actions;
export default productSlice.reducer;
