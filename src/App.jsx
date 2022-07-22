import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./Components/Layot/Layout";
import AdminPage from "./Pages/AdminPage";
import CategoryPage from "./Pages/CategoryPage";
import HomePage from "./Pages/HomePage";
import NewsPage from "./Pages/NewsPage";
import PolzovatelPage from "./Pages/PolzovatelPage";
import SigninPage from "./Pages/SigninPage";
import SignupPage from "./Pages/SignupPage";

const App = () => {
  const token = useSelector((state) => state.user.token);
  const role = localStorage.getItem("role");

  if (token && role === "admin") {
    return (
      <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="SigninIn" element={<Navigate to="/" replace />} />
              <Route path="SigninUp" element={<SignupPage />} />
              <Route path="News/:id" element={<NewsPage />} />
              <Route path="category/:id" element={<CategoryPage />} />
              <Route path="admin" element={<AdminPage />} />
              <Route path="polzovatel" element={<PolzovatelPage/>}/>
            </Route>
          </Routes>
        </BrowserRouter>
      </>
    );
  }
  if (token && role !== "admin") {
    return (
      <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="SigninIn" element={<Navigate to="/" replace />} />
              <Route path="SigninUp" element={<SignupPage />} />
              <Route path="News/:id" element={<NewsPage />} />
              <Route path="category/:id" element={<CategoryPage />} />
              <Route path="admin" element={<Navigate to='/' replace  />} />

            </Route>
          </Routes>
        </BrowserRouter>
      </>
    );
  } else {
    return (
      <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="/SigninIn" element={<SigninPage />} />
              <Route path="SigninUp" element={<SignupPage />} />
              <Route path="News/:id" element={<NewsPage />} />
              <Route path="category/:id" element={<CategoryPage />} />
              <Route path="admin" element={<AdminPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </>
    );
  }
};

export default App;
