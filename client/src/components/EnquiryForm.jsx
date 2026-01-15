import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { submitEnquiry } from '../redux/slices/enquirySlice';
import { isValidEmail, isValidPhone } from '../utils/helpers';

const EnquiryForm = ({ productId, productName, onSuccess }) => {
    const dispatch = useDispatch();
    const { isSubmitting, error, successMessage } = useSelector(
        (state) => state.enquiries
    );
    const { user, isAuthenticated } = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        name: isAuthenticated ? user?.name || '' : '',
        email: isAuthenticated ? user?.email || '' : '',
        phone: isAuthenticated ? user?.phone || '' : '',
        message: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        // Clear error for this field
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: '' }));
        }
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!isValidEmail(formData.email)) {
            newErrors.email = 'Invalid email format';
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        } else if (!isValidPhone(formData.phone)) {
            newErrors.phone = 'Invalid phone number (10 digits required)';
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) return;

        const enquiryData = {
            ...formData,
            productId,
            productName,
        };

        const result = await dispatch(submitEnquiry(enquiryData));

        if (result.type === 'enquiries/submit/fulfilled') {
            // Reset form
            setFormData({
                name: isAuthenticated ? user?.name || '' : '',
                email: isAuthenticated ? user?.email || '' : '',
                phone: isAuthenticated ? user?.phone || '' : '',
                message: '',
            });

            if (onSuccess) {
                onSuccess();
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Get a Quote for {productName || 'Insurance'}
            </h3>

            {/* Success Message */}
            {successMessage && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                    {successMessage}
                </div>
            )}

            {/* Error Message */}
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error}
                </div>
            )}

            {/* Name */}
            <div>
                <label className="block text-gray-700 font-medium mb-2">Name</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.name ? 'border-red-500' : 'border-gray-300'
                        }`}
                    placeholder="Your full name"
                />
                {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
            </div>

            {/* Email */}
            <div>
                <label className="block text-gray-700 font-medium mb-2">Email</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                    placeholder="your.email@example.com"
                />
                {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
            </div>

            {/* Phone */}
            <div>
                <label className="block text-gray-700 font-medium mb-2">Phone</label>
                <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.phone ? 'border-red-500' : 'border-gray-300'
                        }`}
                    placeholder="9876543210"
                />
                {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
            </div>

            {/* Message */}
            <div>
                <label className="block text-gray-700 font-medium mb-2">Message</label>
                <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.message ? 'border-red-500' : 'border-gray-300'
                        }`}
                    placeholder="Tell us about your requirements..."
                ></textarea>
                {errors.message && (
                    <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                )}
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
                {isSubmitting ? 'Submitting...' : 'Submit Enquiry'}
            </button>
        </form>
    );
};

export default EnquiryForm;
