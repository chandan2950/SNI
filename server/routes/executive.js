const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
    getAssignedLeads,
    getLeadDetails,
    updateLeadStatus,
    addRemark,
    getMyStats,
} = require('../controllers/executiveController');

// All routes require authentication and executive/employee role
router.use(protect);
router.use(authorize('executive', 'employee'));

// Lead management routes
router.get('/leads', getAssignedLeads);
router.get('/leads/:id', getLeadDetails);
router.put('/leads/:id/status', updateLeadStatus);
router.post('/leads/:id/remarks', addRemark);

// Statistics
router.get('/stats', getMyStats);

module.exports = router;
