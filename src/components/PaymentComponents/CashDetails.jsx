import React from 'react';
import { useTranslation } from 'react-i18next';

const CashDetails = () => {
  const { t, i18n } = useTranslation();
  const activeLanguage = i18n.language; // 'en' or 'ar'
  return (
    <div className="flex justify-center">
      <div
        className={`flex flex-col border rounded p-2 md:p-5 w-[90%] my-5 ${
          activeLanguage === 'en' ? 'items-start' : 'items-end'
        }`}
      >
        {/* <p className="mb-4">{t('wire_trasnfer_title')}</p> */}
        <p className="mb-4">{t('cashPayment.locationkey')}</p>
        <div
          className={`flex ${
            activeLanguage === 'en'
              ? 'flex-col md:flex-row'
              : 'flex-col md:flex-row-reverse'
          } mb-4`}
        >
          <p>{t('cashPayment.address1')}</p>
        </div>
        <div
          className={`flex ${
            activeLanguage === 'en'
              ? 'flex-col md:flex-row'
              : 'flex-col md:flex-row-reverse'
          } mb-4`}
        >
          <p>{t('cashPayment.address2')}</p>
        </div>
      </div>
    </div>
  );
};

export default CashDetails;
