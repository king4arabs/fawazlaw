import React, {useEffect} from "react";
import { useTranslation } from 'react-i18next'; 
import { FaRegArrowAltCircleLeft, FaRegArrowAltCircleRight } from "react-icons/fa";

const HomeSection3 = () => {
  const { t, i18n } = useTranslation();
  const activeLanguage = i18n.language; // 'en' or 'ar'

  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, []);
  return (
    <div className="w-[100%] px-10 py-[90px] flex flex-col gap-10 my-16 bg-gradient-to-b from-[#EEF3FE] to-[#fff]">
      <div className={` flex  ${activeLanguage === 'ar'? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-2 flex-col justify-between`}>
        <div className={`flex ${activeLanguage === 'ar'? 'flex-row items-center' : 'flex-row-reverse items-start'}  gap-2`}>
        {activeLanguage == 'ar' ?<FaRegArrowAltCircleLeft size={22} /> : <FaRegArrowAltCircleRight size={22} /> }
          <p className={`flex text-nowrap`}>{t('order now')}</p>
        </div>
        <div className={`${activeLanguage === 'ar'? 'text-end' : 'text-start'} flex flex-col gap-6 `}>
          <h1 className="lg:text-[48px] text-2xl font-bold ">
       {t('section3Title')}
          </h1>
          <p className=" text-base">
          {t('section3Content')}
          </p>
        </div>
      </div>
      <div className=" flex flex-col lg:flex-row gap-10 ">
        <div className=" lg:w-[40%] items-center  bg-[gradientbg] bg-bggradient flex flex-col border-[3px] rounded border-[#7AB4E2] pt-16 ">
          <div
            className="  bg-[gradientbg] bg-bggradient w-full h-full flex flex-col gap-2 "
            style={{
              backgroundImage: `url("/Images/building2323.png")`,
              backgroundRepeat: "no-repeat",
              backgroundSize: 250,
              backgroundPositionY: 140,
            }}
          >
            <div className=" w-full flex flex-col items-center mx-auto h-full">
              <div className=" w-[340px] flex flex-col justify-center  gap-4">
                <h1 className=" lg:text-3xl text-[24px]  font-extrabold text-end">
                 1200
                 </h1>
                 <div className="flex justify-end gap-2">
                 <span className="text-[18px] text-[#081F2F] font-bold">{t('yearly')}</span>
              <span className="text-[18px] text-[#667085] font-black">SAR</span>

              </div>
              </div>
              <div className=" w-[73%] justify-end flex pt-7">
                <button className="px-5 py-2 flex border rounded-lg bg-[#003E6F]  text-white items-center gap-[1px] font-thin">
                  {t('order now')}
                </button>
              </div>
              <div className=" w-[87%] flex justify-end items-end mt-[150px]">
                <img src="\Logo (2).png" className=" w-16" alt=""/>
              </div>
            </div>
          </div>
        </div>
        <div className=" flex flex-col gap-6">
          <div className=" flex flex-col lg:flex-row justify-between gap-6">
            <div className={` ${activeLanguage === 'ar' ? 'items-end' : 'items-start'} flex flex-col gap-6`}>
              <img src="\Images\Iconoooooo.png" alt="" />
              <h1 className="text-[24px] font-bold text-black">
                {t('homeSec3Card1Title')}
              </h1>
              <p className={`text-base text-[#525A6A] w-[300px] ${activeLanguage === 'ar' ? 'text-end' : ''}`}>
              {t('homeSec3Card1Subtitle')}              </p>
            </div>
            <div className={` ${activeLanguage === 'ar' ? 'items-end' : 'items-start'} flex flex-col gap-6`}>
              <img src="\Images\Iconoooooo.png" alt="" />
              <h1 className={`text-[24px] font-bold text-black ${activeLanguage === 'ar' ? 'text-end' : ''}`}>
              {t('homeSec3Card2Title')}
              </h1>
              <p className={`text-base text-[#525A6A] w-[300px] ${activeLanguage === 'ar' ? 'text-end' : ''}`}>
              {t('homeSec3Card2Subtitle')}  </p>
            </div>
          </div>
          <div className=" flex flex-col lg:flex-row gap-6">
          <div className={` ${activeLanguage === 'ar' ? 'items-end' : 'items-start'} flex flex-col gap-3`}>
              <img src="\Images\Iconoooooo.png" alt="" />
              <h1 className={`text-[24px] font-bold text-black`}>
              {t('homeSec3Card3Title')}
              </h1>
              <p className={`text-base text-[#525A6A] w-[300px] ${activeLanguage === 'ar' ? 'text-end' : ''}`}>
              {t('homeSec3Card3Subtitle')}</p>
            </div>
            <div className={` ${activeLanguage === 'ar' ? 'items-end' : 'items-start'} flex flex-col gap-6`}>
              <img src="\Images\Iconoooooo.png" alt="" />
              <h1 className="text-[24px] font-bold text-black ">
              {t('homeSec3Card4Title')}
              </h1>
              <p className={`text-base text-[#525A6A] w-[300px] ${activeLanguage === 'ar' ? 'text-end' : ''}`}>
              {t('homeSec3Card4Subtitle')} </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeSection3;
