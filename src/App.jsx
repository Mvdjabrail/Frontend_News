import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import SigninPage from "./Pages/SigninPage";
import SignupPage from "./Pages/SignupPage";

const App = () => {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/SigninIn" element={<SigninPage />} />
          <Route path="/SigninUp" element={<SignupPage />} />
        </Routes>
      </BrowserRouter>
  );
};

export default App;
