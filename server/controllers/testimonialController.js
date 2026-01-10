const Testimonial = require('../models/Testimonial');

// @desc    Get all approved testimonials
// @route   GET /api/testimonials
// @access  Public
exports.getTestimonials = async (req, res) => {
    try {
        const testimonials = await Testimonial.find({ isApproved: true })
            .populate('userId', 'name')
            .sort({ createdAt: -1 })
            .limit(10);

        res.status(200).json({
            success: true,
            count: testimonials.length,
            testimonials,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// @desc    Submit testimonial
// @route   POST /api/testimonials
// @access  Private
exports.submitTestimonial = async (req, res) => {
    try {
        const { customerName, customerImage, rating, review } = req.body;

        const testimonial = await Testimonial.create({
            customerName,
            customerImage,
            rating,
            review,
            userId: req.user.id,
        });

        res.status(201).json({
            success: true,
            message: 'Testimonial submitted successfully and pending approval',
            testimonial,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// @desc    Get all testimonials (including unapproved)
// @route   GET /api/testimonials/all
// @access  Private (Management)
exports.getAllTestimonials = async (req, res) => {
    try {
        const testimonials = await Testimonial.find()
            .populate('userId', 'name email')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: testimonials.length,
            testimonials,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// @desc    Approve testimonial
// @route   PUT /api/testimonials/:id/approve
// @access  Private (Management)
exports.approveTestimonial = async (req, res) => {
    try {
        const testimonial = await Testimonial.findByIdAndUpdate(
            req.params.id,
            { isApproved: true },
            { new: true }
        );

        if (!testimonial) {
            return res.status(404).json({
                success: false,
                message: 'Testimonial not found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Testimonial approved successfully',
            testimonial,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// @desc    Delete testimonial
// @route   DELETE /api/testimonials/:id
// @access  Private (Management)
exports.deleteTestimonial = async (req, res) => {
    try {
        const testimonial = await Testimonial.findByIdAndDelete(req.params.id);

        if (!testimonial) {
            return res.status(404).json({
                success: false,
                message: 'Testimonial not found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Testimonial deleted successfully',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
