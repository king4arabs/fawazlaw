import React, {useEffect} from "react";
import { useTranslation } from 'react-i18next';
import BlogHero from "../components/BlogHero";
import BlogDetails from "../components/BlogDetails";
import { Helmet } from 'react-helmet';

const Blog = () => {
  const { t, i18n } = useTranslation();
  const activeLanguage = i18n.language; // 'en' or 'ar'

  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    } 
  }, []);
  return (
    <>
      <Helmet>
        <title>{t('blogs')}
        </title>
      </Helmet>
      <BlogHero />
      <BlogDetails />
    </>
  );
};

export default Blog;
