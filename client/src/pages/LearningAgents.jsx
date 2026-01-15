import React from 'react';
import { Link } from 'react-router-dom';

const LearningAgents = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-5xl font-bold mb-4">Agent Learning Center</h1>
                    <p className="text-xl text-purple-100">
                        Enhance your skills and grow your insurance business
                    </p>
                </div>
            </section>

            {/* Training Resources */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center">
                        Training Resources
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-purple-200 hover:border-purple-400 transition-colors">
                            <div className="text-5xl mb-4">📚</div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">
                                Product Knowledge
                            </h3>
                            <p className="text-gray-600 mb-4">
                                Comprehensive guides on all insurance products we offer
                            </p>
                            <ul className="space-y-2 text-gray-700">
                                <li>• Life Insurance Fundamentals</li>
                                <li>• Health Insurance Deep Dive</li>
                                <li>• Vehicle Insurance Mastery</li>
                                <li>• Investment Products Guide</li>
                            </ul>
                        </div>

                        <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-purple-200 hover:border-purple-400 transition-colors">
                            <div className="text-5xl mb-4">🎯</div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">
                                Sales Techniques
                            </h3>
                            <p className="text-gray-600 mb-4">
                                Master the art of selling insurance effectively
                            </p>
                            <ul className="space-y-2 text-gray-700">
                                <li>• Customer Needs Analysis</li>
                                <li>• Objection Handling</li>
                                <li>• Closing Strategies</li>
                                <li>• Follow-up Best Practices</li>
                            </ul>
                        </div>

                        <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-purple-200 hover:border-purple-400 transition-colors">
                            <div className="text-5xl mb-4">💻</div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">
                                Platform Training
                            </h3>
                            <p className="text-gray-600 mb-4">
                                Learn to use our platform efficiently
                            </p>
                            <ul className="space-y-2 text-gray-700">
                                <li>• Dashboard Navigation</li>
                                <li>• Quote Generation</li>
                                <li>• Lead Management</li>
                                <li>• Commission Tracking</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Video Tutorials */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center">
                        Video Tutorials
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                            <div className="bg-gradient-to-r from-purple-500 to-purple-600 h-48 flex items-center justify-center text-white">
                                <div className="text-center">
                                    <div className="text-6xl mb-2">▶️</div>
                                    <p className="text-xl font-semibold">Getting Started Guide</p>
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-800 mb-2">
                                    Introduction to InsureBazaar
                                </h3>
                                <p className="text-gray-600">
                                    Learn the basics of our platform and how to start selling
                                </p>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                            <div className="bg-gradient-to-r from-purple-500 to-purple-600 h-48 flex items-center justify-center text-white">
                                <div className="text-center">
                                    <div className="text-6xl mb-2">▶️</div>
                                    <p className="text-xl font-semibold">Advanced Selling</p>
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-800 mb-2">
                                    Maximizing Your Sales
                                </h3>
                                <p className="text-gray-600">
                                    Advanced techniques to boost your conversion rates
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ for Agents */}
            <section className="py-16 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center">
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-6">
                        <div className="bg-gray-50 rounded-xl p-6">
                            <h3 className="text-xl font-bold text-gray-800 mb-2">
                                How do I earn commissions?
                            </h3>
                            <p className="text-gray-700">
                                You earn commissions on every policy sold through your referral.
                                Commissions are calculated based on the product type and premium
                                amount, and are paid monthly.
                            </p>
                        </div>

                        <div className="bg-gray-50 rounded-xl p-6">
                            <h3 className="text-xl font-bold text-gray-800 mb-2">
                                What training is required to become an agent?
                            </h3>
                            <p className="text-gray-700">
                                You must complete our online certification course and pass the
                                assessment. The training is self-paced and covers all essential
                                insurance products and sales techniques.
                            </p>
                        </div>

                        <div className="bg-gray-50 rounded-xl p-6">
                            <h3 className="text-xl font-bold text-gray-800 mb-2">
                                How do I track my leads and sales?
                            </h3>
                            <p className="text-gray-700">
                                Our agent dashboard provides real-time tracking of all your
                                leads, quotes, conversions, and commission earnings. You can
                                access detailed reports and analytics anytime.
                            </p>
                        </div>

                        <div className="bg-gray-50 rounded-xl p-6">
                            <h3 className="text-xl font-bold text-gray-800 mb-2">
                                What support is available for agents?
                            </h3>
                            <p className="text-gray-700">
                                We provide 24/7 support through phone, email, and chat. You also
                                have access to a dedicated agent success manager and our
                                comprehensive knowledge base.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Support */}
            <section className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl font-bold mb-4">Need Help?</h2>
                    <p className="text-xl mb-8 text-purple-100">
                        Our agent support team is here for you 24/7
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="mailto:agents@insurebazaar.com"
                            className="inline-block bg-white text-purple-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-purple-50 transition-colors shadow-lg"
                        >
                            Email Support
                        </a>
                        <a
                            href="tel:18001234567"
                            className="inline-block bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-purple-600 transition-colors"
                        >
                            Call: 1800-123-4567
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LearningAgents;
