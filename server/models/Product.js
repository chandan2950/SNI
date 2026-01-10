const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a product name'],
        trim: true,
    },
    category: {
        type: String,
        required: [true, 'Please provide a category'],
        enum: [
            'term-life',
            'health',
            'investment',
            'car',
            'bike',
            'family-health',
            'travel',
            'home',
            'child-savings',
            'retirement',
        ],
    },
    description: {
        type: String,
        required: [true, 'Please provide a description'],
    },
    features: [
        {
            type: String,
        },
    ],
    icon: {
        type: String,
        default: 'default-icon.svg',
    },
    discount: {
        type: Number,
        default: 0,
        min: 0,
        max: 100,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Product', productSchema);
