const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide your name'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please provide a valid email',
        ],
    },
    phone: {
        type: String,
        required: [true, 'Please provide your phone number'],
    },
    productType: {
        type: String,
        required: [true, 'Please select a product type'],
    },
    message: {
        type: String,
        default: '',
    },
    status: {
        type: String,
        enum: ['New', 'Contacted', 'Interested', 'Converted', 'Lost'],
        default: 'New',
    },
    // CRM Assignment Fields
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null,
    },
    assignedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null,
    },
    assignedAt: {
        type: Date,
        default: null,
    },
    // IRDA Compliance - Consent Management
    consent: {
        given: {
            type: Boolean,
            required: [true, 'Consent is required'],
            default: false,
        },
        timestamp: {
            type: Date,
            default: Date.now,
        },
        ipAddress: {
            type: String,
            default: null,
        },
        privacyPolicyVersion: {
            type: String,
            default: '1.0',
        },
    },
    // Remarks/Notes System
    remarks: [
        {
            text: {
                type: String,
                required: true,
            },
            type: {
                type: String,
                enum: ['note', 'call', 'email', 'meeting'],
                default: 'note',
            },
            addedBy: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true,
            },
            addedAt: {
                type: Date,
                default: Date.now,
            },
        },
    ],
    // Activity Log for Audit Trail
    activityLog: [
        {
            action: {
                type: String,
                required: true,
                // Examples: 'created', 'assigned', 'status_changed', 'remark_added', 'reassigned'
            },
            performedBy: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                default: null,
            },
            timestamp: {
                type: Date,
                default: Date.now,
            },
            details: {
                type: mongoose.Schema.Types.Mixed,
                default: {},
            },
        },
    ],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

// Indexes for performance optimization
enquirySchema.index({ assignedTo: 1 });
enquirySchema.index({ status: 1 });
enquirySchema.index({ createdAt: -1 });
enquirySchema.index({ assignedTo: 1, status: 1 });

// Update the updatedAt field before saving
enquirySchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

// Add initial activity log entry when creating new enquiry
enquirySchema.pre('save', function (next) {
    if (this.isNew) {
        this.activityLog.push({
            action: 'created',
            performedBy: this.userId || null,
            timestamp: new Date(),
            details: {
                productType: this.productType,
                status: this.status,
            },
        });
    }
    next();
});

module.exports = mongoose.model('Enquiry', enquirySchema);
