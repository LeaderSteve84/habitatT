import React, { useState } from 'react';
import logo from '../../assets/logo.jpeg'
import login from '../../assets/login.jpg'


export default function Login(){
    return(
        <div className="main-container min-h-screen flex flex-col bg-blue-200">
        <div className="body-container flex flex-grow mb-auto">
          <div className="background w-1/2 h-screen flex-grow">
            <img src={login} alt="Login Image" className="w-full h-full object-cover" />
          </div>
          <div className="flex-grow w-1/2 h-screen  bg-white">
            <img src={logo} alt="Logo" className="w-32 h-auto mx-auto" />
              <h3 className='text-center'>Welcome Back</h3>
              <p className='text-center '>Please enter your details</p>
        <div className="mb-4 text-center m-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mx-auto">Email</label>
            <input type="email" id="email" name="email" className="mx-auto mt-1 block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
      
      <div className="mb-4 text-center">
        <label htmlFor="password" className="mx-auto block text-sm font-medium text-gray-700">Password</label>
        <input type="password" id="password" name="password" className="mt-1 block mx-auto w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
      </div>

      <div className="flex  mb-4  justify-center">
        <input id="keepSignedIn" name="keepSignedIn" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
        <label htmlFor="keepSignedIn" className="ml-2 block text-sm text-gray-900">Keep me signed in</label>
        <a href="#" className="text-sm pl-8 underline text-indigo-600 hover:underline">Forgotten password?</a>
      </div>

      

      <button type="submit" className="w-1/2 block mx-auto bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600 mb-4">Sign In</button>

      <div className="text-center">
        <p className="text-sm text-gray-600">Don't have an account? <a href="#" className="text-indigo-600 hover:underline">Sign Up</a></p>
      </div>
          </div>
        </div>
        
        <footer className="bg-blue-200 text-center  py-6 mt-auto fixed bottom-0 left-0 right-0">
        <div className="text-sm text-gray-600">
    <span>Copyright © 2024 HabitatT. All rights reserved.</span>
    <span className="mx-4">|</span>
    <a href="mailto:info@yourcompany.com" className="text-indigo-600 hover:underline">Contact Us</a>
    <span className="mx-4">|</span>
    <a href="/privacy-policy" className="text-indigo-600 hover:underline">Privacy Policy</a>
    <span className="mx-4">|</span>
    <a href="/terms-of-use" className="text-indigo-600 hover:underline">Terms of Use</a>
  </div>
  <div className="text-sm text-gray-600 mt-4">
    <span>Follow us on social media:</span>
    <a href="https://facebook.com/yourcompany" className="text-indigo-600 hover:underline"><i className="fa-brands fa-facebook-f"></i></a>
    <a href="(link unavailable)" className="text-indigo-600 hover:underline"><i className="fa-brands fa-twitter"></i></a>
    <a href="(link unavailable)" className="text-indigo-600 hover:underline"><i className="fa-brands fa-linkedin-in"></i></a>
  </div>
        </footer>
      </div>
      
      
        
    )
}