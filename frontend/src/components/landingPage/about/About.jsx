import React from 'react';
import Mission from './Mission';
import Challenge from './Challenge';
import Solution from './Solution';
import Features from './Features';
import Benefits from './Benefits';
import JoinUs from './JoinUs';
import Navbar from '../Navbar';

export default function About() {
    return (
    <div className='bg-acent50'>
        <Navbar />
        <div className="container mx-auto p-4">
            <h1 className="text-4xl font-bold mb-6 text-center">About HabitatT</h1>
            <p className="text-lg mb-6">
                Welcome to our real estate communication management system! We're passionate about revolutionizing how real estate professionals, tenants, and property managers communicate. Our goal is to streamline communication, enhance transparency, and improve overall efficiency in the industry.
            </p>
            <Mission />
            <Challenge />
            <Solution />
            <Features />
            <Benefits />
            <JoinUs />
        </div>
    </div>
    );
};

