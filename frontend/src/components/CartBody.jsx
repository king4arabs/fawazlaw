import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import CartForm from './CartForm';
import CartItems from './CartItems';

const CartBody = () => {
  const { t, i18n } = useTranslation();
  const activeLanguage = i18n.language; // 'en' or 'ar'

  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, []);
  return (
    <div
      className={`w-full pt-5 flex ${
        activeLanguage === 'ar' || activeLanguage === 'ur'
          ? 'flex-col md:flex-row'
          : 'flex-col md:flex-row-reverse'
      }`}
    >
      <div className="left w-[100%] md:w-[50%]">
        <CartForm />
      </div>
      <div className="right w-[100%] md:w-[50%]">
        <CartItems />
      </div>
    </div>
  );
};

export default CartBody;
