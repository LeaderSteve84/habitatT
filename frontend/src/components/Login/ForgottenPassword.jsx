import React, { useState } from "react";
import logo from "../../assets/logo.png";
import forgot from "../../assets/forgot-password.avif";
import { FaUnlock } from 'react-icons/fa';

const FORGET_PASSWORD_URL = '/api/forget_password';

export default function ForgetPassword({ toggleForm }) {
  const [email, setEmail] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const response = await fetch(FORGET_PASSWORD_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Failed to recover password');
      }

      // Handle success, e.g., show a success message or redirect
      console.log('Password recovery request successful');
    } catch (error) {
      console.error('Error recovering password:', error.message);
      // Handle error, e.g., show an error message to the user
    }
  };

  return (
    <div className="flex h-screen bg-white">
      <div className="w-1/2">
        <img src={forgot} alt="Logo" className="w-full h-full object-cover" />
      </div>
      <div className="flex-grow w-1/2 flex items-center justify-center bg-gray-300">

        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <img src={logo} alt="Logo" className="w-20 h-auto mx-auto mt-10" />
          <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gray-200 text-gray-600 mx-auto mt-2">
            <FaUnlock className="w-10 h-10 text-xl font-bold stroke-width-4 stroke-red" />
          </div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900 mt-4"> Forgot Password </h2> 

          <div className="mb-4 mt-10">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#20B2AA] text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600 mb-4"
          >
            Recover Password
          </button>
        </form>
      </div>
    </div>
  );
}
