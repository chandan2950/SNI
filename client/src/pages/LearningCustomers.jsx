import React from 'react';

const LearningCustomers = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-green-600 to-green-800 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-5xl font-bold mb-4">Insurance Learning Center</h1>
                    <p className="text-xl text-green-100">
                        Everything you need to know about insurance
                    </p>
                </div>
            </section>

            {/* Insurance Basics */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center">
                        Insurance Basics
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-green-200 hover:border-green-400 transition-colors">
                            <div className="text-5xl mb-4">📖</div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">
                                What is Insurance?
                            </h3>
                            <p className="text-gray-600">
                                Learn the fundamentals of insurance, how it works, and why it's
                                important for financial security.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-green-200 hover:border-green-400 transition-colors">
                            <div className="text-5xl mb-4">🏥</div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">
                                Health Insurance Guide
                            </h3>
                            <p className="text-gray-600">
                                Understand health insurance coverage, claim processes, and how to
                                choose the right plan for your family.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-green-200 hover:border-green-400 transition-colors">
                            <div className="text-5xl mb-4">🛡️</div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">
                                Life Insurance Explained
                            </h3>
                            <p className="text-gray-600">
                                Discover different types of life insurance and how to protect your
                                loved ones' financial future.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-green-200 hover:border-green-400 transition-colors">
                            <div className="text-5xl mb-4">🚗</div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">
                                Vehicle Insurance 101
                            </h3>
                            <p className="text-gray-600">
                                Learn about car and bike insurance, coverage types, and how to
                                file claims quickly.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-green-200 hover:border-green-400 transition-colors">
                            <div className="text-5xl mb-4">📈</div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">
                                Investment Plans
                            </h3>
                            <p className="text-gray-600">
                                Understanding ULIP, endowment plans, and how to grow wealth with
                                insurance-linked investments.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-green-200 hover:border-green-400 transition-colors">
                            <div className="text-5xl mb-4">✈️</div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">
                                Travel Insurance
                            </h3>
                            <p className="text-gray-600">
                                Travel with peace of mind by understanding travel insurance
                                coverage and benefits.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How-to Guides */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center">
                        How-To Guides
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white rounded-xl shadow-lg p-8">
                            <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                                <span className="text-green-600 mr-3">1</span>
                                How to Choose the Right Plan
                            </h3>
                            <p className="text-gray-700 mb-4">
                                Assess your needs, compare coverage options, check policy
                                exclusions, and consider your budget to find the perfect insurance
                                plan.
                            </p>
                            <ul className="space-y-2 text-gray-600">
                                <li>✓ Evaluate your current situation</li>
                                <li>✓ Compare multiple insurers</li>
                                <li>✓ Read policy documents carefully</li>
                                <li>✓ Check claim settlement ratios</li>
                            </ul>
                        </div>

                        <div className="bg-white rounded-xl shadow-lg p-8">
                            <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                                <span className="text-green-600 mr-3">2</span>
                                How to File a Claim
                            </h3>
                            <p className="text-gray-700 mb-4">
                                Follow these steps to ensure a smooth and quick claim settlement
                                process.
                            </p>
                            <ul className="space-y-2 text-gray-600">
                                <li>✓ Notify your insurer immediately</li>
                                <li>✓ Gather required documents</li>
                                <li>✓ Submit claim form online or offline</li>
                                <li>✓ Follow up regularly on claim status</li>
                            </ul>
                        </div>

                        <div className="bg-white rounded-xl shadow-lg p-8">
                            <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                                <span className="text-green-600 mr-3">3</span>
                                How to Calculate Coverage
                            </h3>
                            <p className="text-gray-700 mb-4">
                                Determine the right coverage amount based on your income,
                                liabilities, and future goals.
                            </p>
                            <ul className="space-y-2 text-gray-600">
                                <li>✓ Calculate annual income</li>
                                <li>✓ Add outstanding liabilities</li>
                                <li>✓ Include future financial goals</li>
                                <li>✓ Use online calculators for accuracy</li>
                            </ul>
                        </div>

                        <div className="bg-white rounded-xl shadow-lg p-8">
                            <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                                <span className="text-green-600 mr-3">4</span>
                                How to Save on Premiums
                            </h3>
                            <p className="text-gray-700 mb-4">
                                Smart tips to reduce your insurance costs without compromising on
                                coverage.
                            </p>
                            <ul className="space-y-2 text-gray-600">
                                <li>✓ Buy early to get lower rates</li>
                                <li>✓ Maintain a healthy lifestyle</li>
                                <li>✓ Opt for higher deductibles</li>
                                <li>✓ Bundle multiple policies</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-16 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center">
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-6">
                        <div className="bg-gray-50 rounded-xl p-6">
                            <h3 className="text-xl font-bold text-gray-800 mb-2">
                                What is the difference between term and whole life insurance?
                            </h3>
                            <p className="text-gray-700">
                                Term life insurance provides coverage for a specific period (e.g.,
                                20-30 years) and is generally more affordable. Whole life insurance
                                provides lifetime coverage and includes a savings component that
                                builds cash value over time.
                            </p>
                        </div>

                        <div className="bg-gray-50 rounded-xl p-6">
                            <h3 className="text-xl font-bold text-gray-800 mb-2">
                                How much health insurance coverage do I need?
                            </h3>
                            <p className="text-gray-700">
                                A general rule is to have coverage of at least 5-10 times your
                                annual income. Consider factors like age, existing health
                                conditions, family medical history, and rising healthcare costs
                                when determining your coverage amount.
                            </p>
                        </div>

                        <div className="bg-gray-50 rounded-xl p-6">
                            <h3 className="text-xl font-bold text-gray-800 mb-2">
                                Can I have multiple insurance policies?
                            </h3>
                            <p className="text-gray-700">
                                Yes, you can have multiple policies from different insurers. For
                                life insurance, you can buy multiple policies to increase coverage.
                                For health insurance, you can claim from multiple policies, but the
                                total claim cannot exceed the actual medical expenses.
                            </p>
                        </div>

                        <div className="bg-gray-50 rounded-xl p-6">
                            <h3 className="text-xl font-bold text-gray-800 mb-2">
                                What is a waiting period in health insurance?
                            </h3>
                            <p className="text-gray-700">
                                A waiting period is the time you must wait before certain benefits
                                become available. Most policies have a 30-day initial waiting
                                period, 2-4 years for pre-existing conditions, and specific waiting
                                periods for certain treatments.
                            </p>
                        </div>

                        <div className="bg-gray-50 rounded-xl p-6">
                            <h3 className="text-xl font-bold text-gray-800 mb-2">
                                How long does claim settlement take?
                            </h3>
                            <p className="text-gray-700">
                                For cashless health insurance claims, settlement is often
                                immediate. For reimbursement claims, it typically takes 7-30 days
                                depending on document verification. Life insurance claims are
                                usually settled within 30 days of document submission.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-gradient-to-r from-green-600 to-green-800 text-white py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl font-bold mb-4">Still Have Questions?</h2>
                    <p className="text-xl mb-8 text-green-100">
                        Our insurance experts are here to help you
                    </p>
                    <a
                        href="/register"
                        className="inline-block bg-white text-green-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-green-50 transition-colors shadow-lg"
                    >
                        Talk to an Expert
                    </a>
                </div>
            </section>
        </div>
    );
};

export default LearningCustomers;
