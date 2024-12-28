import React from 'react';

export default function FeaturesSelection({ selectedFeatures, onFeaturesChange, error }) {
    const featureCategories = {
        safety: [
            'ABS',
            'Airbags',
            'Parking Sensors',
            'Backup Camera',
            'Lane Departure Warning',
            'Blind Spot Monitor'
        ],
        comfort: [
            'Air Conditioning',
            'Power Steering',
            'Power Windows',
            'Cruise Control',
            'Keyless Entry',
            'Heated Seats'
        ],
        entertainment: [
            'Bluetooth',
            'Navigation System',
            'Premium Sound System',
            'USB Port',
            'Apple CarPlay',
            'Android Auto'
        ],
        performance: [
            'Turbo Engine',
            'Sport Mode',
            'All Wheel Drive',
            'Traction Control',
            'Sport Suspension',
            'Paddle Shifters'
        ],
        interior: [
            'Leather Seats',
            'Sunroof',
            'Power Seats',
            'Third Row Seating',
            'Folding Rear Seats',
            'Premium Interior'
        ],
        exterior: [
            'Alloy Wheels',
            'LED Headlights',
            'Fog Lights',
            'Roof Rails',
            'Power Mirrors',
            'Tinted Windows'
        ]
    };

    const handleFeatureToggle = (category, feature) => {
        const featureKey = `${category}:${feature}`;
        const updatedFeatures = selectedFeatures.includes(featureKey)
            ? selectedFeatures.filter(f => f !== featureKey)
            : [...selectedFeatures, featureKey];
        onFeaturesChange(updatedFeatures);
    };

    return (
        <div className="space-y-6">
            <label className="block text-lg font-medium text-gray-900">Car Features</label>
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(featureCategories).map(([category, features]) => (
                    <div key={category} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        <h3 className="text-md font-semibold text-gray-900 capitalize mb-3">
                            {category} Features
                        </h3>
                        <div className="space-y-2">
                            {features.map((feature) => (
                                <label key={feature} className="flex items-center space-x-3">
                                    <input
                                        type="checkbox"
                                        checked={selectedFeatures.includes(`${category}:${feature}`)}
                                        onChange={() => handleFeatureToggle(category, feature)}
                                        className="rounded border-gray-300 text-primary focus:ring-primary"
                                    />
                                    <span className="text-sm text-gray-700">{feature}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
} 