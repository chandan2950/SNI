import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import productReducer from './slices/productSlice';
import enquiryReducer from './slices/enquirySlice';
import testimonialReducer from './slices/testimonialSlice';
import leadsReducer from './slices/leadsSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        products: productReducer,
        enquiries: enquiryReducer,
        testimonials: testimonialReducer,
        leads: leadsReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export default store;
