import React, { useState } from "react";
import logo from "../../assets/logo.jpeg";
import { FaUser } from "react-icons/fa";

export default function Login({ toggleForm }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const defaultLoginDetails = {
    email: "default_email@example.com",
    password: "default_password",
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      email === defaultLoginDetails.email &&
      password === defaultLoginDetails.password
    ) {
      console.log("Login successful!");
      console.log('email:' + email)
      console.log('password:' + password)
    } else {
      console.log("Invalid email or password");

    }
  };

  return (
    <form
      action=""
      className="flex-grow w-1/2 h-screen  bg-white"
      onSubmit={handleSubmit}
    >
      <img src={logo} alt="Logo" className="w-20 h-auto mx-auto mt-10" />
      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 text-gray-600 mx-auto mt-6">
        <FaUser className="w-6 h-6" />
      </div>
      <p className="text-center ">LOGIN</p>
      <div className="mb-4 text-center m-2">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mx-auto"
        >
          Email
        </label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          id="email"
          name="email"
          className="mx-auto mt-1 block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <div className="mb-4 text-center">
        <label
          htmlFor="password"
          className="mx-auto block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          id="password"
          name="password"
          className="mt-1 block mx-auto w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <div className="flex  mb-4  justify-center">
        <input
          id="keepSignedIn"
          name="keepSignedIn"
          type="checkbox"
          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        />
        <label
          htmlFor="keepSignedIn"
          className="ml-2 block text-sm text-gray-900"
        >
          Keep me signed in
        </label>
        <a
          href="#"
          className="text-sm pl-8 underline text-indigo-600 hover:underline"
          onClick={toggleForm}
        >
          Forgotten password?
        </a>
      </div>
      <div className="flex justify-center mb-2">
        <select
          defaultValue="Selectb role"
          name="role"
          id="role"
          className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/4 p-2.5"
        >
          <option value="admin">Admin</option>
          <option value="tenant">Tenant</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-200 block mx-auto bg-[#20B2AA] text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600 mb-4"
      >
        Sign In
      </button>
    </form>
  );
}
