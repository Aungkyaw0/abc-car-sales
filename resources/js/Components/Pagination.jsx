import React from 'react';
import { Link } from '@inertiajs/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';

export default function Pagination({ links }) {
    if (!links || !links.links || links.links.length <= 1) return null;

    return (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
            <div className="flex flex-1 justify-between sm:hidden">
                <Link
                    href={links.prev}
                    className={`relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium ${
                        !links.prev ? 'pointer-events-none opacity-50' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                >
                    Previous
                </Link>
                <Link
                    href={links.next}
                    className={`relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium ${
                        !links.next ? 'pointer-events-none opacity-50' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                >
                    Next
                </Link>
            </div>
            
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">{links.from}</span> to{' '}
                        <span className="font-medium">{links.to}</span> of{' '}
                        <span className="font-medium">{links.total}</span> results
                    </p>
                </div>
                
                <div>
                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                        <Link
                            href={links.prev}
                            className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 ${
                                !links.prev ? 'pointer-events-none opacity-50' : ''
                            }`}
                        >
                            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                        </Link>

                        {links.links.map((link, i) => {
                            if (i === 0 || i === links.links.length - 1) return null;
                            
                            return (
                                <Link
                                    key={i}
                                    href={link.url}
                                    className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold 
                                        ${link.active 
                                            ? 'z-10 bg-blue-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600' 
                                            : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0'
                                        }
                                        ${!link.url ? 'pointer-events-none' : ''}
                                    `}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            );
                        })}

                        <Link
                            href={links.next}
                            className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 ${
                                !links.next ? 'pointer-events-none opacity-50' : ''
                            }`}
                        >
                            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                        </Link>
                    </nav>
                </div>
            </div>
        </div>
    );
} 