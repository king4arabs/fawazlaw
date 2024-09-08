import React from 'react';
import { useTranslation } from 'react-i18next';

const PaymentPageTitle = () => {
  const { t, i18n } = useTranslation();
  const activeLanguage = i18n.language; // 'en' or 'ar'
  return (
    <h1
      className={`w-[90%] ${
        activeLanguage === 'ar' || activeLanguage === 'ur' ? 'text-end' : 'pl-6'
      } pb-5 font-bold text-[22px]`}
    >
      {t('cartFormTitle')}
    </h1>
  );
};

export default PaymentPageTitle;
