import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchLeads,
    fetchStats,
    fetchLeadDetails,
    updateLeadStatus,
    addRemark,
    setFilters,
    clearSelectedLead,
} from '../redux/slices/leadsSlice';
import StatusBadge from '../components/StatusBadge';
import './ExecutiveDashboard.css';

const ExecutiveDashboard = () => {
    const dispatch = useDispatch();
    const { leads, loading, error, filters, stats, selectedLead } = useSelector(
        (state) => state.leads
    );
    const [showLeadModal, setShowLeadModal] = useState(false);
    const [remarkText, setRemarkText] = useState('');
    const [remarkType, setRemarkType] = useState('note');
    const [newStatus, setNewStatus] = useState('');

    useEffect(() => {
        dispatch(fetchStats(true));
        dispatch(fetchLeads({ filters, pagination: { page: 1, limit: 100 }, isExecutive: true }));
    }, [dispatch, filters]);

    const handleLeadClick = async (lead) => {
        await dispatch(fetchLeadDetails({ leadId: lead._id, isExecutive: true }));
        setNewStatus(lead.status);
        setShowLeadModal(true);
    };

    const handleStatusUpdate = async () => {
        if (selectedLead && newStatus && newStatus !== selectedLead.status) {
            await dispatch(updateLeadStatus({ leadId: selectedLead._id, status: newStatus }));
            dispatch(fetchLeads({ filters, pagination: { page: 1, limit: 100 }, isExecutive: true }));
            dispatch(fetchStats(true));
        }
    };

    const handleAddRemark = async () => {
        if (selectedLead && remarkText.trim()) {
            await dispatch(
                addRemark({ leadId: selectedLead._id, text: remarkText, type: remarkType })
            );
            setRemarkText('');
            setRemarkType('note');
            dispatch(fetchLeadDetails({ leadId: selectedLead._id, isExecutive: true }));
        }
    };

    const handleCloseModal = () => {
        setShowLeadModal(false);
        dispatch(clearSelectedLead());
        setRemarkText('');
        setRemarkType('note');
    };

    const getValidNextStatuses = (currentStatus) => {
        const transitions = {
            New: ['Contacted', 'Lost'],
            Contacted: ['Interested', 'Lost'],
            Interested: ['Converted', 'Lost'],
            Converted: [],
            Lost: [],
        };
        return transitions[currentStatus] || [];
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diff = now - date;
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const days = Math.floor(hours / 24);

        if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
        if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        return 'Just now';
    };

    const filteredLeads = leads.filter((lead) => {
        if (filters.status === 'all') return true;
        return lead.status === filters.status;
    });

    return (
        <div className="executive-dashboard">
            <div className="dashboard-header">
                <h1>My Dashboard</h1>
                <p>Manage your assigned leads</p>
            </div>

            {/* Statistics Cards */}
            <div className="stats-grid">
                <div className="stat-card stat-assigned">
                    <h3>Total Assigned</h3>
                    <p className="stat-number">{stats.totalAssigned || 0}</p>
                </div>
                <div className="stat-card stat-pending">
                    <h3>Pending</h3>
                    <p className="stat-number">{stats.pendingLeads || 0}</p>
                </div>
                <div className="stat-card stat-converted">
                    <h3>Converted</h3>
                    <p className="stat-number">{stats.statusCounts?.Converted || 0}</p>
                </div>
                <div className="stat-card stat-conversion">
                    <h3>Conversion Rate</h3>
                    <p className="stat-number">{stats.conversionRate || 0}%</p>
                </div>
            </div>

            {/* Status Filter Tabs */}
            <div className="status-tabs">
                <button
                    className={filters.status === 'all' ? 'tab active' : 'tab'}
                    onClick={() => dispatch(setFilters({ status: 'all' }))}
                >
                    All ({leads.length})
                </button>
                <button
                    className={filters.status === 'New' ? 'tab active' : 'tab'}
                    onClick={() => dispatch(setFilters({ status: 'New' }))}
                >
                    New ({stats.statusCounts?.New || 0})
                </button>
                <button
                    className={filters.status === 'Contacted' ? 'tab active' : 'tab'}
                    onClick={() => dispatch(setFilters({ status: 'Contacted' }))}
                >
                    Contacted ({stats.statusCounts?.Contacted || 0})
                </button>
                <button
                    className={filters.status === 'Interested' ? 'tab active' : 'tab'}
                    onClick={() => dispatch(setFilters({ status: 'Interested' }))}
                >
                    Interested ({stats.statusCounts?.Interested || 0})
                </button>
            </div>

            {/* Error Message */}
            {error && <div className="error-message">{error}</div>}

            {/* Leads Grid */}
            {loading ? (
                <div className="loading">Loading leads...</div>
            ) : (
                <div className="leads-grid">
                    {filteredLeads.length === 0 ? (
                        <div className="empty-state">
                            <p>No leads found</p>
                        </div>
                    ) : (
                        filteredLeads.map((lead) => (
                            <div
                                key={lead._id}
                                className="lead-card"
                                onClick={() => handleLeadClick(lead)}
                            >
                                <div className="lead-card-header">
                                    <h3>{lead.name}</h3>
                                    <StatusBadge status={lead.status} />
                                </div>
                                <div className="lead-card-body">
                                    <p>
                                        <strong>Product:</strong> {lead.productType}
                                    </p>
                                    <p>
                                        <strong>Email:</strong> {lead.email}
                                    </p>
                                    <p>
                                        <strong>Phone:</strong> {lead.phone}
                                    </p>
                                    <p className="lead-date">
                                        Created {formatDate(lead.createdAt)}
                                    </p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}

            {/* Lead Detail Modal */}
            {showLeadModal && selectedLead && (
                <div className="modal-overlay" onClick={handleCloseModal}>
                    <div className="modal-content lead-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Lead Details</h2>
                            <button className="close-btn" onClick={handleCloseModal}>
                                ×
                            </button>
                        </div>

                        {/* Customer Information */}
                        <div className="section">
                            <h3>Customer Information</h3>
                            <div className="info-grid">
                                <div>
                                    <strong>Name:</strong> {selectedLead.name}
                                </div>
                                <div>
                                    <strong>Email:</strong>{' '}
                                    <a href={`mailto:${selectedLead.email}`}>
                                        {selectedLead.email}
                                    </a>
                                </div>
                                <div>
                                    <strong>Phone:</strong>{' '}
                                    <a href={`tel:${selectedLead.phone}`}>{selectedLead.phone}</a>
                                </div>
                                <div>
                                    <strong>Product:</strong> {selectedLead.productType}
                                </div>
                            </div>
                            {selectedLead.message && (
                                <div className="message-box">
                                    <strong>Message:</strong>
                                    <p>{selectedLead.message}</p>
                                </div>
                            )}
                        </div>

                        {/* Status Update */}
                        <div className="section">
                            <h3>Update Status</h3>
                            <div className="status-update">
                                <select
                                    value={newStatus}
                                    onChange={(e) => setNewStatus(e.target.value)}
                                >
                                    <option value={selectedLead.status}>
                                        {selectedLead.status} (Current)
                                    </option>
                                    {getValidNextStatuses(selectedLead.status).map((status) => (
                                        <option key={status} value={status}>
                                            {status}
                                        </option>
                                    ))}
                                </select>
                                <button
                                    onClick={handleStatusUpdate}
                                    disabled={newStatus === selectedLead.status}
                                    className="update-btn"
                                >
                                    Update
                                </button>
                            </div>
                        </div>

                        {/* Add Remark */}
                        <div className="section">
                            <h3>Add Remark</h3>
                            <div className="remark-form">
                                <select
                                    value={remarkType}
                                    onChange={(e) => setRemarkType(e.target.value)}
                                >
                                    <option value="note">Note</option>
                                    <option value="call">Call</option>
                                    <option value="email">Email</option>
                                    <option value="meeting">Meeting</option>
                                </select>
                                <textarea
                                    value={remarkText}
                                    onChange={(e) => setRemarkText(e.target.value)}
                                    placeholder="Add your remark here..."
                                    rows="3"
                                />
                                <button
                                    onClick={handleAddRemark}
                                    disabled={!remarkText.trim()}
                                    className="add-remark-btn"
                                >
                                    Add Remark
                                </button>
                            </div>
                        </div>

                        {/* Remarks History */}
                        {selectedLead.remarks && selectedLead.remarks.length > 0 && (
                            <div className="section">
                                <h3>Remarks History</h3>
                                <div className="remarks-list">
                                    {selectedLead.remarks
                                        .slice()
                                        .reverse()
                                        .map((remark, index) => (
                                            <div key={index} className="remark-item">
                                                <div className="remark-header">
                                                    <span className={`remark-type ${remark.type}`}>
                                                        {remark.type}
                                                    </span>
                                                    <span className="remark-date">
                                                        {formatDate(remark.addedAt)}
                                                    </span>
                                                </div>
                                                <p>{remark.text}</p>
                                                <small>
                                                    By {remark.addedBy?.name || 'Unknown'}
                                                </small>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        )}

                        {/* Activity Timeline */}
                        {selectedLead.activityLog && selectedLead.activityLog.length > 0 && (
                            <div className="section">
                                <h3>Activity Timeline</h3>
                                <div className="activity-timeline">
                                    {selectedLead.activityLog
                                        .slice()
                                        .reverse()
                                        .map((activity, index) => (
                                            <div key={index} className="activity-item">
                                                <div className="activity-dot"></div>
                                                <div className="activity-content">
                                                    <strong>{activity.action.replace('_', ' ')}</strong>
                                                    <span className="activity-time">
                                                        {formatDate(activity.timestamp)}
                                                    </span>
                                                    {activity.details && (
                                                        <p className="activity-details">
                                                            {JSON.stringify(activity.details)}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ExecutiveDashboard;
