import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import FaqHero from '../components/FaqHero';
import FaqComponent from '../components/FaqComponent';
import { Helmet } from 'react-helmet';
import NavBar from '../components/NavBar';

const Faq = () => {
  const { t, i18n } = useTranslation();
  const activeLanguage = i18n.language; // 'en' or 'ar'

  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, []);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);
  return (
    <>
      <Helmet>
        <title>{t('faq')}</title>
      </Helmet>
      {/* <NavBar /> */}
      <FaqHero />
      <FaqComponent />
    </>
  );
};

export default Faq;
