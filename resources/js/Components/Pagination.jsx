import React from 'react';
import { Link } from '@inertiajs/react';

export default function Pagination({ links }) {
    if (!links || !links.links || links.links.length <= 3) {
        return null;
    }

    return (
        <div className="flex items-center justify-between">
            <div className="flex justify-between flex-1 sm:hidden">
                {links.prev && (
                    <Link
                        href={links.prev}
                        className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                        Previous
                    </Link>
                )}
                {links.next && (
                    <Link
                        href={links.next}
                        className="relative inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                        Next
                    </Link>
                )}
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">{links.from || 0}</span> to{' '}
                        <span className="font-medium">{links.to || 0}</span> of{' '}
                        <span className="font-medium">{links.total || 0}</span> results
                    </p>
                </div>
                <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                        {links.links.map((link, i) => {
                            if (!link.url) return null;
                            
                            return (
                                <Link
                                    key={i}
                                    href={link.url}
                                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium
                                        ${link.active
                                            ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                                            : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                        }
                                        ${i === 0 ? 'rounded-l-md' : ''}
                                        ${i === links.links.length - 1 ? 'rounded-r-md' : ''}
                                    `}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            );
                        })}
                    </nav>
                </div>
            </div>
        </div>
    );
} 