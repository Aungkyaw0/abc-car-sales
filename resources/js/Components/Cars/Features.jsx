import React from 'react';

export default function Features({ features }) {
    if (!features || features.length === 0) {
        return null;
    }

    // Group features by category
    const groupedFeatures = features.reduce((acc, feature) => {
        if (!acc[feature.category]) {
            acc[feature.category] = [];
        }
        acc[feature.category].push(feature);
        return acc;
    }, {});

    const categories = {
        safety: 'Shield Check',
        comfort: 'Sparkles',
        entertainment: 'Musical Note',
        performance: 'Lightning Bolt',
        interior: 'Home',
        exterior: 'Sun'
    };

    return (
        <div className="bg-white rounded-xl p-6 shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">Features</h2>
            <div className="space-y-4">
                {Object.entries(groupedFeatures).map(([category, categoryFeatures]) => (
                    <div key={category}>
                        <h3 className="text-lg font-medium text-gray-900 capitalize mb-2">{category}</h3>
                        <div className="grid grid-cols-2 gap-2">
                            {categoryFeatures.map(feature => (
                                <div key={feature.id} className="flex items-center space-x-2">
                                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span className="text-gray-600">{feature.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
} 