import React from 'react';
import { useTranslation } from 'react-i18next';

const WireTransferDetails = () => {
  const { t, i18n } = useTranslation();
  const activeLanguage = i18n.language; // 'en' or 'ar'
  return (
    <div className="flex justify-center">
      <div
        className={`flex flex-col border rounded p-2 md:p-5 w-[90%] my-5 ${
          activeLanguage === 'en' ? 'items-start' : 'items-end'
        }`}
      >
        <p className="mb-4">{t('wire_trasnfer_title')}</p>
        <div
          className={`flex ${
            activeLanguage === 'en'
              ? 'flex-col md:flex-row'
              : 'flex-col md:flex-row-reverse'
          } mb-4`}
        >
          <p>{t('wire_trasnfer_bank_account_title_key')}</p>
          <p
            className={`${
              activeLanguage === 'en' ? 'ml-0 md:ml-2' : 'mr-0 md:mr-2'
            }`}
          >
            {t('wire_trasnfer_bank_account_title_value')}
          </p>
        </div>
        <div
          className={`flex ${
            activeLanguage === 'en'
              ? 'flex-col md:flex-row'
              : 'flex-col md:flex-row-reverse'
          } mb-4`}
        >
          <p>{t('wire_trasnfer_bank_account_no_key')}</p>
          <p
            className={`${
              activeLanguage === 'en' ? 'ml-0 md:ml-2' : 'mr-0 md:mr-2'
            }`}
          >
            1392148609940
          </p>
        </div>
        <div
          className={`flex ${
            activeLanguage === 'en'
              ? 'flex-col md:flex-row'
              : 'flex-col md:flex-row-reverse'
          } mb-4`}
        >
          <p>{t('wire_trasnfer_bank_iban_key')}</p>
          <p
            className={`${
              activeLanguage === 'en' ? 'ml-0 md:ml-2' : 'mr-0 md:mr-2'
            }`}
          >
            SA4520000001392148609940
          </p>
        </div>
        <div
          className={`flex ${
            activeLanguage === 'en'
              ? 'flex-col md:flex-row'
              : 'flex-col md:flex-row-reverse'
          } mb-4`}
        >
          <p>{t('wire_trasnfer_bank_name_key')}</p>
          <p
            className={`${
              activeLanguage === 'en' ? 'ml-0 md:ml-2' : 'mr-0 md:mr-2'
            }`}
          >
            {t('wire_trasnfer_bank_name_value')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WireTransferDetails;
