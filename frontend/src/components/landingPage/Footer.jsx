import React from 'react';

export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-between mb-8">
                    <div className="w-full md:w-1/3 mb-8 md:mb-0 text-center md:text-left">
                        <h3 className="text-xl font-semibold mb-4">About HabitatT</h3>
                        <p>
                            HabitatT is about having proper communication with tenants and property owners, ensuring seamless property management and communication.
                        </p>
                    </div>
                    <div className="w-full md:w-1/3 mb-8 md:mb-0 text-center">
                        <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><a href="/login" className="hover:underline">Login</a></li>
                            <li><a href="/contact" className="hover:underline">Contact Us</a></li>
                            <li><a href="/about" className="hover:underline">About Us</a></li>
                        </ul>
                    </div>
                    <div className="w-full md:w-1/3 mb-8 md:mb-0 text-center md:text-right">
                        <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
                        <div className="flex justify-center md:justify-end space-x-4">
                            <a href="mailto:info@habitatT.com" className="hover:opacity-75">
                                <img className='h-8' src="https://ik.imagekit.io/rmhnagyqw/habitatT/mail.png?updatedAt=1720008711166" alt="Email" />
                            </a>
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-75">
                                <img className='h-8' src="https://ik.imagekit.io/rmhnagyqw/habitatT/facebook.png?updatedAt=1720008710523" alt="Facebook" />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-75">
                                <img className='h-8' src="https://ik.imagekit.io/rmhnagyqw/habitatT/twitter.png?updatedAt=1720008710560" alt="Twitter" />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-75">
                                <img className='h-8' src="https://ik.imagekit.io/rmhnagyqw/habitatT/linkedin.png?updatedAt=1720008709820" alt="LinkedIn" />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="text-center mt-8">
                    <p className="text-sm">&copy; 2024 HabitatT. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
