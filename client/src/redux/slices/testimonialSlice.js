import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as testimonialService from '../../services/testimonialService';

const initialState = {
    testimonials: [],
    isLoading: false,
    error: null,
};

// Async thunks
export const fetchAllTestimonials = createAsyncThunk(
    'testimonials/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            const data = await testimonialService.getAllTestimonials();
            return data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Failed to fetch testimonials'
            );
        }
    }
);

export const fetchActiveTestimonials = createAsyncThunk(
    'testimonials/fetchActive',
    async (_, { rejectWithValue }) => {
        try {
            const data = await testimonialService.getActiveTestimonials();
            return data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Failed to fetch testimonials'
            );
        }
    }
);

// Slice
const testimonialSlice = createSlice({
    name: 'testimonials',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch all testimonials
            .addCase(fetchAllTestimonials.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchAllTestimonials.fulfilled, (state, action) => {
                state.isLoading = false;
                state.testimonials = action.payload.testimonials || action.payload;
            })
            .addCase(fetchAllTestimonials.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // Fetch active testimonials
            .addCase(fetchActiveTestimonials.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchActiveTestimonials.fulfilled, (state, action) => {
                state.isLoading = false;
                state.testimonials = action.payload.testimonials || action.payload;
            })
            .addCase(fetchActiveTestimonials.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { clearError } = testimonialSlice.actions;
export default testimonialSlice.reducer;
