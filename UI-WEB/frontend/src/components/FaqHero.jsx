import React, {useEffect} from "react";
import { useTranslation } from 'react-i18next';
import { AiOutlineHome } from "react-icons/ai";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

const FaqHero = () => {
  const { t, i18n } = useTranslation();
  const activeLanguage = i18n.language; // 'en' or 'ar'

  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    } 
  }, []);
  return (
    <div className="hello overflow-hidden w-full bg-bggradient justify-center items-center relative  lg:pb-10 lg:pt-10">
      <img
        src="\Images\bgservices.png"
        alt=""
        className=" absolute z-0 bottom-0 opacity-5"
      />
      <div className=" w-[90%] flex h-full lg:flex-row mx-auto lg:justify-end z-10 flex-col lg:items-center">
        <div className=" gap-2 w-full flex flex-col z-10 pb-9">
        <div className={`flex flex-row gap-2 items-center ${activeLanguage === 'ar' ? 'text-end justify-end pr-6' : 'pl-6'}  `}>
              <a
                href="/faq"
                className={`flex w-fit ${activeLanguage === 'ar'? 'flex-row' : 'flex-row-reverse'} gap-2 items-center text-end justify-end`}
              >
                <h1>  {t('faq')}</h1>
                {activeLanguage === 'ar' ? <FaAngleLeft /> : <FaAngleRight />}
                <AiOutlineHome />
              </a>
            </div>
          <div className=" pt-4">
            <h1 className={`" lg:text-[50px] text-4xl text-[#003E6F] ${activeLanguage === 'ar' ? 'text-end' : ''} font-bold pb-2"`}>
            {t('faq')}
            </h1>
          </div>
          <div className={`justify-end ${activeLanguage === 'ar' ? 'text-end' : ''}`}>
            <p className=" text-[20px] font-normal pt-3">
              {t('contactHeroSub')}
            </p>
          </div>
        </div>
      </div>
      </div>
      
  );
};

export default FaqHero;
