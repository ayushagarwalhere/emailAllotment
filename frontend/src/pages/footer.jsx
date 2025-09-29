import React from 'react';

function Footer(){
    return(
        <footer className="bg-gray-800 text-white py-8 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Main Footer Content */}
                <div className="flex justify-between items-start mb-6">
                    {/* Title Section */}
                    <div className="text-left">
                        <h2 className="text-4xl font-bold mb-4">Student Email Allotement</h2>
                    </div>
                    
                    {/* Follow Us Section */}
                    <div className="text-right">
                        <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
                        <div className="space-y-2">
                            <a 
                                href="https://twitter.com/nithamirpur" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="block text-white hover:text-blue-400 transition-colors duration-200"
                            >
                                Twitter →
                            </a>
                            <a 
                                href="https://www.linkedin.com/school/national-institute-of-technology-hamirpur/" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="block text-white hover:text-blue-400 transition-colors duration-200"
                            >
                                LinkedIn →
                            </a>
                            <a 
                                href="https://www.instagram.com/nithamirpur/" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="block text-white hover:text-blue-400 transition-colors duration-200"
                            >
                                Instagram →
                            </a>
                        </div>
                    </div>
                </div>
                
                {/* Separator Line */}
                <hr className="border-gray-600 mb-6" />
                
                {/* Bottom Section */}
                <div className="flex justify-between items-center text-sm">
                    <div className="text-gray-300">
                        ©Copyright 2025. All rights reserved.
                    </div>
                    <div className="text-gray-300">
                        contact us - 9557643821
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer