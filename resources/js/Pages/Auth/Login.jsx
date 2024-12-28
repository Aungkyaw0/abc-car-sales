import React from 'react';
import { useForm, Link } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import NavigationBar from '@/Components/NavigationBar';
import toast, { Toaster } from 'react-hot-toast';

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/login', {
            onSuccess: () => {
                toast.success('Successfully logged in!', {
                    position: 'top-right',
                    duration: 3000,
                });
            },
            onError: () => {
                toast.error('Invalid credentials', {
                    position: 'top-right',
                    duration: 3000,
                });
            }
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-cyan-300 via-blue-600 to-purple-600">
            <Toaster />
            <NavigationBar />
            
            <div className="flex items-center justify-center min-h-screen pt-16 pb-12">
                <div className="w-full max-w-md p-8 bg-white rounded-3xl shadow-2xl">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Login</h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Username/Email Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Username
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={e => setData('email', e.target.value)}
                                    placeholder="Type your username"
                                    className="pl-10 w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        {/* Password Field */}
                        <div>
                            <div className="flex items-center justify-between mb-1">
                                <label className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <Link href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-500">
                                    Forgot password?
                                </Link>
                            </div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <input
                                    type="password"
                                    value={data.password}
                                    onChange={e => setData('password', e.target.value)}
                                    placeholder="Type your password"
                                    className="pl-10 w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full py-3 px-4 rounded-xl text-white font-medium
                            bg-gradient-to-r from-cyan-400 to-purple-600 hover:from-cyan-500 hover:to-purple-700
                            focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
                            transition-all duration-200 disabled:opacity-50"
                        >
                            {processing ? 'Signing in...' : 'LOGIN'}
                        </button>

                        {/* Social Login Section */}
                        <div className="mt-8">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500">Or Sign Up Using</span>
                                </div>
                            </div>

                            <div className="mt-6 flex justify-center space-x-4">
                                <button className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                    </svg>
                                </button>
                                <button className="p-2 rounded-full bg-blue-400 text-white hover:bg-blue-500">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                                    </svg>
                                </button>
                                <button className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/>
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Sign Up Link */}
                        <div className="mt-8 text-center">
                            <p className="text-sm text-gray-600">
                                Have not account yet?{' '}
                                <Link href={'/register'} className="font-medium text-blue-600 hover:text-blue-500">
                                    SIGN UP
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
} 