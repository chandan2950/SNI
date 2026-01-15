import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import InsuranceCard from '../components/InsuranceCard';
import TestimonialCard from '../components/TestimonialCard';
import ProductCard from '../components/ProductCard';
import { INSURANCE_CATEGORIES } from '../utils/constants';
import { fetchActiveTestimonials } from '../redux/slices/testimonialSlice';
import { fetchAllProducts } from '../redux/slices/productSlice';
import Loading from '../components/Loading';
import EnquiryForm from '../components/EnquiryForm';

const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { testimonials, isLoading: testimonialsLoading } = useSelector((state) => state.testimonials);
    const { products, isLoading: productsLoading } = useSelector((state) => state.products);
    const [showEnquiryModal, setShowEnquiryModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        dispatch(fetchActiveTestimonials());
        dispatch(fetchAllProducts());
    }, [dispatch]);

    const handleViewDetails = (product) => {
        setSelectedProduct(product);
        setShowEnquiryModal(true);
    };

    const handleCloseModal = () => {
        setShowEnquiryModal(false);
        setSelectedProduct(null);
    };

    return (
        <div className="min-h-screen">
            {/* Hero Section - More vibrant like PolicyBazaar */}
            <section className="bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-500 text-white py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-black opacity-10"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center">
                        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 animate-fade-in drop-shadow-lg">
                            India's Largest Insurance Marketplace
                        </h1>
                        <p className="text-xl md:text-2xl mb-8 font-medium">
                            Compare & Buy Insurance Plans - Save up to 70%
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to="/products"
                                className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-3 rounded-lg font-bold text-base hover:from-orange-600 hover:to-red-700 transition-all shadow-lg"
                            >
                                Browse All Plans →
                            </Link>
                            <Link
                                to="/register"
                                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold text-base hover:bg-gray-50 transition-all shadow-lg"
                            >
                                Get Started Free
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trust Indicators - Enhanced */}
            <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-8 shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
                            <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-1">50L+</div>
                            <div className="text-gray-700 text-sm font-semibold">Happy Customers</div>
                        </div>
                        <div className="text-center bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
                            <div className="text-4xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent mb-1">100+</div>
                            <div className="text-gray-700 text-sm font-semibold">Insurance Partners</div>
                        </div>
                        <div className="text-center bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
                            <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-1">98%</div>
                            <div className="text-gray-700 text-sm font-semibold">Claim Settlement</div>
                        </div>
                        <div className="text-center bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
                            <div className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-1">24/7</div>
                            <div className="text-gray-700 text-sm font-semibold">Customer Support</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Insurance Categories - More prominent */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
                            Browse Insurance Products
                        </h2>
                        <p className="text-xl text-gray-600">
                            Trusted by 50 Lakh+ Indians to find the best insurance
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {INSURANCE_CATEGORIES.map((category) => (
                            <InsuranceCard key={category.id} category={category} />
                        ))}
                    </div>

                    {/* View All Products Button */}
                    <div className="text-center">
                        <button
                            onClick={() => navigate('/products')}
                            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-lg font-bold text-base hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg"
                        >
                            View All Products →
                        </button>
                    </div>
                </div>
            </section>

            {/* Featured Products Section */}
            {products && products.length > 0 && (
                <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
                                Featured Insurance Plans
                            </h2>
                            <p className="text-xl text-gray-600">
                                Handpicked best-selling plans for you
                            </p>
                        </div>

                        {productsLoading ? (
                            <div className="flex justify-center">
                                <Loading />
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                                    {products.slice(0, 3).map((product) => (
                                        <ProductCard
                                            key={product._id || product.id}
                                            product={product}
                                            onViewDetails={handleViewDetails}
                                        />
                                    ))}
                                </div>

                                <div className="text-center">
                                    <button
                                        onClick={() => navigate('/products')}
                                        className="bg-white border-2 border-blue-600 text-blue-600 px-6 py-2 rounded-lg font-bold text-base hover:bg-blue-600 hover:text-white transition-all"
                                    >
                                        View More Products →
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </section>
            )}

            {/* Why Choose Us */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
                            Why InsureBazaar?
                        </h2>
                        <p className="text-xl text-gray-600">
                            India's Most Trusted Insurance Marketplace
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl hover:shadow-lg transition-all">
                            <div className="text-5xl mb-4">💰</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                Best Prices Guaranteed
                            </h3>
                            <p className="text-gray-700 text-base">
                                Compare 50+ insurers and save up to 70% on premiums
                            </p>
                        </div>
                        <div className="text-center p-6 bg-gradient-to-br from-green-50 to-teal-50 rounded-xl hover:shadow-lg transition-all">
                            <div className="text-5xl mb-4">⚡</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                Instant Policy Issuance
                            </h3>
                            <p className="text-gray-700 text-base">
                                Get your policy in just 2 minutes - completely paperless
                            </p>
                        </div>
                        <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl hover:shadow-lg transition-all">
                            <div className="text-5xl mb-4">🏆</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                Claims Support 24/7
                            </h3>
                            <p className="text-gray-700 text-base">
                                Expert assistance for hassle-free claim settlement
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-16 bg-gradient-to-br from-indigo-50 to-blue-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
                            Customer Reviews
                        </h2>
                        <p className="text-xl text-gray-600">
                            See what our happy customers say
                        </p>
                    </div>

                    {testimonialsLoading ? (
                        <div className="flex justify-center">
                            <Loading />
                        </div>
                    ) : testimonials && testimonials.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {testimonials.slice(0, 3).map((testimonial, index) => (
                                <TestimonialCard key={index} testimonial={testimonial} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center text-gray-600 bg-white rounded-xl p-12">
                            <p className="text-lg">Customer testimonials coming soon!</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Call to Action - Changed to blue gradient */}
            <section className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white py-16">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Get Insured in 2 Minutes!
                    </h2>
                    <p className="text-xl mb-8">
                        Join 50 Lakh+ Indians who trust InsureBazaar
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/products"
                            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-bold text-lg hover:bg-gray-50 transition-all shadow-lg"
                        >
                            Browse Plans Now
                        </Link>
                        <a
                            href="tel:18001234567"
                            className="inline-block bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-white hover:text-blue-600 transition-all"
                        >
                            📞 1800-123-4567
                        </a>
                    </div>
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
                                    className="text-gray-500 hover:text-gray-700 text-3xl font-bold leading-none"
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
        </div>
    );
};

export default Home;
