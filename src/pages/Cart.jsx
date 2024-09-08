import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import CartHero from '../components/CartHero';
import CartBody from '../components/CartBody';
import NavBar from '../components/NavBar';

const Cart = () => {
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
        <title>{t('cart')}</title>
      </Helmet>
      {/* <NavBar /> */}
      <CartHero />
      <CartBody />
    </>
  );
};

export default Cart;
