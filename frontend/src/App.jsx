import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./landingPage/Landing";
import Login from "./Login/Login";
import ForgetPassword from "./Login/ForgetPassword"; // Corrected import path

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forget_password" element={<ForgetPassword />} /> {/* Ensure this matches the Link */}
      </Routes>
    </Router>
  );
};

export default App;
