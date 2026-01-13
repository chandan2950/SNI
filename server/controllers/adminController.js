const Enquiry = require('../models/Enquiry');
const User = require('../models/User');
const { sendLeadAssignmentNotification } = require('../utils/emailService');

// @desc    Get all leads with filters and pagination
// @route   GET /api/admin/leads
// @access  Private (Admin, Management)
exports.getAllLeads = async (req, res) => {
    try {
        const {
            status,
            assignedTo,
            productType,
            startDate,
            endDate,
            search,
            page = 1,
            limit = 10,
            sortBy = 'createdAt',
            sortOrder = 'desc',
        } = req.query;

        // Build filter object
        const filter = {};

        if (status && status !== 'all') {
            filter.status = status;
        }

        if (assignedTo && assignedTo !== 'all') {
            if (assignedTo === 'unassigned') {
                filter.assignedTo = null;
            } else {
                filter.assignedTo = assignedTo;
            }
        }

        if (productType && productType !== 'all') {
            filter.productType = productType;
        }

        if (startDate || endDate) {
            filter.createdAt = {};
            if (startDate) filter.createdAt.$gte = new Date(startDate);
            if (endDate) filter.createdAt.$lte = new Date(endDate);
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
            .populate('assignedTo', 'name email')
            .populate('assignedBy', 'name email')
            .populate('userId', 'name email phone')
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

// @desc    Assign lead to executive
// @route   POST /api/admin/leads/:id/assign
// @access  Private (Admin, Management)
exports.assignLead = async (req, res) => {
    try {
        const { executiveId } = req.body;
        const leadId = req.params.id;

        // Validate lead exists
        const lead = await Enquiry.findById(leadId);
        if (!lead) {
            return res.status(404).json({
                success: false,
                message: 'Lead not found',
            });
        }

        // Validate executive exists and has correct role
        const executive = await User.findById(executiveId);
        if (!executive) {
            return res.status(404).json({
                success: false,
                message: 'Executive not found',
            });
        }

        if (!['executive', 'employee'].includes(executive.role)) {
            return res.status(400).json({
                success: false,
                message: 'User is not an executive',
            });
        }

        // Update lead
        lead.assignedTo = executiveId;
        lead.assignedBy = req.user.id;
        lead.assignedAt = new Date();

        // Add activity log
        lead.activityLog.push({
            action: 'assigned',
            performedBy: req.user.id,
            timestamp: new Date(),
            details: {
                assignedTo: executive.name,
                assignedToId: executiveId,
            },
        });

        await lead.save();

        // Send email notification to executive
        await sendLeadAssignmentNotification(executive, lead);

        // Populate for response
        await lead.populate('assignedTo', 'name email');
        await lead.populate('assignedBy', 'name email');

        res.status(200).json({
            success: true,
            message: 'Lead assigned successfully',
            lead,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// @desc    Reassign lead to different executive
// @route   PUT /api/admin/leads/:id/reassign
// @access  Private (Admin, Management)
exports.reassignLead = async (req, res) => {
    try {
        const { executiveId } = req.body;
        const leadId = req.params.id;

        const lead = await Enquiry.findById(leadId).populate('assignedTo', 'name email');
        if (!lead) {
            return res.status(404).json({
                success: false,
                message: 'Lead not found',
            });
        }

        const oldExecutive = lead.assignedTo;

        // Validate new executive
        const newExecutive = await User.findById(executiveId);
        if (!newExecutive || !['executive', 'employee'].includes(newExecutive.role)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid executive',
            });
        }

        // Update lead
        lead.assignedTo = executiveId;
        lead.assignedBy = req.user.id;
        lead.assignedAt = new Date();

        // Add activity log
        lead.activityLog.push({
            action: 'reassigned',
            performedBy: req.user.id,
            timestamp: new Date(),
            details: {
                from: oldExecutive ? oldExecutive.name : 'Unassigned',
                to: newExecutive.name,
                fromId: oldExecutive ? oldExecutive._id : null,
                toId: executiveId,
            },
        });

        await lead.save();

        // Send notification to new executive
        await sendLeadAssignmentNotification(newExecutive, lead);

        await lead.populate('assignedTo', 'name email');
        await lead.populate('assignedBy', 'name email');

        res.status(200).json({
            success: true,
            message: 'Lead reassigned successfully',
            lead,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// @desc    Get dashboard statistics
// @route   GET /api/admin/dashboard/stats
// @access  Private (Admin, Management)
exports.getDashboardStats = async (req, res) => {
    try {
        // Get counts by status
        const statusCounts = await Enquiry.aggregate([
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 },
                },
            },
        ]);

        // Format status counts
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

        // Total leads
        const totalLeads = await Enquiry.countDocuments();

        // Assigned vs Unassigned
        const assignedCount = await Enquiry.countDocuments({ assignedTo: { $ne: null } });
        const unassignedCount = totalLeads - assignedCount;

        // Conversion rate
        const conversionRate = totalLeads > 0 ? ((stats.Converted / totalLeads) * 100).toFixed(2) : 0;

        // Recent leads (last 7 days)
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        const recentLeads = await Enquiry.countDocuments({
            createdAt: { $gte: sevenDaysAgo },
        });

        // Top executives by conversion
        const topExecutives = await Enquiry.aggregate([
            {
                $match: { status: 'Converted', assignedTo: { $ne: null } },
            },
            {
                $group: {
                    _id: '$assignedTo',
                    conversions: { $sum: 1 },
                },
            },
            {
                $sort: { conversions: -1 },
            },
            {
                $limit: 5,
            },
            {
                $lookup: {
                    from: 'users',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'executive',
                },
            },
            {
                $unwind: '$executive',
            },
            {
                $project: {
                    name: '$executive.name',
                    email: '$executive.email',
                    conversions: 1,
                },
            },
        ]);

        res.status(200).json({
            success: true,
            stats: {
                statusCounts: stats,
                totalLeads,
                assignedCount,
                unassignedCount,
                conversionRate: parseFloat(conversionRate),
                recentLeads,
                topExecutives,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// @desc    Export leads as CSV
// @route   GET /api/admin/leads/export
// @access  Private (Admin, Management)
exports.exportLeads = async (req, res) => {
    try {
        const { status, assignedTo, productType, startDate, endDate } = req.query;

        // Build filter (same as getAllLeads)
        const filter = {};
        if (status && status !== 'all') filter.status = status;
        if (assignedTo && assignedTo !== 'all') {
            filter.assignedTo = assignedTo === 'unassigned' ? null : assignedTo;
        }
        if (productType && productType !== 'all') filter.productType = productType;
        if (startDate || endDate) {
            filter.createdAt = {};
            if (startDate) filter.createdAt.$gte = new Date(startDate);
            if (endDate) filter.createdAt.$lte = new Date(endDate);
        }

        const leads = await Enquiry.find(filter)
            .populate('assignedTo', 'name email')
            .populate('assignedBy', 'name email')
            .sort({ createdAt: -1 });

        // Convert to CSV
        const csvHeader = 'Name,Email,Phone,Product Type,Status,Assigned To,Assigned By,Created At,Consent Given\n';
        const csvRows = leads.map((lead) => {
            return [
                lead.name,
                lead.email,
                lead.phone,
                lead.productType,
                lead.status,
                lead.assignedTo ? lead.assignedTo.name : 'Unassigned',
                lead.assignedBy ? lead.assignedBy.name : 'N/A',
                new Date(lead.createdAt).toLocaleDateString(),
                lead.consent.given ? 'Yes' : 'No',
            ].join(',');
        });

        const csv = csvHeader + csvRows.join('\n');

        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=leads.csv');
        res.status(200).send(csv);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// @desc    Get activity log
// @route   GET /api/admin/activity-log
// @access  Private (Admin, Management)
exports.getActivityLog = async (req, res) => {
    try {
        const { page = 1, limit = 20, action, startDate, endDate } = req.query;

        const filter = {};
        if (startDate || endDate) {
            filter.createdAt = {};
            if (startDate) filter.createdAt.$gte = new Date(startDate);
            if (endDate) filter.createdAt.$lte = new Date(endDate);
        }

        const leads = await Enquiry.find(filter)
            .select('activityLog name email')
            .populate('activityLog.performedBy', 'name email role')
            .sort({ 'activityLog.timestamp': -1 })
            .limit(parseInt(limit));

        // Flatten activity logs
        let activities = [];
        leads.forEach((lead) => {
            lead.activityLog.forEach((activity) => {
                if (!action || activity.action === action) {
                    activities.push({
                        leadName: lead.name,
                        leadEmail: lead.email,
                        leadId: lead._id,
                        ...activity.toObject(),
                    });
                }
            });
        });

        // Sort by timestamp
        activities.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

        // Paginate
        const skip = (parseInt(page) - 1) * parseInt(limit);
        const paginatedActivities = activities.slice(skip, skip + parseInt(limit));

        res.status(200).json({
            success: true,
            count: paginatedActivities.length,
            total: activities.length,
            activities: paginatedActivities,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// @desc    Get list of executives for assignment
// @route   GET /api/admin/executives
// @access  Private (Admin, Management)
exports.getExecutives = async (req, res) => {
    try {
        const executives = await User.find({
            role: { $in: ['executive', 'employee'] },
            isActive: true,
        }).select('name email role');

        // Get assigned leads count for each executive
        const executivesWithCount = await Promise.all(
            executives.map(async (exec) => {
                const assignedCount = await Enquiry.countDocuments({
                    assignedTo: exec._id,
                    status: { $nin: ['Converted', 'Lost'] },
                });

                return {
                    _id: exec._id,
                    name: exec.name,
                    email: exec.email,
                    role: exec.role,
                    assignedLeadsCount: assignedCount,
                };
            })
        );

        res.status(200).json({
            success: true,
            data: executivesWithCount,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

