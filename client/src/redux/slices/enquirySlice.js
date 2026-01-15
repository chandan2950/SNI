import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as enquiryService from '../../services/enquiryService';

const initialState = {
    enquiries: [],
    isLoading: false,
    isSubmitting: false,
    error: null,
    successMessage: null,
};

// Async thunks
export const submitEnquiry = createAsyncThunk(
    'enquiries/submit',
    async (enquiryData, { rejectWithValue }) => {
        try {
            const data = await enquiryService.createEnquiry(enquiryData);
            return data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Failed to submit enquiry'
            );
        }
    }
);

export const fetchMyEnquiries = createAsyncThunk(
    'enquiries/fetchMy',
    async (_, { rejectWithValue }) => {
        try {
            const data = await enquiryService.getMyEnquiries();
            return data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Failed to fetch enquiries'
            );
        }
    }
);

export const fetchAllEnquiries = createAsyncThunk(
    'enquiries/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            const data = await enquiryService.getAllEnquiries();
            return data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Failed to fetch enquiries'
            );
        }
    }
);

// Slice
const enquirySlice = createSlice({
    name: 'enquiries',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        clearSuccessMessage: (state) => {
            state.successMessage = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Submit enquiry
            .addCase(submitEnquiry.pending, (state) => {
                state.isSubmitting = true;
                state.error = null;
                state.successMessage = null;
            })
            .addCase(submitEnquiry.fulfilled, (state, action) => {
                state.isSubmitting = false;
                state.successMessage = 'Enquiry submitted successfully!';
                state.enquiries.unshift(action.payload.enquiry || action.payload);
            })
            .addCase(submitEnquiry.rejected, (state, action) => {
                state.isSubmitting = false;
                state.error = action.payload;
            })
            // Fetch my enquiries
            .addCase(fetchMyEnquiries.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchMyEnquiries.fulfilled, (state, action) => {
                state.isLoading = false;
                state.enquiries = action.payload.enquiries || action.payload;
            })
            .addCase(fetchMyEnquiries.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // Fetch all enquiries
            .addCase(fetchAllEnquiries.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchAllEnquiries.fulfilled, (state, action) => {
                state.isLoading = false;
                state.enquiries = action.payload.enquiries || action.payload;
            })
            .addCase(fetchAllEnquiries.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { clearError, clearSuccessMessage } = enquirySlice.actions;
export default enquirySlice.reducer;
