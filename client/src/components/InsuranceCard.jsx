import React from 'react';
import { useNavigate } from 'react-router-dom';

const InsuranceCard = ({ category }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        // Navigate to products page with category filter
        navigate(`/products?category=${category.id}`);
    };

    return (
        <div
            onClick={handleClick}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 border-2 border-transparent hover:border-blue-500 group"
        >
            <div className="flex flex-col items-center text-center space-y-3">
                {/* Icon - Medium size */}
                <div
                    className={`${category.color} w-16 h-16 rounded-xl flex items-center justify-center text-3xl transform transition-transform group-hover:scale-110 group-hover:rotate-3 shadow-md`}
                >
                    {category.icon}
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900">{category.name}</h3>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed">{category.description}</p>

                {/* Call to Action */}
                <div className="mt-2 w-full">
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-all group-hover:from-blue-700 group-hover:to-indigo-700 shadow-md">
                        View Plans →
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InsuranceCard;
