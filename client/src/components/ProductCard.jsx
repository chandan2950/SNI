import React from 'react';

const ProductCard = ({ product, onViewDetails }) => {
    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            {/* Product Header */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
                {product.discount > 0 && (
                    <span className="inline-block bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-sm font-semibold">
                        {product.discount}% OFF
                    </span>
                )}
            </div>

            {/* Product Body */}
            <div className="p-6">
                <p className="text-gray-600 mb-4">{product.description}</p>

                {/* Features */}
                {product.features && product.features.length > 0 && (
                    <div className="mb-4">
                        <h4 className="font-semibold text-gray-800 mb-2">Key Features:</h4>
                        <ul className="space-y-2">
                            {product.features.slice(0, 3).map((feature, index) => (
                                <li key={index} className="flex items-start space-x-2">
                                    <span className="text-green-500 mt-1">✓</span>
                                    <span className="text-gray-700 text-sm">{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Action Button */}
                <button
                    onClick={() => onViewDetails(product)}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold mt-4"
                >
                    View Details & Get Quote
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
