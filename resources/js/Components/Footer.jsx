import { Link } from '@inertiajs/react';
import { 
    FaFacebookF, 
    FaTwitter, 
    FaInstagram, 
} from 'react-icons/fa';

const Footer = () => {
    const socialLinks = [
        {
            name: 'Facebook',
            url: 'https://facebook.com/abccarsales',
            icon: FaFacebookF,
            color: 'hover:text-blue-600'
        },
        {
            name: 'Twitter',
            url: 'https://twitter.com/abccarsales',
            icon: FaTwitter,
            color: 'hover:text-blue-400'
        },
        {
            name: 'Instagram',
            url: 'https://instagram.com/abccarsales',
            icon: FaInstagram,
            color: 'hover:text-pink-600'
        }
    ];

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
                                <li><Link href="/car/lists" className="text-gray-400 hover:text-white">Cars</Link></li>
                                <li><Link href="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
                                <li><Link href="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
                                <li><Link href="/sell-car" className="text-gray-400 hover:text-white">Start Selling Your Cars</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li>123 Car Street</li>
                                <li>Yangon, Kamayut Township </li>
                                <li>Phone: (95) 94099-5678</li>
                                <li>Email: info@abccarsales.com</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
                            <div className="flex space-x-4">
                                {socialLinks.map((social) => {
                                    const Icon = social.icon;
                                    return (
                                        <a
                                            key={social.name}
                                            href={social.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`w-10 h-10 rounded-full bg-gray-800 flex items-center 
                                            justify-center transition-colors duration-200 
                                            ${social.color} hover:bg-gray-700`}
                                            aria-label={`Follow us on ${social.name}`}
                                        >
                                            <Icon className="w-5 h-5" />
                                        </a>
                                    );
                                })}
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
