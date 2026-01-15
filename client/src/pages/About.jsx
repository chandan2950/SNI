import React from 'react';

const About = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-5xl font-bold mb-4">About InsureBazaar</h1>
                    <p className="text-xl text-blue-100">
                        Your Trusted Partner in Insurance Solutions
                    </p>
                </div>
            </section>

            {/* Company Story */}
            <section className="py-16 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl font-bold text-gray-800 mb-6 text-center">
                        Our Story
                    </h2>
                    <p className="text-lg text-gray-700 leading-relaxed mb-4">
                        InsureBazaar was founded with a simple mission: to make insurance
                        accessible, affordable, and easy to understand for everyone. We
                        recognized that navigating the complex world of insurance could be
                        overwhelming, and we wanted to change that.
                    </p>
                    <p className="text-lg text-gray-700 leading-relaxed mb-4">
                        Today, we've partnered with over 100 leading insurance providers to
                        bring you the most comprehensive comparison platform in India. Our
                        technology-driven approach ensures you get personalized
                        recommendations and the best deals available.
                    </p>
                    <p className="text-lg text-gray-700 leading-relaxed">
                        We've helped over 50 lakh customers secure their futures, and we're
                        just getting started. Our commitment to transparency, customer
                        satisfaction, and innovation drives everything we do.
                    </p>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="bg-white rounded-xl shadow-lg p-8">
                            <div className="text-5xl mb-4">🎯</div>
                            <h3 className="text-3xl font-bold text-gray-800 mb-4">
                                Our Mission
                            </h3>
                            <p className="text-gray-700 leading-relaxed">
                                To empower every Indian with the knowledge and tools to make
                                informed insurance decisions. We strive to simplify the
                                insurance buying process and ensure that everyone has access to
                                the protection they need at prices they can afford.
                            </p>
                        </div>
                        <div className="bg-white rounded-xl shadow-lg p-8">
                            <div className="text-5xl mb-4">🌟</div>
                            <h3 className="text-3xl font-bold text-gray-800 mb-4">
                                Our Vision
                            </h3>
                            <p className="text-gray-700 leading-relaxed">
                                To become India's most trusted insurance marketplace, where
                                customers find not just policies, but peace of mind. We envision
                                a future where insurance is understood, valued, and accessible to
                                all.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center">
                        Our Core Values
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="text-5xl mb-4">🤝</div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Trust</h3>
                            <p className="text-gray-600">
                                Building lasting relationships through transparency and honesty
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="text-5xl mb-4">💡</div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">
                                Innovation
                            </h3>
                            <p className="text-gray-600">
                                Leveraging technology to simplify insurance
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="text-5xl mb-4">❤️</div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">
                                Customer First
                            </h3>
                            <p className="text-gray-600">
                                Your needs and satisfaction are our priority
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="text-5xl mb-4">⚖️</div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">
                                Integrity
                            </h3>
                            <p className="text-gray-600">
                                Doing the right thing, always
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Awards & Recognition */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center">
                        Awards & Recognition
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                            <div className="text-6xl mb-4">🏆</div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">
                                Best Insurance Platform 2025
                            </h3>
                            <p className="text-gray-600">Financial Times India</p>
                        </div>
                        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                            <div className="text-6xl mb-4">🌟</div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">
                                Customer Choice Award 2024
                            </h3>
                            <p className="text-gray-600">Insurance Industry Council</p>
                        </div>
                        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                            <div className="text-6xl mb-4">💫</div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">
                                Digital Innovation Award 2024
                            </h3>
                            <p className="text-gray-600">Tech Excellence Awards</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl font-bold mb-4">Join Our Growing Family</h2>
                    <p className="text-xl mb-8 text-blue-100">
                        Experience the InsureBazaar difference today
                    </p>
                    <a
                        href="/register"
                        className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition-colors shadow-lg"
                    >
                        Get Started
                    </a>
                </div>
            </section>
        </div>
    );
};

export default About;
