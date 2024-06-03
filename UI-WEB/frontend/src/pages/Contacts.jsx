import React, {useEffect} from "react";
import { useTranslation } from 'react-i18next';
import ContactHero from "../components/ContactHero";
import ContactForm from "../components/ContactForm";
import { Helmet } from "react-helmet";

const Contacts = () => {
  const { t, i18n } = useTranslation();
  const activeLanguage = i18n.language; // 'en' or 'ar'

  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    } 
  }, []);
  return (
    <div>
      <Helmet>
        <title>{t('contact us')}
        </title>
      </Helmet>
      <ContactHero />
      <ContactForm />
    </div>
  );
};

export default Contacts;
