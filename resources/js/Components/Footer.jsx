import { Link } from '@inertiajs/react';


const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <h3 className="text-xl font-bold mb-4">ABC Car Sales</h3>
                            <p className="text-gray-400">Your trusted partner in finding the perfect car.</p>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                            <ul className="space-y-2">
                                <li><Link href="/cars" className="text-gray-400 hover:text-white">Cars</Link></li>
                                <li><Link href="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
                                <li><Link href="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li>123 Car Street</li>
                                <li>Singapore, 123456</li>
                                <li>Phone: (65) 1234-5678</li>
                                <li>Email: info@abccarsales.com</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
                            <div className="flex space-x-4">
                                {/* Add social media icons/links here */}
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                        <p>&copy; 2024 ABC Car Sales. All rights reserved.</p>
                    </div>
                </div>
            </footer>
    )
}

export default Footer;
