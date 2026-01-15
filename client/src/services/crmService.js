import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Get auth token from localStorage
const getAuthHeader = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user && user.token ? { Authorization: `Bearer ${user.token}` } : {};
};

// Admin APIs
const getAllLeads = async (filters, pagination) => {
    const params = {
        ...filters,
        page: pagination.page,
        limit: pagination.limit,
    };
    return axios.get(`${API_URL}/admin/leads`, {
        params,
        headers: getAuthHeader(),
    });
};

const assignLead = async (leadId, executiveId) => {
    return axios.post(
        `${API_URL}/admin/leads/${leadId}/assign`,
        { executiveId },
        { headers: getAuthHeader() }
    );
};

const reassignLead = async (leadId, executiveId) => {
    return axios.put(
        `${API_URL}/admin/leads/${leadId}/reassign`,
        { executiveId },
        { headers: getAuthHeader() }
    );
};

const getDashboardStats = async () => {
    return axios.get(`${API_URL}/admin/dashboard/stats`, {
        headers: getAuthHeader(),
    });
};

const exportLeads = async (filters) => {
    return axios.get(`${API_URL}/admin/leads/export`, {
        params: filters,
        headers: getAuthHeader(),
        responseType: 'blob',
    });
};

const getActivityLog = async (filters, pagination) => {
    const params = {
        ...filters,
        page: pagination.page,
        limit: pagination.limit,
    };
    return axios.get(`${API_URL}/admin/activity-log`, {
        params,
        headers: getAuthHeader(),
    });
};

const getExecutives = async () => {
    return axios.get(`${API_URL}/admin/executives`, {
        headers: getAuthHeader(),
    });
};

// Executive APIs
const getAssignedLeads = async (filters, pagination) => {
    const params = {
        ...filters,
        page: pagination.page,
        limit: pagination.limit,
    };
    return axios.get(`${API_URL}/executive/leads`, {
        params,
        headers: getAuthHeader(),
    });
};

const getLeadDetails = async (leadId) => {
    return axios.get(`${API_URL}/executive/leads/${leadId}`, {
        headers: getAuthHeader(),
    });
};

const updateLeadStatus = async (leadId, status) => {
    return axios.put(
        `${API_URL}/executive/leads/${leadId}/status`,
        { status },
        { headers: getAuthHeader() }
    );
};

const addRemark = async (leadId, text, type) => {
    return axios.post(
        `${API_URL}/executive/leads/${leadId}/remarks`,
        { text, type },
        { headers: getAuthHeader() }
    );
};

const getMyStats = async () => {
    return axios.get(`${API_URL}/executive/stats`, {
        headers: getAuthHeader(),
    });
};

// Admin-specific lead details (if needed)
const getLeadDetailsAdmin = async (leadId) => {
    return axios.get(`${API_URL}/admin/leads/${leadId}`, {
        headers: getAuthHeader(),
    });
};

const crmService = {
    // Admin
    getAllLeads,
    assignLead,
    reassignLead,
    getDashboardStats,
    exportLeads,
    getActivityLog,
    getExecutives,
    getLeadDetailsAdmin,

    // Executive
    getAssignedLeads,
    getLeadDetails,
    updateLeadStatus,
    addRemark,
    getMyStats,
};

export default crmService;
