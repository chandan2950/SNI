const express = require('express');
const {
    submitEnquiry,
    getEnquiries,
    getEnquiry,
    updateEnquiryStatus,
    getMyEnquiries,
} = require('../controllers/enquiryController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.post('/', submitEnquiry);
router.get('/my', protect, getMyEnquiries);
router.get('/', protect, authorize('employee', 'management'), getEnquiries);
router.get('/:id', protect, authorize('employee', 'management'), getEnquiry);
router.put(
    '/:id',
    protect,
    authorize('employee', 'management'),
    updateEnquiryStatus
);

module.exports = router;
