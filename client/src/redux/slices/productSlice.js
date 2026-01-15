import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as productService from '../../services/productService';

const initialState = {
    products: [],
    selectedProduct: null,
    filteredProducts: [],
    selectedCategory: null,
    isLoading: false,
    error: null,
};

// Async thunks
export const fetchAllProducts = createAsyncThunk(
    'products/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            const data = await productService.getAllProducts();
            return data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Failed to fetch products'
            );
        }
    }
);

export const fetchProductsByCategory = createAsyncThunk(
    'products/fetchByCategory',
    async (category, { rejectWithValue }) => {
        try {
            const data = await productService.getProductsByCategory(category);
            return data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Failed to fetch products'
            );
        }
    }
);

export const fetchProductById = createAsyncThunk(
    'products/fetchById',
    async (id, { rejectWithValue }) => {
        try {
            const data = await productService.getProductById(id);
            return data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Failed to fetch product'
            );
        }
    }
);

// Slice
const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        setSelectedCategory: (state, action) => {
            state.selectedCategory = action.payload;
            if (action.payload) {
                state.filteredProducts = state.products.filter(
                    (product) => product.category === action.payload
                );
            } else {
                state.filteredProducts = state.products;
            }
        },
        clearSelectedProduct: (state) => {
            state.selectedProduct = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch all products
            .addCase(fetchAllProducts.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchAllProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.products = action.payload.products || action.payload;
                state.filteredProducts = action.payload.products || action.payload;
            })
            .addCase(fetchAllProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // Fetch by category
            .addCase(fetchProductsByCategory.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.filteredProducts = action.payload.products || action.payload;
            })
            .addCase(fetchProductsByCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // Fetch by ID
            .addCase(fetchProductById.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.selectedProduct = action.payload.product || action.payload;
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { clearError, setSelectedCategory, clearSelectedProduct } =
    productSlice.actions;
export default productSlice.reducer;
