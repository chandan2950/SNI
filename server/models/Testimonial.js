const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: [true, 'Please provide customer name'],
        trim: true,
    },
    customerImage: {
        type: String,
        default: 'default-avatar.png',
    },
    rating: {
        type: Number,
        required: [true, 'Please provide a rating'],
        min: 1,
        max: 5,
    },
    review: {
        type: String,
        required: [true, 'Please provide a review'],
        maxlength: 500,
    },
    isApproved: {
        type: Boolean,
        default: false,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Testimonial', testimonialSchema);
