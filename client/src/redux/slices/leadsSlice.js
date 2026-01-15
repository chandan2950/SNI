import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import crmService from '../../services/crmService.js';

const initialState = {
    leads: [],
    selectedLead: null,
    loading: false,
    error: null,
    filters: {
        status: 'all',
        assignedTo: 'all',
        productType: 'all',
        search: '',
        startDate: null,
        endDate: null,
    },
    pagination: {
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0,
    },
    stats: {
        New: 0,
        Contacted: 0,
        Interested: 0,
        Converted: 0,
        Lost: 0,
        totalLeads: 0,
        assignedCount: 0,
        unassignedCount: 0,
        conversionRate: 0,
    },
    executives: [],
};

// Async thunks
export const fetchLeads = createAsyncThunk(
    'leads/fetchLeads',
    async ({ filters, pagination, isExecutive }, { rejectWithValue }) => {
        try {
            const response = isExecutive
                ? await crmService.getAssignedLeads(filters, pagination)
                : await crmService.getAllLeads(filters, pagination);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch leads');
        }
    }
);

export const fetchLeadDetails = createAsyncThunk(
    'leads/fetchLeadDetails',
    async ({ leadId, isExecutive }, { rejectWithValue }) => {
        try {
            const response = isExecutive
                ? await crmService.getLeadDetails(leadId)
                : await crmService.getLeadDetailsAdmin(leadId);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch lead details');
        }
    }
);

export const assignLead = createAsyncThunk(
    'leads/assignLead',
    async ({ leadId, executiveId }, { rejectWithValue }) => {
        try {
            const response = await crmService.assignLead(leadId, executiveId);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to assign lead');
        }
    }
);

export const reassignLead = createAsyncThunk(
    'leads/reassignLead',
    async ({ leadId, executiveId }, { rejectWithValue }) => {
        try {
            const response = await crmService.reassignLead(leadId, executiveId);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to reassign lead');
        }
    }
);

export const updateLeadStatus = createAsyncThunk(
    'leads/updateLeadStatus',
    async ({ leadId, status }, { rejectWithValue }) => {
        try {
            const response = await crmService.updateLeadStatus(leadId, status);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update status');
        }
    }
);

export const addRemark = createAsyncThunk(
    'leads/addRemark',
    async ({ leadId, text, type }, { rejectWithValue }) => {
        try {
            const response = await crmService.addRemark(leadId, text, type);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to add remark');
        }
    }
);

export const fetchStats = createAsyncThunk(
    'leads/fetchStats',
    async (isExecutive, { rejectWithValue }) => {
        try {
            const response = isExecutive
                ? await crmService.getMyStats()
                : await crmService.getDashboardStats();
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch stats');
        }
    }
);

export const fetchExecutives = createAsyncThunk(
    'leads/fetchExecutives',
    async (_, { rejectWithValue }) => {
        try {
            const response = await crmService.getExecutives();
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch executives');
        }
    }
);

const leadsSlice = createSlice({
    name: 'leads',
    initialState,
    reducers: {
        setFilters: (state, action) => {
            state.filters = { ...state.filters, ...action.payload };
            state.pagination.page = 1; // Reset to first page when filters change
        },
        setPagination: (state, action) => {
            state.pagination = { ...state.pagination, ...action.payload };
        },
        clearSelectedLead: (state) => {
            state.selectedLead = null;
        },
        clearError: (state) => {
            state.error = null;
        },
        resetFilters: (state) => {
            state.filters = initialState.filters;
            state.pagination.page = 1;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch leads
            .addCase(fetchLeads.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchLeads.fulfilled, (state, action) => {
                state.loading = false;
                state.leads = action.payload.leads;
                state.pagination = {
                    page: action.payload.currentPage,
                    limit: state.pagination.limit,
                    total: action.payload.total,
                    totalPages: action.payload.totalPages,
                };
            })
            .addCase(fetchLeads.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Fetch lead details
            .addCase(fetchLeadDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchLeadDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedLead = action.payload.lead;
            })
            .addCase(fetchLeadDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Assign lead
            .addCase(assignLead.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(assignLead.fulfilled, (state, action) => {
                state.loading = false;
                // Update the lead in the list
                const index = state.leads.findIndex((l) => l._id === action.payload.lead._id);
                if (index !== -1) {
                    state.leads[index] = action.payload.lead;
                }
            })
            .addCase(assignLead.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Reassign lead
            .addCase(reassignLead.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(reassignLead.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.leads.findIndex((l) => l._id === action.payload.lead._id);
                if (index !== -1) {
                    state.leads[index] = action.payload.lead;
                }
            })
            .addCase(reassignLead.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Update lead status
            .addCase(updateLeadStatus.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateLeadStatus.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.leads.findIndex((l) => l._id === action.payload.lead._id);
                if (index !== -1) {
                    state.leads[index] = action.payload.lead;
                }
                if (state.selectedLead && state.selectedLead._id === action.payload.lead._id) {
                    state.selectedLead = action.payload.lead;
                }
            })
            .addCase(updateLeadStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Add remark
            .addCase(addRemark.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addRemark.fulfilled, (state, action) => {
                state.loading = false;
                if (state.selectedLead && state.selectedLead._id === action.payload.lead._id) {
                    state.selectedLead = action.payload.lead;
                }
            })
            .addCase(addRemark.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Fetch stats
            .addCase(fetchStats.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchStats.fulfilled, (state, action) => {
                state.loading = false;
                state.stats = action.payload.stats;
            })
            .addCase(fetchStats.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Fetch executives
            .addCase(fetchExecutives.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchExecutives.fulfilled, (state, action) => {
                state.loading = false;
                state.executives = action.payload.data;
            })
            .addCase(fetchExecutives.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { setFilters, setPagination, clearSelectedLead, clearError, resetFilters } =
    leadsSlice.actions;

export default leadsSlice.reducer;
