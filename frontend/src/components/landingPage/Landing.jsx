import React from "react";
import Navbar from "./Navbar";
import SimpleSlider from "./Slider";
import { Buildings, SolutionFeatures, Team } from "../../ImageData";
import ImageContent from "./ImageContent";
import Footer from "./Footer";
import { FiUser, FiMessageSquare, FiClipboard, FiBell, FiHome, FiUpload, FiMail, FiGrid } from "react-icons/fi";

// Import the property manager image and account management image
import propertyManagerImage from "../../assets/propertymanager.png";
import accountManagementImage from "../../assets/accountmgr.webp";
import centralCommunicationImage from "../../assets/centralize.jpeg";

const features = [
    {
        icon: <FiUser size={40} />,
        title: 'Account Management',
        tagline: 'Manage user accounts easily'
    },
    {
        icon: <FiMessageSquare size={40} />,
        title: 'Centralized Communication',
        tagline: 'Efficient communication hub'
    },
    {
        icon: <FiClipboard size={40} />,
        title: 'Log Request',
        tagline: 'Track and manage service requests'
    },
    {
        icon: <FiBell size={40} />,
        title: 'Announcement',
        tagline: 'Broadcast important messages'
    },
    {
        icon: <FiHome size={40} />,
        title: 'Property Management and Listing',
        tagline: 'Manage properties and listings'
    },
    {
        icon: <FiUpload size={40} />,
        title: 'Document Upload and Receipt',
        tagline: 'Upload and manage documents'
    },
    {
        icon: <FiMail size={40} />,
        title: 'Email Notification',
        tagline: 'Automated email notifications'
    }
];

const Landing = () => {
    return (
        <>
            <Navbar />
            <section className="hero-section w-full h-screen">
                <SimpleSlider />
            </section>

            <section className="features bg-gray-700 p-8 relative flex">
                <img 
                    src={propertyManagerImage} 
                    alt="Property Manager" 
                    className="w-1/3 h-full object-cover opacity-70 z-0"
                />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex-1">
                    <h1 className="text-white text-4xl font-bold mb-8">Why You Need Habitat?</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center">
                                <div className="mb-4">{feature.icon}</div>
                                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                                <p className="text-sm text-gray-600">{feature.tagline}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="account-management bg-gray-100 p-8 flex flex-col md:flex-row items-center">
                <div className="flex-1">
                    <div className="flex flex-col items-center mb-4">
                        <FiUser size={40} className="text-blue-600 mb-2" />
                        <h2 className="text-2xl font-bold">Streamline your Real Estate Communication Management with our Account Management Features</h2>
                    </div>
                    <p className="text-lg text-gray-700">
                        Our Account Management feature simplifies communication for both admins and tenants, ensuring efficient collaboration and seamless interaction.
                    </p>
                </div>
                <div className="flex-1 mt-8 md:mt-0 md:ml-8">
                    <img 
                        src={accountManagementImage} 
                        alt="Account Management" 
                        className="w-full h-auto object-cover"
                    />
                </div>
            </section>

            <section className="central-communication bg-gray-300 p-8 flex flex-col md:flex-row items-center">
                <div className="flex-1">
                    <p className="text-blue-600 mb-2">Connect</p>
                    <div className="flex flex-col items-center mb-4">
                        <FiMessageSquare size={40} className="text-blue-600 mb-2" />
                        <h2 className="text-2xl font-bold">Streamline Communication with Our Central Board</h2>
                    </div>
                    <p className="text-lg text-gray-700 mb-4">
                        Our Central Communication Board is designed to facilitate seamless chatting and discussion among users. Stay connected and collaborate effortlessly.
                    </p>
                    <ul className="list-disc list-inside space-y-2">
                        <li className="flex items-center">
                            <FiGrid className="mr-2 text-blue-600" /> Real-time Chatting and Discussion
                        </li>
                        <li className="flex items-center">
                            <FiGrid className="mr-2 text-blue-600" /> Efficient Collaboration and Information Sharing
                        </li>
                        <li className="flex items-center">
                            <FiGrid className="mr-2 text-blue-600" /> Enhance Communication and Teamwork
                        </li>
                    </ul>
                    <div className="flex justify-center mt-6">
                        <button className="bg-blue-600 text-white px-32 py-2 rounded-lg">Login</button>
                    </div>
                </div>
                <div className="flex-1 mt-8 md:mt-0 md:ml-8">
                    <img 
                        src={centralCommunicationImage} 
                        alt="Central Communication" 
                        className="w-full h-auto object-cover"
                    />
                </div>
            </section>

            <section className="properties bg-gray-100 p-4">
                <h2 className="text-stone-600 text-lg font-bold">Rent Properties</h2>
                <ImageContent images={Buildings} className='flex' />
                <button className="text-white w-32 text-lg border-2 border-blue-600 p-2 bg-blue-600 block m-auto rounded-lg mt-6">View All</button>
            </section>

            <section className="team bg-gray-600 p-4">
                <h2 className="text-white text-lg font-bold">Meet the Team</h2>
                <ImageContent images={Team} className='flex' />
            </section>

            <Footer />
        </>
    );
};

export default Landing;
