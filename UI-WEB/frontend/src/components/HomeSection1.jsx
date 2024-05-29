import React, {useEffect} from "react";
import { FaRegArrowAltCircleLeft, FaRegArrowAltCircleRight } from "react-icons/fa";
import { TiTick } from "react-icons/ti";
import HomeSection1Cards from "./HomeSection1Cards";
import { useTranslation } from 'react-i18next'; 
import { useNavigate } from 'react-router-dom';

const HomeSection1 = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const activeLanguage = i18n.language; // 'en' or 'ar'

  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, []);

  return (
    <div className="w-full my-20 px-14">
      <div className="w-[100%]">
      <div className="w-full flex flex-col">
      <div className={`subsection flex justify-between items-start`}>
        <div className={`arrowAndbutton flex items-center gap-1 pt-2 pl-2 ${activeLanguage == "ar"? 'order-0' : 'order-2'}`}>
          {activeLanguage == 'ar'? (<FaRegArrowAltCircleLeft size={23} className={`${activeLanguage == 'ar'? 'order-0' : 'order-2'}`} />) : (<FaRegArrowAltCircleRight size={23} className={`${activeLanguage == 'ar'? 'order-0' : 'order-2'}`} />)}
          <p className="lg:text-[14px] font-bold">{t('all services')}</p>
        </div>
        <h1 className="lg:text-[35px] text-4xl font-bold w-fit pb-3">
          {t('homeSection1Title')}
        </h1>
      </div>
      <p className={`"text-[16px] xl:mt-4 mt-1" ${activeLanguage == "ar"? 'ml-auto' : ''}`}>
        {t('homeSection1Description')}
      </p>
    </div>
      <HomeSection1Cards/>
      </div>
    </div>
  );
};

export default HomeSection1;
