import { Navigate, Route, Router, Routes } from "react-router-dom";
import FooterMain from "./components/FooterMain";

import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import WhatWeDo from "./pages/WhatWeDo";
import Services from "./pages/Services";
import Blog from "./pages/Blog";
import Faq from "./pages/Faq";
import Contacts from "./pages/Contacts";
import TermsAndConditions from "./pages/TermsAndConditions";
import PrivacyAndPolic from "./pages/PrivacyAndPolic";
import Login from "./pages/Login";
// import AdminNav from "./components/AdminNav";
import AddArticle from "./components/dashboard/AddArticle";
import AdminLayout from "./components/dashboard/AdminLayout";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./components/NotFound";
import AddServices from "./components/dashboard/AddServices";
import ManageServices from "./components/dashboard/ManageServices";
import ManageArticles from "./components/dashboard/ManageArticles";
import ArticleDetails from "./components/ArticleDetails";
import AllServices from "./components/AllServices";
import ServiceDetails from "./components/ServiceDetails";
import Cart from "./pages/Cart";
import CardViewPayment from "./components/CardViewPayment";

function App() {
  // const user = JSON.parse(localStorage.getItem("token"));
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [language, setLanguage] = useState('en'); // Default to English

  const changeLanguage = (lang) => {
    setLanguage(lang);
    // Optionally, save the language preference in localStorage or a backend
  };

  useEffect(() => {
    const existCart = JSON.parse(localStorage.getItem("cartItems"));
    const count = document.getElementById("cartCount");
    if (count) {
      count.innerHTML = existCart?.length ?? 0;
    }
  }, []);

  return (
    <>
      <Toaster />
      <div className=" overflow-hidden">
      <NavBar changeLanguage={changeLanguage} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/whatwedo" element={<WhatWeDo />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:id" element={<ServiceDetails />} />
          <Route path="/allServices" element={<AllServices />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<ArticleDetails />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/payment" element={<CardViewPayment />} />
          <Route
            path="/login"
            element={
              <Login setIsLoggedin={setIsLoggedin} isLoggedin={isLoggedin} />
            }
          />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/contacts/tandc" element={<TermsAndConditions />} />
          <Route path="/contacts/privacyPolicy" element={<PrivacyAndPolic />} />
          <Route
            path="/dashboard"
            element={<ProtectedRoute children={<AdminLayout />} />}
          >
            <Route path="addarticle" element={<AddArticle />} />
            <Route path="addservice" element={<AddServices />} />
            <Route path="manageservices" element={<ManageServices />} />
            <Route path="managearticles" element={<ManageArticles />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
        <FooterMain />
      </div>
    </>
  );
}

export default App;
