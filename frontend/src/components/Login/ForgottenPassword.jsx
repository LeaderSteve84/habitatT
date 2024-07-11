import React, { useState } from "react";
import logo from "../../assets/logo.jpeg";
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
    <div className="flex-grow w-1/2 h-screen bg-white">
      <form onSubmit={handleSubmit}>
        <img src={logo} alt="Logo" className="w-20 h-auto mx-auto mt-32" />
        <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gray-200 text-gray-600 mx-auto mt-2">
          <FaUnlock className="w-10 h-10 text-xl font-bold stroke-width-4 stroke-red" />
        </div>
        <div className="mb-4 m-2">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 pl-40 mt-10"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mx-auto mt-1 block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full md:w-80 block mx-auto bg-[#20B2AA] text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600 mb-4"
        >
          Recover Password
        </button>
      </form>
    </div>
  );
}
