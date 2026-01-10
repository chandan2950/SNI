const express = require('express');
const {
    getTestimonials,
    submitTestimonial,
    getAllTestimonials,
    approveTestimonial,
    deleteTestimonial,
} = require('../controllers/testimonialController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/', getTestimonials);
router.post('/', protect, submitTestimonial);
router.get('/all', protect, authorize('management'), getAllTestimonials);
router.put('/:id/approve', protect, authorize('management'), approveTestimonial);
router.delete('/:id', protect, authorize('management'), deleteTestimonial);

module.exports = router;
