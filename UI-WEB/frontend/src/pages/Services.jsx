import React, {useEffect} from "react";
import { useTranslation } from 'react-i18next';
import ServicesHero from "../components/ServicesHero";
import DarkblueSection from "../components/DarkblueSection";
import HomeSection3 from "../components/HomeSection3";
import Truts from "../components/Truts";
import PeopleAtTheCenter from "../components/PeopleAtTheCenter";
import ServiceCards from "../components/ServiceCards";
import { Helmet } from 'react-helmet';

const Services = () => {
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
        <title>{t('services')}
        </title>
      </Helmet>
      <ServicesHero />
      <ServiceCards />
      <HomeSection3 />
      {/* <DarkblueSection /> */}
      <Truts />
      <PeopleAtTheCenter />
    </>
  );
};

export default Services;
