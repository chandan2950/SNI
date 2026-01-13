const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
    getAllLeads,
    assignLead,
    reassignLead,
    getDashboardStats,
    exportLeads,
    getActivityLog,
    getExecutives,
} = require('../controllers/adminController');

// All routes require authentication and admin/management role
router.use(protect);
router.use(authorize('admin', 'management'));

// Lead management routes
router.get('/leads', getAllLeads);
router.post('/leads/:id/assign', assignLead);
router.put('/leads/:id/reassign', reassignLead);
router.get('/leads/export', exportLeads);

// Dashboard and statistics
router.get('/dashboard/stats', getDashboardStats);

// Activity log
router.get('/activity-log', getActivityLog);

// Get executives list
router.get('/executives', getExecutives);

module.exports = router;
