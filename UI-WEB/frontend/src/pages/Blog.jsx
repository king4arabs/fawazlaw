import React from "react";
import BlogHero from "../components/BlogHero";
import BlogDetails from "../components/BlogDetails";
import { Helmet } from 'react-helmet';

const Blog = () => {
  return (
    <>
      <Helmet>
        <title>المدونة
        </title>
      </Helmet>
      <BlogHero />
      <BlogDetails />
    </>
  );
};

export default Blog;
