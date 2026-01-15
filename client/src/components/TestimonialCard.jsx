import React from 'react';

const TestimonialCard = ({ testimonial }) => {
    // Render star rating
    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, index) => (
            <span
                key={index}
                className={`text-xl ${index < rating ? 'text-yellow-400' : 'text-gray-300'
                    }`}
            >
                ★
            </span>
        ));
    };

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            {/* Rating */}
            <div className="flex mb-4">{renderStars(testimonial.rating || 5)}</div>

            {/* Testimonial Text */}
            <p className="text-gray-700 mb-6 italic">"{testimonial.message}"</p>

            {/* Customer Info */}
            <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {testimonial.customerName?.charAt(0) || 'U'}
                </div>
                <div>
                    <h4 className="font-semibold text-gray-800">
                        {testimonial.customerName || 'Anonymous'}
                    </h4>
                    {testimonial.location && (
                        <p className="text-sm text-gray-500">{testimonial.location}</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TestimonialCard;
