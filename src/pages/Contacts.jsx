import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ContactHero from '../components/ContactHero';
import ContactForm from '../components/ContactForm';
import { Helmet } from 'react-helmet';
import NavBar from '../components/NavBar';

const Contacts = () => {
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
    <div>
      <Helmet>
        <title>{t('contact us')}</title>
      </Helmet>
      {/* <NavBar /> */}
      <ContactHero />
      <ContactForm />
    </div>
  );
};

export default Contacts;
