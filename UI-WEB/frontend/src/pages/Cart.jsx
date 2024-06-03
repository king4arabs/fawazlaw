import React, {useEffect} from "react";
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import CartHero from "../components/CartHero";
import CartBody from "../components/CartBody";

const Cart = () => {
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
        <title>{t('cart')}
        </title>
      </Helmet>
      <CartHero />
      <CartBody />
      </>
  );
};

export default Cart;
