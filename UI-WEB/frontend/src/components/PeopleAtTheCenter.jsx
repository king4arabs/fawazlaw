import React, {useEffect} from "react";
import { useTranslation } from 'react-i18next';

const PeopleAtTheCenter = () => {
  const { t, i18n } = useTranslation();
  const activeLanguage = i18n.language; // 'en' or 'ar'

  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    } 
  }, []);
  return (
    <div className=" w-full flex bg-bggradient2 justify-center flex-col">
      <div className=" flex flex-col justify-center items-center w-[80%] gap-7  bg-transparent mx-auto  py-10 ">
        <div className=" items-center">
          <h1 className=" text-[48px] text-center">{t('recommendation')}</h1>
          <p className=" text base text-[#667085]  text-center">{t('findWhatOurCustomersAreSaying')}</p>
        </div>
        <div className=" text-center text-base lg:w-[600px] text-[#000929] font-thin">
          {t('peopleAtTheCenterMain')}
        </div>
        <p className=" font-medium text-[#000929]">
          {t('Muhammad Al-Salami')} <span className=" font-thin text-[#667085]">{t('information')} </span>
        </p>
        <div className="flex flex-row gap-4 justify-center items-center">
          <img src="\Images\Imageman.png" alt="" />
          <img src="\Images\Imagegirl.png" alt="" />
          <img src="\Images\Group 14073lined.png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default PeopleAtTheCenter;
