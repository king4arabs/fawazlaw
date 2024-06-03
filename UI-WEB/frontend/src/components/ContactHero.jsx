import React, {useEffect} from "react";
import { useTranslation } from 'react-i18next';
import { AiOutlineHome } from "react-icons/ai";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

const ContactHero = () => {
  const { t, i18n } = useTranslation();
  const activeLanguage = i18n.language; // 'en' or 'ar'

  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    } 
  }, []);
  return (
    <div className="w-full">
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
                href="/contacts"
                className={`flex w-fit ${activeLanguage === 'ar'? 'flex-row' : 'flex-row-reverse'} gap-2 items-center text-end justify-end`}
              >
                <h1>  {t('contact us')}</h1>
                {activeLanguage === 'ar' ? <FaAngleLeft /> : <FaAngleRight />}
                <AiOutlineHome />
              </a>
            </div>
          <div className=" pt-4">
            <h1 className={`" lg:text-[50px] text-4xl text-[#003E6F] ${activeLanguage === 'ar' ? 'text-end' : ''} font-bold pb-2"`}>
            {t('contact us')}
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
      
      <div className="w-full mx-auto">
        <div className=" w-full mx-auto flex flex-col justify-center items-center relative lg:pb-16 lg:pt-10">
          <div className="w-[80%]">
            <img src="\Images\mapback.png" alt="" className="" />
          </div>
        </div>
      </div>
      <div>
        <div className=" w-[80%] mx-auto grid gap-3 just grid-cols-1 lg:grid-cols-3 my-12 ">
          <div className=" gap-2 text-end flex flex-col w-full justify-center items-center">
            <div className=" w-fit items-end">
              <h1 className=" font-bold text-2xl">{t('help')}</h1>
              <p className="py-2">{t('helpDetails')}.</p>
              <h4 className=" text-xl font-bold text-[#003E6F] ">
                info@fawazlaw.sa
              </h4>
            </div>
          </div>
          <div className=" flex flex-col gap-2">
            <h1 className=" text-xl font-bold text-end">{t("title")}</h1>
            <div className=" flex flex-row gap-2">
              <div className=" flex flex-col text-end justify-end w-full">
                <p className=" text-base font-bold text-end">{t('riyadh')}</p>
                <p className=" text-[14px] text-end">
                  {t('riyadhLocation')}
                </p>
              </div>
              <img
                src="\Images\marker-pin-05ddddd.png"
                className="w-4 h-4"
                alt=""
              />
            </div>
            <div className=" flex flex-row gap-2 w-full">
              <div className=" flex flex-col text-end justify-end w-full">
                <p className=" text-base font-bold text-end">{t('Jeddah')}</p>
                <p className=" text-[14px] text-end">
                  {t('jeddahLocation')}
                </p>
              </div>
              <img
                src="\Images\marker-pin-05ddddd.png"
                className="w-4 h-4"
                alt=""
              />
            </div>
          </div>
          <div className=" gap-2 text-end flex flex-col w-full justify-center items-center">
            <div className=" w-[230px] items-end">
              <h1 className=" font-bold text-2xl">{t('cellphone')}</h1>
              <p className="py-2">
                {t('cellDetails')}
              </p>
              <h4 className=" text-xl font-bold text-[#003E6F] ">
                +966920013767
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactHero;
