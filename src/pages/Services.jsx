import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ServicesHero from '../components/ServicesHero';
import DarkblueSection from '../components/DarkblueSection';
import HomeSection3 from '../components/HomeSection3';
import Truts from '../components/Truts';
import PeopleAtTheCenter from '../components/PeopleAtTheCenter';
import ServiceCards from '../components/ServiceCards';
import { Helmet } from 'react-helmet';
import withProvider, { useCart } from '../context/CartContext';
import NavBar from '../components/NavBar';

const Services = () => {
  const { t, i18n } = useTranslation();
  const activeLanguage = i18n.language; // 'en' or 'ar'
  const { cart, dispatch } = useCart();

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
  useEffect(() => {
    console.log({ cartInSerPage: cart });
  }, [cart]);
  return (
    <>
      <Helmet>
        <title>{t('services')}</title>
      </Helmet>
      {/* <NavBar /> */}
      <ServicesHero />
      {/* <ServiceCards /> */}
      <HomeSection3 />
      {/* <DarkblueSection /> */}
      <Truts />
      <PeopleAtTheCenter />
    </>
  );
};

// export default withProvider(Services)();
export default Services;
