import React, {useEffect} from "react";
import { useTranslation } from 'react-i18next';
import LawServices from "./LawServices";
import Truts from "./Truts";
import PeopleAtTheCenter from "./PeopleAtTheCenter";
import Whatwedo from "./Whatwedo";

const WhatweDoSection2 = () => {
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
      <div className=" w-full flex my-9">
        <div className={` w-[90%] justify-between mx-auto items-center flex  ${activeLanguage === 'ar' ? 'lg:flex-row' : 'lg:flex-row-reverse'} flex-col-reverse gap-16 pb-11`}>
          <div className=" flex flex-col lg:w-[550px] gap-6">
            <h1 className={`font-bold text-4xl ${activeLanguage === 'ar' ? 'text-end' : ''}`}>{t('whatWeDoTitle')}</h1>
            <p className={` ${activeLanguage === 'ar' ? 'text-end' : ''} lg:w-[550px] text-[20px]`}>
              {t('whatWeDoText')}
            </p>
          </div>
          <div className="flex pl-9">
            <img src="\Images\Illustration.png" alt="" />
          </div>
        </div>
      </div>

      {/* another section here */}

      <div className=" w-full flex my-9">
        <div className={`w-[90%] justify-between mx-auto items-center flex  ${activeLanguage === 'ar' ? 'lg:flex-row' : 'lg:flex-row-reverse'} flex-col gap-9`}>
          <div className="flex">
            <img src="\Images\Mask Group.png" alt="" />
          </div>
          <div className=" flex flex-col lg:w-[550px] gap-6">
            <h1 className={`font-bold text-4xl ${activeLanguage === 'ar' ? 'text-end' : ""}`}>
              {t('whatWeDoFounderTitle')}
            </h1>
            <p className={`${activeLanguage === 'ar' ? 'text-end' : ''} lg:w-[550px] text-[20px]`}>
              {t('whatWeDoFounderText')}
            </p>
          </div>
        </div>
      </div>

      {/* another section here */}

      <div className="w-full flex py-20 my-20">
        <div className=" w-[90%] flex lg:flex-row flex-col gap-8 mx-auto justify-center items-center">
          <div className="gap-3 flex flex-col w-[308px] items-center justify-center">
            <img src="\Images\Iconsave.png" alt="" className=" w-14 h-14" />
            <h1 className=" text-2xl font-bold">{t('whatWeDo1Title')}</h1>
            <p className=" text-[14px] text-center flex text-[#525A6A]">
              {t('whatWeDo1Subtitle')}
            </p>
          </div>
          <div className="gap-3 flex flex-col w-[308px] items-center justify-center">
            <img src="/Images/Iconbook.png" alt="" className=" w-14 h-14" />
            <h1 className=" text-2xl font-bold">{t('whatWeDo2Title')}</h1>
            <p className=" text-[14px] text-center flex text-[#525A6A]">
              {t('whatWeDo2Subtitle')}
            </p>
          </div>
          <div className="gap-3 flex flex-col w-[308px] items-center justify-center">
            <img src="\Images\Iconlawbook.png" alt="" className=" w-14 h-14" />
            <h1 className=" text-2xl font-bold text-center">{t('whatWeDo3Title')}</h1>
            <p className=" text-[14px] text-center flex text-[#525A6A]">
              {t('whatWeDo3Subtitle')}
            </p>
          </div>
        </div>
      </div>

      {/* another section here */}

      <LawServices />
      {/* another section here */}
      <div className=" w-full flex my-12">
        <div className=" flex w-[80%] justify-between items-center mx-auto lg:flex-row flex-col ">
          <div className={`flex flex-col lg:w-[500px] w-[350px] justify-end ${activeLanguage === 'ar' ? 'items-end' : ''} gap-5 py-8 px-9 border rounded-md`}>
            <img
              src="\Images\Icon.png"
              alt=""
              className={`" flex justify-end items-end text-end w-20 h-14"`}
            />
            <div
              className={`lg:w-[400px] w-[300px] ${activeLanguage === 'ar' ? 'text-end' : ''} flex flex-col gap-3`}
            >
              <h1 className=" text-[20px] font-bold">{t('whatWeDoLast1Title')}</h1>
              <p className=" text-[16px]">
                {t('whatWeDoLast1Subtitle')}
              </p>
            </div>
          </div>
          <div className={`flex flex-col lg:w-[500px] w-[350px] justify-end ${activeLanguage === 'ar' ? 'items-end' : ''} gap-5 py-8 px-9 border rounded-md`}>
            <img
              src="\Images\Icon.png"
              alt=""
              className=" flex justify-end items-end text-end w-20 h-14"
            />
            <div
              className={`lg:w-[400px] w-[300px] ${activeLanguage === 'ar' ? 'text-end' : ''} flex flex-col gap-3`}
            >
              <h1 className=" text-[20px] font-bold">{t('whatWeDoLast2Title')}</h1>
              <p className=" text-[16px] w-full">
                {t('whatWeDoLast2Subtitle')}
              </p>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default WhatweDoSection2;
