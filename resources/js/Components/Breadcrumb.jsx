import { Link } from '@inertiajs/react';
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/20/solid';

export default function Breadcrumb({ items }) {
    return (
        <nav className="flex px-4 py-3 sm:px-6 lg:px-8 bg-white border-b">
            <ol className="flex items-center space-x-2 max-w-7xl mx-auto w-full">
                <li>
                    <Link 
                        href="/" 
                        className="text-gray-400 hover:text-gray-500 flex items-center"
                    >
                        <HomeIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                        <span className="sr-only">Home</span>
                    </Link>
                </li>
                {items.map((item, index) => (
                    <li key={item.name} className="flex items-center">
                        <ChevronRightIcon 
                            className="h-5 w-5 flex-shrink-0 text-gray-400" 
                            aria-hidden="true" 
                        />
                        {index === items.length - 1 ? (
                            <span className="ml-2 text-sm font-medium text-gray-700">
                                {item.name}
                            </span>
                        ) : (
                            <Link
                                href={item.href}
                                className="ml-2 text-sm font-medium text-gray-500 hover:text-gray-700"
                            >
                                {item.name}
                            </Link>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
} 