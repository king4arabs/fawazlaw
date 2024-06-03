import React, {useEffect} from "react";
import { useTranslation } from 'react-i18next';
import EachFaq from "./EachFaq";

const FaqComponent = () => {
  const { t, i18n } = useTranslation();
  const activeLanguage = i18n.language; // 'en' or 'ar'

  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    } 
  }, []);
  return (
    <div className=" w-full my-16">
      <h1 className="flex justify-center text-[30px] font-bold pb-5">{t('faqTitle')}</h1>
      <div className=" flex flex-col justify-center mx-auto lg:w-[60%] w-[80%] gap-2 py-5 px-5 border rounded-lg">
        <EachFaq
          title={t('faq1')}
          answer={
            t('faq1ans')
          }
        />
        <EachFaq
          title={
            t('faq2')
          }
          answer={
            t('faq2ans')
          }
        />
        <EachFaq
          title={t('faq3')}
          answer={
            t('faq3ans')
          }
        />
        <EachFaq
          title={t('faq4')}
          answer={
            t('faq4ans')
          }
        />
      </div>
    </div>
  );
};

export default FaqComponent;
