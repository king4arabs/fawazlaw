import React, {useEffect} from "react";
import { useTranslation } from 'react-i18next';
import Marquee from "react-fast-marquee";

const WeDefendSection = () => {
  const { t, i18n } = useTranslation();
  const activeLanguage = i18n.language; // 'en' or 'ar'

  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    } 
  }, []);
  return (
    <div className=" w-full my-[40px] bg-[#003E6F]">
      <div className={`" flex flex-col justify-end mx-auto pt-12 px-12 text-white ${activeLanguage == 'ar'? 'text-end' : ''}`} >
        <h1 className="font-bold text-[28px] text-3xl">{t('weDefendTitle')}</h1>
        <p className=" text-[16px] pt-3">
          {t('weDefendSubtitle')}
        </p>
      </div>

      {/* 3 cards */}
      <div className=" w-full justify-end lg:mr-60 gap-7 flex flex-row mx-5 pt-9">
        <Marquee
          pauseOnClick={true}
          pauseOnHover={true}
          speed={100}
          className=""
        >
          <div className={`flex lg:w-fit w-[400px] h-[180px] ${activeLanguage == 'ar'? 'flex-row-reverse' : 'flex-row'} gap-3  px-4 py-6 rounded-xl  justify-end bg-[#FFFFFF] mx-6`}>
            <img
              src="Images\Iconcheck33.png"
              alt="dfsjfbjb"
              className="w-12 h-12"
            />
            <div className=" gap-2 w-[400px]">
              <h1 className={`text-2xl font-bold ${activeLanguage == 'ar' ? 'text-end' : ''}`}>{t('weDefendCard1Title')}</h1>
              <p className={`pt-3 text-base ${activeLanguage == 'ar' ? 'text-end' : ''}`}>
              {t('weDefendCard1subtitle')}
              </p>
            </div>
          </div>
          <div className={`flex lg:w-fit w-[400px] h-[180px] ${activeLanguage == 'ar'? 'flex-row-reverse' : 'flex-row'} gap-3  px-4 py-6 rounded-xl  justify-end bg-[#FFFFFF] mx-6`}>
            <img
              src="Images\Iconcheck22.png"
              alt="dfsjfbjb"
              className="w-12 h-12"
            />
            <div className=" gap-2 w-[400px]">
              <h1 className={`text-2xl font-bold ${activeLanguage == 'ar' ? 'text-end' : ''}`}>{t('weDefendCard2Title')}</h1>
              <p className={`pt-3 text-base ${activeLanguage == 'ar' ? 'text-end' : ''}`}>
                {t('weDefendCard2subtitle')}
              </p>
            </div>
          </div>
          <div className={`flex lg:w-fit w-[400px] h-[180px] ${activeLanguage == 'ar'? 'flex-row-reverse' : 'flex-row'} gap-3  px-4 py-6 rounded-xl  justify-end bg-[#FFFFFF] mx-6 `}>
            <img
              src="Images\Iconcheck11.png"
              alt="dfsjfbjb"
              className="w-12 h-12"
            />
            <div className=" gap-2 w-[400px]">
              <h1 className={`text-2xl font-bold ${activeLanguage == 'ar' ? 'text-end' : ''}`}>{t('weDefendCard3Title')}</h1>
              <p className={`pt-3 text-base ${activeLanguage == 'ar' ? 'text-end' : ''}`}>
                {t('weDefendCard3subtitle')}
              </p>
            </div>
          </div>
        </Marquee>
      </div>

      {/* divider */}
      <div className="flex items-center justify-center h-[1px] pt-[60px]">
        <div class="border-b border-white w-[70%] border-opacity-25"></div>
      </div>

     {/* figures */}
    <div className="figures flex justify-center items-center gap-[60px] pt-7 pb-[70px]">
        <div className="num  flex flex-col justify-center items-center">
            <div className="number text-[30px] text-white font-extrabold">8,943</div>
            <div className="detail text-[14px] text-white text-opacity-[70%] ">{t('weDefendNum1')}</div>
        </div>
        <div className="flex items-center justify-center w-[1.5px]">
            <div class="border-l-[1.5px] border-white h-[60px] "></div>
        </div>
        <div className="num  flex flex-col justify-center items-center">
            <div className="number text-[30px] text-white font-extrabold">3,856</div>
            <div className="detail text-[14px] text-white text-opacity-[70%] ">{t('weDefendNum2')}</div>
            <div className="detail text-[14px] text-white text-opacity-[70%] "></div>
        </div>
        <div className="flex items-center justify-center w-[1.5px]">
            <div class="border-l-[1.5px] border-white h-[60px] "></div>
        </div>
        <div className="num flex flex-col justify-center items-center">
            <div className="number text-[30px] text-white font-extrabold">15</div>
            <div className="detail text-[14px] text-white text-opacity-[70%] ">{t('weDefendNum3')}</div>
        </div>
    </div>
    </div>
  );
};

export default WeDefendSection;
