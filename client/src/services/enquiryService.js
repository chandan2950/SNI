import api from './api';

// Submit new enquiry
export const createEnquiry = async (enquiryData) => {
    const response = await api.post('/enquiries', enquiryData);
    return response.data;
};

// Get user's enquiries
export const getMyEnquiries = async () => {
    const response = await api.get('/enquiries/my-enquiries');
    return response.data;
};

// Get all enquiries (for admin/management)
export const getAllEnquiries = async () => {
    const response = await api.get('/enquiries');
    return response.data;
};
