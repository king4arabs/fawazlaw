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
import { useState } from "react";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./components/NotFound";
import AddServices from "./components/dashboard/AddServices";
import ManageServices from "./components/dashboard/ManageServices";
import ManageArticles from "./components/dashboard/ManageArticles";
import ArticleDetails from "./components/ArticleDetails";
import AllServices from "./components/AllServices";

function App() {
  // const user = JSON.parse(localStorage.getItem("token"));
  const [isLoggedin, setIsLoggedin] = useState(false);
  return (
    <>
      <Toaster />
      <div className=" overflow-hidden">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/whatwedo" element={<WhatWeDo />} />
          <Route path="/services" element={<Services />} />
          <Route path="/allServices" element={<AllServices />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<ArticleDetails />} />
          <Route path="/faq" element={<Faq />} />
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
