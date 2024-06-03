import React, {useEffect} from "react";
import { useTranslation } from 'react-i18next';
import Marquee from "react-fast-marquee";
import { AiOutlineHome } from "react-icons/ai";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
const WhatWedoHero = () => {
  const { t, i18n } = useTranslation();
  const activeLanguage = i18n.language; // 'en' or 'ar'

  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    } 
  }, []);
  return (
    <>
      <div className=" overflow-hidden w-full bg-bggradient justify-center items-center lg:h-[83vh] relative mb-10 pb-14">
        <img
          src="\Images\whatwedobg.png"
          alt=""
          className=" absolute z-0 bottom-0 opacity-5"
        />
        <div className={`w-[80%] flex h-full  ${activeLanguage === 'ar' ? 'lg:flex-row' : 'lg:flex-row-reverse'} mx-auto lg:justify-between z-10 flex-col lg:items-center`}>
          <div className=" flex z-10 lg:max-w-[40%]">
            <img src="\Images\Group.png" alt="lawerPhoto" />
          </div>
          <div className={`gap-9 lg:w-[60%] flex flex-col z-10 ${activeLanguage === 'ar' ? 'text-end items-end' : ''}`}>
            <div className={`flex gap-2 items-center ${activeLanguage === 'ar' ? 'text-end justify-end pr-6' : 'pl-6'} `}>
              <a
                href="/"
              className={`flex w-fit ${activeLanguage === 'ar' ? 'flex-row' : 'flex-row-reverse'} gap-2 items-center text-end justify-end `}
              >
                <h1>{t('about us')}</h1>
                {activeLanguage === 'ar' ? <FaAngleLeft /> : <FaAngleRight />}
                <AiOutlineHome />
              </a>
            </div>
            <div className=" gap-5 flex flex-col">
              <h3 className={`lg:text-[50px] text-4xl text-[#003E6F] font-medium ${activeLanguage === 'ar' ? 'text-end ': ''}`}>
                {t('about us')}
              </h3>
              <h1 className={`lg:text-[16px] text-xl  ${activeLanguage === 'ar' ? '' : ''}`}>
                {t('aboutUsTitle')}
              </h1>
            </div>
            <div className=" lg:w-[580px] ">
              <p className={` ${activeLanguage === 'ar' ? 'text-[24px] leading-10' : 'text-[20px]'}  font-normal`}>
              {t('aboutUsSubtitle')}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className=" flex flex-row gap-6 mx-auto justify-center items-center lg:-mt-40 -mt-20 z-50  ml-16 pb-10 pt-16">
        <Marquee
          className=""
          pauseOnClick={true}
          pauseOnHover={true}
          speed={100}
          loop={100}
        >
          <div className=" flex flex-col gap-5 px-10 w-[170px] h-[230px] py-10 justify-end items-end bg-white shadow-2xl rounded-lg mx-6 mb-4">
            <img
              src="\Images\Frame 1000003323graph.png"
              className={`w-20 h-20 ${activeLanguage === 'ar' ? 'text-end' : 'text-center'}`}
              alt=""
            />
            <h1 className={`font-bold ${activeLanguage === 'ar' ? 'text-end' : 'text-center'}`}>{t('road')}</h1>
          </div>
          <div className=" flex flex-col gap-5 px-10 w-[170px] h-[230px] py-10 justify-end items-end bg-white shadow-2xl rounded-lg mx-6">
            <img
              src="\Images\Frame 1000003323bookandpen.png"
              className={`w-20 h-20 ${activeLanguage === 'ar' ? 'text-end' : 'text-center'}`}
              alt=""
            />
            <h1 className={`font-bold ${activeLanguage === 'ar' ? 'text-end' : 'text-center'}`}>{t('intellectual property')}</h1>
          </div>
          <div className=" flex flex-col gap-5 px-10 w-[170px] h-[230px] py-10 justify-end items-end bg-white shadow-2xl rounded-lg mx-6">
            <img
              src="\Images\Frame 1000003323bot (1).png"
              className={`w-20 h-20 ${activeLanguage === 'ar' ? 'text-end' : 'text-center'}`}
              alt=""
            />
            <h1 className={`font-bold ${activeLanguage === 'ar' ? 'text-end' : 'text-center'}`}>{t("legal novel")}</h1>
          </div>
          <div className=" flex flex-col gap-5 px-10 w-[170px] h-[230px] py-10 justify-end items-end bg-white shadow-2xl rounded-lg mx-6">
            <img
              src="\Images\Frame 1000003323jotter (1).png"
              className={`w-20 h-20 ${activeLanguage === 'ar' ? 'text-end' : 'text-center'}`}
              alt=""
            />
            <h1 className={`font-bold ${activeLanguage === 'ar' ? 'text-end' : 'text-center'}`}>{t('dictations of bankruptcy')}</h1>
          </div>
          <div className=" flex flex-col gap-5 px-10 w-[170px] h-[230px] py-10 justify-end items-end bg-white shadow-2xl rounded-lg mx-6">
            <img
              src="\Images\Frame 1000003323searchman.png"
              className={`w-20 h-20 ${activeLanguage === 'ar' ? 'text-end' : 'text-center'}`}
              alt=""
            />
            <h1 className={`font-bold ${activeLanguage === 'ar' ? 'text-end' : 'text-center'}`}>
              {t('Legal advice')}
            </h1>
          </div>
          <div className=" flex flex-col gap-5 px-10 w-[170px] h-[230px] py-10 justify-end items-end bg-white shadow-2xl rounded-lg mx-6">
            <img
              src="\Images\Frame 1000003324lawbalance.png"
              className={`w-20 h-20 ${activeLanguage === 'ar' ? 'text-end' : 'text-center'}`}
              alt=""
            />
            <h1 className={`font-bold ${activeLanguage === 'ar' ? 'text-end' : 'text-center'}`}>{t('Law firm')}</h1>
          </div>
        </Marquee>
      </div>
    </>
  );
};

export default WhatWedoHero;
