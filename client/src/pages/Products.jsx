import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { fetchAllProducts, setSelectedCategory } from '../redux/slices/productSlice';
import { INSURANCE_CATEGORIES } from '../utils/constants';
import ProductCard from '../components/ProductCard';
import Loading from '../components/Loading';
import EnquiryForm from '../components/EnquiryForm';

const Products = () => {
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const { filteredProducts, isLoading, selectedCategory } = useSelector(
        (state) => state.products
    );
    const [showEnquiryModal, setShowEnquiryModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        dispatch(fetchAllProducts());
        const category = searchParams.get('category');
        if (category) {
            dispatch(setSelectedCategory(category));
        }
    }, [dispatch, searchParams]);

    const handleCategoryFilter = (categoryId) => {
        dispatch(setSelectedCategory(categoryId));
    };

    const handleViewDetails = (product) => {
        setSelectedProduct(product);
        setShowEnquiryModal(true);
    };

    const handleCloseModal = () => {
        setShowEnquiryModal(false);
        setSelectedProduct(null);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Browse Insurance Products
                    </h1>
                    <p className="text-xl text-blue-100">
                        Find the perfect insurance plan for your needs
                    </p>
                </div>
            </section>

            {/* Category Filter */}
            <section className="bg-white shadow-md sticky top-16 z-40 py-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center space-x-4 overflow-x-auto pb-2">
                        <button
                            onClick={() => handleCategoryFilter(null)}
                            className={`px-6 py-2 rounded-full font-semibold whitespace-nowrap transition-all ${!selectedCategory
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            All Products
                        </button>
                        {INSURANCE_CATEGORIES.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => handleCategoryFilter(category.id)}
                                className={`px-6 py-2 rounded-full font-semibold whitespace-nowrap transition-all ${selectedCategory === category.id
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                {category.icon} {category.name}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Products Grid */}
            <section className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {isLoading ? (
                        <div className="flex justify-center py-20">
                            <Loading size="large" />
                        </div>
                    ) : filteredProducts && filteredProducts.length > 0 ? (
                        <>
                            <div className="mb-6">
                                <h2 className="text-2xl font-bold text-gray-800">
                                    {selectedCategory
                                        ? `${INSURANCE_CATEGORIES.find((c) => c.id === selectedCategory)
                                            ?.name
                                        } Plans`
                                        : 'All Insurance Plans'}
                                </h2>
                                <p className="text-gray-600 mt-1">
                                    {filteredProducts.length} plan(s) available
                                </p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredProducts.map((product) => (
                                    <ProductCard
                                        key={product._id || product.id}
                                        product={product}
                                        onViewDetails={handleViewDetails}
                                    />
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="text-center py-20">
                            <div className="text-6xl mb-4">📋</div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">
                                No Products Found
                            </h3>
                            <p className="text-gray-600 mb-6">
                                {selectedCategory
                                    ? 'No products available in this category yet.'
                                    : 'No products available at the moment.'}
                            </p>
                            {selectedCategory && (
                                <button
                                    onClick={() => handleCategoryFilter(null)}
                                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                                >
                                    View All Products
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </section>

            {/* Enquiry Modal */}
            {showEnquiryModal && selectedProduct && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-800">
                                        {selectedProduct.name}
                                    </h2>
                                    <p className="text-gray-600 mt-1">
                                        {selectedProduct.description}
                                    </p>
                                </div>
                                <button
                                    onClick={handleCloseModal}
                                    className="text-gray-500 hover:text-gray-700 text-2xl"
                                >
                                    ×
                                </button>
                            </div>
                            <EnquiryForm
                                productId={selectedProduct._id || selectedProduct.id}
                                productName={selectedProduct.name}
                                onSuccess={handleCloseModal}
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* CTA Section */}
            <section className="bg-gradient-to-r from-orange-500 to-red-600 text-white py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Can't Find What You're Looking For?
                    </h2>
                    <p className="text-xl mb-8 text-orange-100">
                        Our insurance experts are here to help you find the perfect plan
                    </p>
                    <a
                        href="tel:18001234567"
                        className="inline-block bg-white text-orange-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-orange-50 transition-colors shadow-lg"
                    >
                        📞 Call 1800-123-4567
                    </a>
                </div>
            </section>
        </div>
    );
};

export default Products;
