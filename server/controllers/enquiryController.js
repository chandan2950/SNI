const Enquiry = require('../models/Enquiry');
const {
    sendEnquiryConfirmation,
    sendAdminNotification,
} = require('../utils/emailService');

// @desc    Submit enquiry
// @route   POST /api/enquiries
// @access  Public
exports.submitEnquiry = async (req, res) => {
    try {
        const { name, email, phone, productType, message } = req.body;

        const enquiry = await Enquiry.create({
            name,
            email,
            phone,
            productType,
            message,
            userId: req.user ? req.user.id : null,
        });

        // Send confirmation email to customer
        await sendEnquiryConfirmation(email, name, productType);

        // Send notification to admin
        await sendAdminNotification({ name, email, phone, productType, message });

        res.status(201).json({
            success: true,
            message: 'Enquiry submitted successfully',
            enquiry,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// @desc    Get all enquiries
// @route   GET /api/enquiries
// @access  Private (Employee, Management)
exports.getEnquiries = async (req, res) => {
    try {
        const { status } = req.query;
        const filter = status ? { status } : {};

        const enquiries = await Enquiry.find(filter)
            .populate('userId', 'name email phone')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: enquiries.length,
            enquiries,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// @desc    Get single enquiry
// @route   GET /api/enquiries/:id
// @access  Private (Employee, Management)
exports.getEnquiry = async (req, res) => {
    try {
        const enquiry = await Enquiry.findById(req.params.id).populate(
            'userId',
            'name email phone'
        );

        if (!enquiry) {
            return res.status(404).json({
                success: false,
                message: 'Enquiry not found',
            });
        }

        res.status(200).json({
            success: true,
            enquiry,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// @desc    Update enquiry status
// @route   PUT /api/enquiries/:id
// @access  Private (Employee, Management)
exports.updateEnquiryStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const enquiry = await Enquiry.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true, runValidators: true }
        );

        if (!enquiry) {
            return res.status(404).json({
                success: false,
                message: 'Enquiry not found',
            });
        }

        res.status(200).json({
            success: true,
            enquiry,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// @desc    Get user's enquiries
// @route   GET /api/enquiries/my
// @access  Private
exports.getMyEnquiries = async (req, res) => {
    try {
        const enquiries = await Enquiry.find({ userId: req.user.id }).sort({
            createdAt: -1,
        });

        res.status(200).json({
            success: true,
            count: enquiries.length,
            enquiries,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
