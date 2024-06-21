import React, { useState } from 'react';
import logo from '../../assets/logo.jpeg'
import login from '../../assets/login.jpg'


export default function Login(){
    return(
        <div className="main-container bg-gray-200 min-h-screen flex flex-col">
        <div className="body-container flex bg-gray-200">
          <div className="background flex-none">
            <img src={login} alt="Login Image" className="w-64 h-auto" />
          </div>
          <div className="flex-none  bg-white">
            <img src={logo} alt="Logo" className="w-32 h-auto" />
              <h3>Welcome Back</h3>
              <p>Please enter your details</p>
        <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" id="email" name="email" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
      
      <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
        <input type="password" id="password" name="password" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
      </div>

      <div className="flex items-center mb-4">
        <input id="keepSignedIn" name="keepSignedIn" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
        <label htmlFor="keepSignedIn" className="ml-2 block text-sm text-gray-900">Keep me signed in</label>
      </div>

      <div className="text-right mb-4">
        <a href="#" className="text-sm text-indigo-600 hover:underline">Forgotten password?</a>
      </div>

      <button type="submit" className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600 mb-4">Sign In</button>

      <div className="text-center">
        <p className="text-sm text-gray-600">Don't have an account? <a href="#" className="text-indigo-600 hover:underline">Sign Up</a></p>
      </div>
              

          </div>
        </div>
        
        <footer className="bg-blue-200 text-center  py-12 absolute bottom-0 left-0 right-0">
          <h1>Hello</h1>
        </footer>
      </div>
      
      
        
    )
}