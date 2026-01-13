const Enquiry = require('../models/Enquiry');
const { sendStatusUpdateNotification } = require('../utils/emailService');

// @desc    Get assigned leads for executive
// @route   GET /api/executive/leads
// @access  Private (Executive, Employee)
exports.getAssignedLeads = async (req, res) => {
    try {
        const {
            status,
            productType,
            search,
            page = 1,
            limit = 10,
            sortBy = 'createdAt',
            sortOrder = 'desc',
        } = req.query;

        // Build filter - only assigned leads
        const filter = { assignedTo: req.user.id };

        if (status && status !== 'all') {
            filter.status = status;
        }

        if (productType && productType !== 'all') {
            filter.productType = productType;
        }

        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
                { phone: { $regex: search, $options: 'i' } },
            ];
        }

        // Calculate pagination
        const skip = (parseInt(page) - 1) * parseInt(limit);
        const sortOptions = { [sortBy]: sortOrder === 'desc' ? -1 : 1 };

        // Execute query
        const leads = await Enquiry.find(filter)
            .populate('userId', 'name email phone')
            .populate('assignedBy', 'name email')
            .sort(sortOptions)
            .skip(skip)
            .limit(parseInt(limit));

        const total = await Enquiry.countDocuments(filter);

        res.status(200).json({
            success: true,
            count: leads.length,
            total,
            totalPages: Math.ceil(total / parseInt(limit)),
            currentPage: parseInt(page),
            leads,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// @desc    Get lead details
// @route   GET /api/executive/leads/:id
// @access  Private (Executive, Employee)
exports.getLeadDetails = async (req, res) => {
    try {
        const lead = await Enquiry.findOne({
            _id: req.params.id,
            assignedTo: req.user.id,
        })
            .populate('userId', 'name email phone')
            .populate('assignedBy', 'name email')
            .populate('remarks.addedBy', 'name email')
            .populate('activityLog.performedBy', 'name email role');

        if (!lead) {
            return res.status(404).json({
                success: false,
                message: 'Lead not found or not assigned to you',
            });
        }

        res.status(200).json({
            success: true,
            lead,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// @desc    Update lead status
// @route   PUT /api/executive/leads/:id/status
// @access  Private (Executive, Employee)
exports.updateLeadStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const leadId = req.params.id;

        // Validate status
        const validStatuses = ['New', 'Contacted', 'Interested', 'Converted', 'Lost'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid status',
            });
        }

        // Find lead assigned to this executive
        const lead = await Enquiry.findOne({
            _id: leadId,
            assignedTo: req.user.id,
        });

        if (!lead) {
            return res.status(404).json({
                success: false,
                message: 'Lead not found or not assigned to you',
            });
        }

        const oldStatus = lead.status;

        // Validate status transition
        const validTransitions = {
            New: ['Contacted', 'Lost'],
            Contacted: ['Interested', 'Lost'],
            Interested: ['Converted', 'Lost'],
            Converted: [], // Final state
            Lost: [], // Final state
        };

        if (!validTransitions[oldStatus].includes(status)) {
            return res.status(400).json({
                success: false,
                message: `Cannot change status from ${oldStatus} to ${status}`,
            });
        }

        // Update status
        lead.status = status;

        // Add activity log
        lead.activityLog.push({
            action: 'status_changed',
            performedBy: req.user.id,
            timestamp: new Date(),
            details: {
                oldStatus,
                newStatus: status,
            },
        });

        await lead.save();

        // Send email notification to customer
        await sendStatusUpdateNotification(lead, status);

        await lead.populate('userId', 'name email phone');

        res.status(200).json({
            success: true,
            message: 'Status updated successfully',
            lead,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// @desc    Add remark to lead
// @route   POST /api/executive/leads/:id/remarks
// @access  Private (Executive, Employee)
exports.addRemark = async (req, res) => {
    try {
        const { text, type = 'note' } = req.body;
        const leadId = req.params.id;

        if (!text || text.trim() === '') {
            return res.status(400).json({
                success: false,
                message: 'Remark text is required',
            });
        }

        // Validate type
        const validTypes = ['note', 'call', 'email', 'meeting'];
        if (!validTypes.includes(type)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid remark type',
            });
        }

        // Find lead assigned to this executive
        const lead = await Enquiry.findOne({
            _id: leadId,
            assignedTo: req.user.id,
        });

        if (!lead) {
            return res.status(404).json({
                success: false,
                message: 'Lead not found or not assigned to you',
            });
        }

        // Add remark
        lead.remarks.push({
            text: text.trim(),
            type,
            addedBy: req.user.id,
            addedAt: new Date(),
        });

        // Add activity log
        lead.activityLog.push({
            action: 'remark_added',
            performedBy: req.user.id,
            timestamp: new Date(),
            details: {
                remarkType: type,
                remarkPreview: text.substring(0, 50),
            },
        });

        await lead.save();

        await lead.populate('remarks.addedBy', 'name email');

        res.status(200).json({
            success: true,
            message: 'Remark added successfully',
            lead,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// @desc    Get executive's statistics
// @route   GET /api/executive/stats
// @access  Private (Executive, Employee)
exports.getMyStats = async (req, res) => {
    try {
        const executiveId = req.user.id;

        // Total assigned leads
        const totalAssigned = await Enquiry.countDocuments({ assignedTo: executiveId });

        // Leads by status
        const statusCounts = await Enquiry.aggregate([
            { $match: { assignedTo: executiveId } },
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 },
                },
            },
        ]);

        const stats = {
            New: 0,
            Contacted: 0,
            Interested: 0,
            Converted: 0,
            Lost: 0,
        };

        statusCounts.forEach((item) => {
            stats[item._id] = item.count;
        });

        // Conversion rate
        const conversionRate =
            totalAssigned > 0 ? ((stats.Converted / totalAssigned) * 100).toFixed(2) : 0;

        // Recent activity (last 7 days)
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        const recentActivity = await Enquiry.countDocuments({
            assignedTo: executiveId,
            updatedAt: { $gte: sevenDaysAgo },
        });

        // Pending leads (New + Contacted + Interested)
        const pendingLeads = stats.New + stats.Contacted + stats.Interested;

        res.status(200).json({
            success: true,
            stats: {
                totalAssigned,
                statusCounts: stats,
                conversionRate: parseFloat(conversionRate),
                recentActivity,
                pendingLeads,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
