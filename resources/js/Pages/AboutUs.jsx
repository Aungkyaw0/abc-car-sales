import React from 'react';
import { motion } from 'framer-motion';
import { Link } from '@inertiajs/react';

export default function AboutUs() {
    // Animation variants
    const fadeInUp = {
        initial: { opacity: 0, y: 60 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    const staggerChildren = {
        animate: {
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const scaleIn = {
        initial: { scale: 0.8, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        transition: { duration: 0.5 }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section - Removed initial opacity animation */}
            <section className="relative pt-20">
                <div className="absolute inset-0 h-[400px] bg-[url('/images/about-hero.png')] bg-cover bg-top">
                    <div className="absolute inset-0 bg-blue-900/80"></div>
                </div>
                <motion.div 
                    className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 text-center"
                    variants={fadeInUp}
                    initial="initial"
                    animate="animate"
                >
                    <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">About ABC Car Sales</h1>
                    <p className="text-xl text-gray-100 max-w-3xl mx-auto">
                        Your trusted partner in finding the perfect vehicle since 2010
                    </p>
                </motion.div>
            </section>

            {/* Our Story Section with Scroll Animation */}
            <motion.section 
                className="py-20 bg-white"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div 
                            className="relative"
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <img 
                                src="/images/showroom.png" 
                                alt="Our Showroom" 
                                className="rounded-lg shadow-xl w-full h-[400px] object-cover"
                            />
                            <motion.div 
                                className="absolute -bottom-6 -right-6 bg-blue-600 text-white p-6 rounded-lg shadow-lg"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.5 }}
                            >
                                <p className="text-3xl font-bold">13+</p>
                                <p className="text-sm">Years of Excellence</p>
                            </motion.div>
                        </motion.div>
                        <motion.div variants={staggerChildren} initial="initial" animate="animate">
                            <motion.h2 variants={fadeInUp} className="text-3xl font-bold text-gray-900 mb-6">
                                Our Story
                            </motion.h2>
                            <motion.p variants={fadeInUp} className="text-gray-600 mb-6 leading-relaxed">
                                Founded in 2010, ABC Car Sales has grown from a small local dealership to one of Singapore's 
                                most trusted names in the used car market.
                            </motion.p>
                            <motion.p variants={fadeInUp} className="text-gray-600 mb-8 leading-relaxed">
                                Today, we pride ourselves on our extensive collection of premium vehicles, transparent pricing, 
                                and customer-first approach.
                            </motion.p>
                            <motion.div 
                                className="grid grid-cols-3 gap-6 text-center"
                                variants={staggerChildren}
                            >
                                {[
                                    { number: "5000+", label: "Cars Sold" },
                                    { number: "4.8/5", label: "Customer Rating" },
                                    { number: "98%", label: "Satisfaction Rate" }
                                ].map((stat, index) => (
                                    <motion.div
                                        key={index}
                                        className="p-4 bg-gray-50 rounded-lg"
                                        variants={scaleIn}
                                        whileHover={{ scale: 1.05 }}
                                    >
                                        <p className="text-3xl font-bold text-blue-600">{stat.number}</p>
                                        <p className="text-sm text-gray-600">{stat.label}</p>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </motion.section>

            {/* Values Section with Hover Effects */}
            <motion.section 
                className="py-20 bg-gray-50"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div 
                        className="text-center mb-16"
                        variants={fadeInUp}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            These principles guide everything we do at ABC Car Sales
                        </p>
                    </motion.div>
                    <motion.div 
                        className="grid grid-cols-1 md:grid-cols-3 gap-8"
                        variants={staggerChildren}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                    >
                        {[
                            {
                                icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
                                title: "Trust & Transparency",
                                description: "We believe in complete honesty and transparency in every transaction."
                            },
                            {
                                icon: "M13 10V3L4 14h7v7l9-11h-7z",
                                title: "Excellence",
                                description: "We strive for excellence in everything we do, from customer service to vehicle quality."
                            },
                            {
                                icon: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9",
                                title: "Customer First",
                                description: "Your satisfaction is our top priority. We're here to serve you better."
                            }
                        ].map((value, index) => (
                            <motion.div
                                key={index}
                                className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300"
                                variants={fadeInUp}
                                initial="initial"
                                whileInView="animate"
                                viewport={{ once: true }}
                            >
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={value.icon} />
                                    </svg>
                                </div>
                                <motion.h3 
                                    className="text-xl font-bold text-gray-900 mb-4"
                                    variants={fadeInUp}
                                    initial="initial"
                                    whileInView="animate"
                                    viewport={{ once: true }}
                                >
                                    {value.title}
                                </motion.h3>
                                <motion.p 
                                    className="text-gray-600"
                                    variants={fadeInUp}
                                    initial="initial"
                                    whileInView="animate"
                                    viewport={{ once: true }}
                                >
                                    {value.description}
                                </motion.p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </motion.section>

            {/* Team Section */}
            <motion.section 
                className="py-20 bg-white"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div 
                        className="text-center mb-16"
                        variants={fadeInUp}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Leadership Team</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            The experienced professionals behind ABC Car Sales
                        </p>
                    </motion.div>
                    <motion.div 
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                        variants={staggerChildren}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                    >
                        {[1, 2, 3].map((member) => (
                            <motion.div
                                key={member}
                                className="text-center"
                                variants={fadeInUp}
                                initial="initial"
                                whileInView="animate"
                                viewport={{ once: true }}
                            >
                                <div className="relative mb-6">
                                    <img 
                                        src={`/images/team-member-${member}.png`}
                                        alt="Team Member"
                                        className="w-48 h-48 rounded-full mx-auto object-cover"
                                    />
                                </div>
                                <motion.h3 
                                    className="text-xl font-bold text-gray-900 mb-2"
                                    variants={fadeInUp}
                                    initial="initial"
                                    whileInView="animate"
                                    viewport={{ once: true }}
                                >
                                    John Doe
                                </motion.h3>
                                <motion.p 
                                    className="text-blue-600 mb-4"
                                    variants={fadeInUp}
                                    initial="initial"
                                    whileInView="animate"
                                    viewport={{ once: true }}
                                >
                                    Chief Executive Officer
                                </motion.p>
                                <motion.p 
                                    className="text-gray-600 max-w-sm mx-auto"
                                    variants={fadeInUp}
                                    initial="initial"
                                    whileInView="animate"
                                    viewport={{ once: true }}
                                >
                                    15+ years of experience in automotive industry
                                </motion.p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </motion.section>

            {/* CTA Section with Button Animation */}
            <motion.section 
                className="py-20 bg-blue-600"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.h2 
                        className="text-3xl font-bold text-white mb-8"
                        variants={fadeInUp}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                    >
                        Ready to Find Your Perfect Car?
                    </motion.h2>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Link
                            href="/cars"
                            className="inline-flex items-center px-8 py-3 border-2 border-white text-lg font-medium rounded-full 
                            text-white hover:bg-white hover:text-blue-600 transition-colors duration-200"
                        >
                            Browse Our Inventory
                        </Link>
                    </motion.div>
                </div>
            </motion.section>
        </div>
    );
}