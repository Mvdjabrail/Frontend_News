import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Components/Layot/Layout";
import CategoryPage from "./Pages/CategoryPage";
import HomePage from "./Pages/HomePage";
import NewsPage from "./Pages/NewsPage";
import SigninPage from "./Pages/SigninPage";
import SignupPage from "./Pages/SignupPage";

const App = () => {
  return (
    // <BrowserRouter>


    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="SigninIn" element={<SigninPage />} />
          <Route path="SigninUp" element={<SignupPage />} />
          <Route path="News/:id" element={<NewsPage />} />
          <Route path="category/:id" element={<CategoryPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
