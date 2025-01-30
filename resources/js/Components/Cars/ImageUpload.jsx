import React, { useState } from 'react';

export default function ImageUpload({ onImagesSelected, error }) {
    const [previews, setPreviews] = useState([]);
    const [localError, setLocalError] = useState('');
    const MAX_IMAGES = 4;
    const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'];
    const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        
        // Check if total images would exceed limit
        if (files.length > MAX_IMAGES) {
            setLocalError(`You can only upload up to ${MAX_IMAGES} images`);
            return;
        }

        // Validate each file
        for (const file of files) {
            if (!ALLOWED_TYPES.includes(file.type)) {
                setLocalError('Invalid file type. Only JPG, JPEG, PNG and GIF are allowed');
                return;
            }
            
            if (file.size > MAX_FILE_SIZE) {
                setLocalError('File size too large. Maximum size is 2MB');
                return;
            }
        }

        // Clear any previous error
        setLocalError('');
        
        // Create preview URLs
        const newPreviews = files.map(file => URL.createObjectURL(file));
        // Clean up old preview URLs
        previews.forEach(url => URL.revokeObjectURL(url));
        setPreviews(newPreviews);
        
        onImagesSelected(files);
    };

    const removeImage = (index) => {
        const newPreviews = [...previews];
        URL.revokeObjectURL(newPreviews[index]);
        newPreviews.splice(index, 1);
        setPreviews(newPreviews);
        
        // Update the files in the parent component
        const currentFiles = Array.from(document.querySelector('input[type="file"]').files);
        const dataTransfer = new DataTransfer();
        
        currentFiles.forEach((file, i) => {
            if (i !== index) {
                dataTransfer.items.add(file);
            }
        });
        
        document.querySelector('input[type="file"]').files = dataTransfer.files;
        onImagesSelected(Array.from(dataTransfer.files));
    };

    return (
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Car Images (Maximum 4)
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-primary transition-colors duration-200">
                    <div className="space-y-1 text-center">
                        <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                        >
                            <path
                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                            <label className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary-dark focus-within:outline-none">
                                <span>Upload images</span>
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="sr-only"
                                    max={MAX_IMAGES}
                                />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">
                            PNG, JPG, GIF up to 2MB each (Maximum 4 images)
                        </p>
                    </div>
                </div>
            </div>

            {(error || localError) && (
                <p className="mt-2 text-sm text-red-600">{error || localError}</p>
            )}

            {/* Image Previews */}
            {previews.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    {previews.map((preview, index) => (
                        <div key={index} className="relative group">
                            <div className="aspect-w-3 aspect-h-2">
                                <img
                                    src={preview}
                                    alt={`Preview ${index + 1}`}
                                    className="object-cover rounded-lg"
                                />
                            </div>
                            <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute top-2 right-2 p-1 bg-red-500 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                            >
                                <svg 
                                    className="w-4 h-4" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                >
                                    <path 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round" 
                                        strokeWidth="2" 
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
} 