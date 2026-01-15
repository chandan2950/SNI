import api from './api';

// Get all testimonials
export const getAllTestimonials = async () => {
    const response = await api.get('/testimonials');
    return response.data;
};

// Get active testimonials only
export const getActiveTestimonials = async () => {
    const response = await api.get('/testimonials/active');
    return response.data;
};
