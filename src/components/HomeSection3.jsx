import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import {
  FaRegArrowAltCircleLeft,
  FaRegArrowAltCircleRight,
} from 'react-icons/fa';

const HomeSection3 = () => {
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
    <div className="w-[100%] px-10 py-[90px] flex flex-col gap-10 my-16 bg-gradient-to-b from-[#EEF3FE] to-[#fff]">
      <div
        className={` flex  ${
          activeLanguage === 'ar' || activeLanguage === 'ur'
            ? 'lg:flex-row'
            : 'lg:flex-row-reverse'
        } gap-2 flex-col justify-between`}
      >
        <div
          className={`flex ${
            activeLanguage === 'ar' || activeLanguage === 'ur'
              ? 'flex-row items-center'
              : 'flex-row-reverse items-start'
          }  gap-2 cursor-pointer`}
          onClick={() => navigate('/cart')}
        >
          {activeLanguage == 'ar' ? (
            <FaRegArrowAltCircleLeft size={22} />
          ) : (
            <FaRegArrowAltCircleRight size={22} />
          )}
          <p className={`flex text-nowrap`}>{t('order now')}</p>
        </div>
        <div
          className={`${
            activeLanguage === 'ar' || activeLanguage === 'ur'
              ? 'text-end'
              : 'text-start'
          } flex flex-col gap-6 `}
        >
          <h1 className="lg:text-[48px] text-2xl font-bold ">
            {t('section3Title')}
          </h1>
          <p className=" text-base">{t('section3Content')}</p>
        </div>
      </div>
      <div className=" flex flex-col lg:flex-row gap-10 ">
        <div className="hidden lg:w-[30%] items-center  bg-[gradientbg] min-h-[460px] bg-bggradient md:flex flex-col border-[3px] rounded border-[#7AB4E2] md:pt-16 ">
          <div
            className="  bg-[gradientbg] bg-bggradient w-full h-full flex flex-col gap-2 "
            style={{
              backgroundImage: `url("/Images/building2323.png")`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 250,
              backgroundPositionY: 205,
            }}
          >
            <div className=" w-[90%] flex flex-col items-center mx-auto h-full relative">
              <div className="px-3 w-[100%] flex flex-col justify-center  gap-4">
                <h1
                  className={` lg:text-3xl text-[24px]  font-extrabold ${
                    activeLanguage === 'ar' || activeLanguage === 'ur'
                      ? 'text-end'
                      : 'text-end'
                  } `}
                >
                  1200
                </h1>
                <div
                  className={`flex ${
                    activeLanguage === 'ar' || activeLanguage === 'ur'
                      ? 'justify-end'
                      : 'justify-end'
                  } gap-2`}
                >
                  <span className="text-[18px] text-[#081F2F] font-bold">
                    {t('yearly')}
                  </span>
                  <span className="text-[18px] text-[#667085] font-black">
                    SAR
                  </span>
                </div>
              </div>
              <div
                className={`px-3 w-[100%] ${
                  activeLanguage === 'ar' || activeLanguage === 'ur'
                    ? 'justify-end'
                    : 'justify-end'
                } flex pt-7`}
              >
                <button
                  onClick={() => navigate('/services/1')}
                  className="px-5 py-2 flex border rounded-lg bg-[#003E6F]  text-white items-center gap-[1px] font-thin"
                >
                  {t('order now')}
                </button>
              </div>
              <div className="absolute bottom-[20px] right-[20px]">
                <img src="\Logo (2).png" className=" w-16" alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex lg:w-[30%] items-center  bg-[gradientbg] bg-bggradient md:hidden flex-col border-[3px] rounded border-[#7AB4E2] md:pt-16 ">
          <div
            className="  bg-[gradientbg] bg-bggradient w-full h-full flex flex-col gap-2 "
            style={{
              backgroundImage: `url("/Images/building2323.png")`,
              backgroundRepeat: 'no-repeat',
              // backgroundSize: 250,
              backgroundPositionY: 150,
            }}
          >
            <div className=" w-[90%] flex flex-col items-center mx-auto h-full relative">
              <div className="px-3 min-h-[400px] w-[100%] flex flex-col pt-[20px] gap-4">
                <h1
                  className={` lg:text-3xl text-[24px]  font-extrabold ${
                    activeLanguage === 'ar' || activeLanguage === 'ur'
                      ? 'text-end'
                      : 'text-end'
                  } `}
                >
                  1200
                </h1>
                <div
                  className={`flex ${
                    activeLanguage === 'ar' || activeLanguage === 'ur'
                      ? 'justify-end'
                      : 'justify-end'
                  } gap-2`}
                >
                  <span className="text-[18px] text-[#081F2F] font-bold">
                    {t('yearly')}
                  </span>
                  <span className="text-[18px] text-[#667085] font-black">
                    SAR
                  </span>
                </div>
                <div
                  className={`w-[100%] ${
                    activeLanguage === 'ar' || activeLanguage === 'ur'
                      ? 'justify-end'
                      : 'justify-end'
                  } flex`}
                >
                  <button
                    onClick={() => navigate('/cart')}
                    className="px-5 py-2 flex border rounded-lg bg-[#003E6F]  text-white items-center gap-[1px] font-thin"
                  >
                    {t('order now')}
                  </button>
                </div>
              </div>

              <div className="absolute left-[20px] top-[20px]">
                <img src="\Logo (2).png" className=" w-16" alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-6">
          <div className="p-4 flex flex-col lg:flex-row justify-between gap-6">
            <div
              className={` ${
                activeLanguage === 'ar' || activeLanguage === 'ur'
                  ? 'items-end'
                  : 'items-start'
              } flex flex-col gap-6 flex-1`}
            >
              <img src="\Images\Iconoooooo.png" alt="" />
              <h1 className="text-[24px] font-bold text-black">
                {t('homeSec3Card1Title')}
              </h1>
              <p
                className={`text-base text-[#525A6A] w-auto ${
                  activeLanguage === 'ar' || activeLanguage === 'ur'
                    ? 'text-end'
                    : ''
                }`}
              >
                {t('homeSec3Card1Subtitle')}{' '}
              </p>
            </div>
            <div
              className={` ${
                activeLanguage === 'ar' || activeLanguage === 'ur'
                  ? 'items-end'
                  : 'items-start'
              } flex flex-col gap-6 flex-1`}
            >
              <img src="\Images\Iconoooooo.png" alt="" />
              <h1
                className={`text-[24px] font-bold text-black ${
                  activeLanguage === 'ar' || activeLanguage === 'ur'
                    ? 'text-end'
                    : ''
                }`}
              >
                {t('homeSec3Card2Title')}
              </h1>
              <p
                className={`text-base text-[#525A6A] w-auto ${
                  activeLanguage === 'ar' || activeLanguage === 'ur'
                    ? 'text-end'
                    : ''
                }`}
              >
                {t('homeSec3Card2Subtitle')}{' '}
              </p>
            </div>
          </div>
          <div className="p-4 flex flex-col lg:flex-row gap-6">
            <div
              className={` ${
                activeLanguage === 'ar' || activeLanguage === 'ur'
                  ? 'items-end'
                  : 'items-start'
              } flex flex-col gap-6 flex-1`}
            >
              <img src="\Images\Iconoooooo.png" alt="" />
              <h1 className={`text-[24px] font-bold text-black`}>
                {t('homeSec3Card3Title')}
              </h1>
              <p
                className={`text-base text-[#525A6A] w-auto ${
                  activeLanguage === 'ar' || activeLanguage === 'ur'
                    ? 'text-end'
                    : ''
                }`}
              >
                {t('homeSec3Card3Subtitle')}
              </p>
            </div>
            <div
              className={` ${
                activeLanguage === 'ar' || activeLanguage === 'ur'
                  ? 'items-end'
                  : 'items-start'
              } flex flex-col gap-6 flex-1`}
            >
              <img src="\Images\Iconoooooo.png" alt="" />
              <h1 className="text-[24px] font-bold text-black ">
                {t('homeSec3Card4Title')}
              </h1>
              <p
                className={`text-base text-[#525A6A] w-auto ${
                  activeLanguage === 'ar' || activeLanguage === 'ur'
                    ? 'text-end'
                    : ''
                }`}
              >
                {t('homeSec3Card4Subtitle')}{' '}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeSection3;
