import React, {useEffect} from "react";
import { useTranslation } from 'react-i18next'; 
import { useNavigate } from 'react-router-dom';


const Hero = () => {
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
    <div className=" overflow-hidden w-full bg-bggradient justify-center items-center lg:h-[83vh] relative">
      <img
        src="\Images\bgvector.png"
        alt=""
        className=" absolute z-0 bottom-0 opacity-5"
      />
      <div className={`w-[90%] flex h-full gap-10 lg:flex-row mx-auto z-10 flex-col lg:items-center py-10`}>
        <div className={` ${activeLanguage == "en"? 'order-2': 'order-0'}`}>
          <img src="\Images\herolawer.png" alt="lawerPhoto" />
        </div>
        <div className=" gap-9 lg:w-[65%]  flex flex-col z-10">
          <div>
            <h3 className={`text-[24px] text-[#003E6F] font-medium text-end ${activeLanguage == "en"? 'hidden ': ''}`}>
              شركة
            </h3>
            <h1 className={`lg:text-[50px] mt-4 text-4xl text-[#003E6F] font-black ${activeLanguage == 'ar'? 'text-end': 'text-start  leading-tight' }`}>
            {t('homeTitle')}
            </h1>
          </div>
          <div className={` lg:w-[660px] justify-end ${activeLanguage == 'ar'? 'text-end': 'text-start' }`}>
            <p className="text-[24px] leading-10 font-normal ">
            {t('homeDetails')}
            </p>
          </div>
          <div className={`flex flex-row gap-3 ${activeLanguage == 'ar'? 'justify-end': 'justify-start'}`}>
            <button 
            onClick={() => navigate('/contacts')}
            className={`px-5 py-2 flex border rounded-lg bg-[#003E6F] text-white items-center gap-[1px] ${activeLanguage == 'ar'? 'order-0' : 'order-2'}`}>
            {t('homeConnectWithUsButton')}
            </button>
            <button onClick={() => navigate('/services')} className="px-5 py-2 flex border rounded-lg  text-[#3E4450] items-center gap-[1px]">
            {t('homeLearnMoreButton')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
