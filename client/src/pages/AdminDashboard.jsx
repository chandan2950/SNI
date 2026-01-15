import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchLeads,
    fetchStats,
    fetchExecutives,
    setFilters,
    setPagination,
    assignLead,
    reassignLead,
} from '../redux/slices/leadsSlice';
import StatusBadge from '../components/StatusBadge';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const dispatch = useDispatch();
    const { leads, loading, error, filters, pagination, stats, executives } = useSelector(
        (state) => state.leads
    );
    const [showAssignModal, setShowAssignModal] = useState(false);
    const [selectedLeadForAssignment, setSelectedLeadForAssignment] = useState(null);
    const [selectedExecutive, setSelectedExecutive] = useState('');

    useEffect(() => {
        dispatch(fetchStats(false));
        dispatch(fetchExecutives());
        dispatch(fetchLeads({ filters, pagination, isExecutive: false }));
    }, [dispatch, filters, pagination.page]);

    const handleFilterChange = (key, value) => {
        dispatch(setFilters({ [key]: value }));
    };

    const handlePageChange = (newPage) => {
        dispatch(setPagination({ page: newPage }));
    };

    const handleAssignClick = (lead) => {
        setSelectedLeadForAssignment(lead);
        setShowAssignModal(true);
    };

    const handleAssignSubmit = async () => {
        if (selectedLeadForAssignment && selectedExecutive) {
            const isReassign = selectedLeadForAssignment.assignedTo !== null;

            if (isReassign) {
                await dispatch(
                    reassignLead({
                        leadId: selectedLeadForAssignment._id,
                        executiveId: selectedExecutive,
                    })
                );
            } else {
                await dispatch(
                    assignLead({
                        leadId: selectedLeadForAssignment._id,
                        executiveId: selectedExecutive,
                    })
                );
            }

            setShowAssignModal(false);
            setSelectedLeadForAssignment(null);
            setSelectedExecutive('');
            dispatch(fetchLeads({ filters, pagination, isExecutive: false }));
            dispatch(fetchStats(false));
        }
    };

    const handleExport = () => {
        const queryParams = new URLSearchParams(filters).toString();
        const token = JSON.parse(localStorage.getItem('user'))?.token;
        window.open(
            `${process.env.REACT_APP_API_URL || 'http://localhost:5000/api'}/admin/leads/export?${queryParams}`,
            '_blank'
        );
    };

    return (
        <div className="admin-dashboard">
            <div className="dashboard-header">
                <h1>Admin Dashboard</h1>
                <p>Manage leads and track performance</p>
            </div>

            {/* Statistics Cards */}
            <div className="stats-grid">
                <div className="stat-card stat-new">
                    <h3>New</h3>
                    <p className="stat-number">{stats.New || 0}</p>
                </div>
                <div className="stat-card stat-contacted">
                    <h3>Contacted</h3>
                    <p className="stat-number">{stats.Contacted || 0}</p>
                </div>
                <div className="stat-card stat-interested">
                    <h3>Interested</h3>
                    <p className="stat-number">{stats.Interested || 0}</p>
                </div>
                <div className="stat-card stat-converted">
                    <h3>Converted</h3>
                    <p className="stat-number">{stats.Converted || 0}</p>
                </div>
                <div className="stat-card stat-lost">
                    <h3>Lost</h3>
                    <p className="stat-number">{stats.Lost || 0}</p>
                </div>
                <div className="stat-card stat-total">
                    <h3>Total Leads</h3>
                    <p className="stat-number">{stats.totalLeads || 0}</p>
                </div>
                <div className="stat-card stat-assigned">
                    <h3>Assigned</h3>
                    <p className="stat-number">{stats.assignedCount || 0}</p>
                </div>
                <div className="stat-card stat-conversion">
                    <h3>Conversion Rate</h3>
                    <p className="stat-number">{stats.conversionRate || 0}%</p>
                </div>
            </div>

            {/* Filters */}
            <div className="filters-section">
                <div className="filter-group">
                    <label>Status:</label>
                    <select
                        value={filters.status}
                        onChange={(e) => handleFilterChange('status', e.target.value)}
                    >
                        <option value="all">All</option>
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Interested">Interested</option>
                        <option value="Converted">Converted</option>
                        <option value="Lost">Lost</option>
                    </select>
                </div>

                <div className="filter-group">
                    <label>Assigned To:</label>
                    <select
                        value={filters.assignedTo}
                        onChange={(e) => handleFilterChange('assignedTo', e.target.value)}
                    >
                        <option value="all">All</option>
                        <option value="unassigned">Unassigned</option>
                        {executives.map((exec) => (
                            <option key={exec._id} value={exec._id}>
                                {exec.name} ({exec.assignedLeadsCount})
                            </option>
                        ))}
                    </select>
                </div>

                <div className="filter-group">
                    <label>Search:</label>
                    <input
                        type="text"
                        placeholder="Name, email, or phone..."
                        value={filters.search}
                        onChange={(e) => handleFilterChange('search', e.target.value)}
                    />
                </div>

                <button className="export-btn" onClick={handleExport}>
                    Export CSV
                </button>
            </div>

            {/* Leads Table */}
            {error && <div className="error-message">{error}</div>}

            {loading ? (
                <div className="loading">Loading leads...</div>
            ) : (
                <>
                    <div className="leads-table-container">
                        <table className="leads-table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Product Type</th>
                                    <th>Status</th>
                                    <th>Assigned To</th>
                                    <th>Created</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {leads.length === 0 ? (
                                    <tr>
                                        <td colSpan="8" style={{ textAlign: 'center', padding: '2rem' }}>
                                            No leads found
                                        </td>
                                    </tr>
                                ) : (
                                    leads.map((lead) => (
                                        <tr key={lead._id}>
                                            <td>{lead.name}</td>
                                            <td>{lead.email}</td>
                                            <td>{lead.phone}</td>
                                            <td>{lead.productType}</td>
                                            <td>
                                                <StatusBadge status={lead.status} />
                                            </td>
                                            <td>
                                                {lead.assignedTo
                                                    ? lead.assignedTo.name
                                                    : 'Unassigned'}
                                            </td>
                                            <td>
                                                {new Date(lead.createdAt).toLocaleDateString()}
                                            </td>
                                            <td>
                                                <button
                                                    className="assign-btn"
                                                    onClick={() => handleAssignClick(lead)}
                                                >
                                                    {lead.assignedTo ? 'Reassign' : 'Assign'}
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {pagination.totalPages > 1 && (
                        <div className="pagination">
                            <button
                                onClick={() => handlePageChange(pagination.page - 1)}
                                disabled={pagination.page === 1}
                            >
                                Previous
                            </button>
                            <span>
                                Page {pagination.page} of {pagination.totalPages}
                            </span>
                            <button
                                onClick={() => handlePageChange(pagination.page + 1)}
                                disabled={pagination.page === pagination.totalPages}
                            >
                                Next
                            </button>
                        </div>
                    )}
                </>
            )}

            {/* Assignment Modal */}
            {showAssignModal && (
                <div className="modal-overlay" onClick={() => setShowAssignModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2>
                            {selectedLeadForAssignment?.assignedTo ? 'Reassign' : 'Assign'} Lead
                        </h2>
                        <p>
                            <strong>Lead:</strong> {selectedLeadForAssignment?.name}
                        </p>
                        {selectedLeadForAssignment?.assignedTo && (
                            <p>
                                <strong>Currently assigned to:</strong>{' '}
                                {selectedLeadForAssignment.assignedTo.name}
                            </p>
                        )}
                        <div className="form-group">
                            <label>Select Executive:</label>
                            <select
                                value={selectedExecutive}
                                onChange={(e) => setSelectedExecutive(e.target.value)}
                            >
                                <option value="">-- Select Executive --</option>
                                {executives.map((exec) => (
                                    <option key={exec._id} value={exec._id}>
                                        {exec.name} ({exec.assignedLeadsCount} leads)
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="modal-actions">
                            <button
                                className="btn-primary"
                                onClick={handleAssignSubmit}
                                disabled={!selectedExecutive}
                            >
                                Confirm
                            </button>
                            <button
                                className="btn-secondary"
                                onClick={() => setShowAssignModal(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
