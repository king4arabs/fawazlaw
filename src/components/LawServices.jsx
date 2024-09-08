import 'swiper/css';
// import { Swiper } from "swiper";
import 'swiper/css/pagination';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { BsArrowLeftCircle } from 'react-icons/bs';
import { Swiper, SwiperSlide } from 'swiper/react';
import { PiCaretLeft, PiCaretRight } from 'react-icons/pi';
import SwperController from './SwperController';
import SwperController2 from './SwperController2';
import { Autoplay, Navigation } from 'swiper/modules';
import UserImage from '../assets/images/AboutSliderSecImage.jpeg';

const LawServices = () => {
  const { t, i18n } = useTranslation();
  const activeLanguage = i18n.language; // 'en' or 'ar'

  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, []);

  const screenWidth = window.innerWidth;

  console.log({ screenWidth });
  return (
    <div className=" w-full text-black my-14 gap-10 flex flex-col">
      <div
        className={` w-[80%] flex lg:flex-row flex-col  ${
          activeLanguage === 'ar' || activeLanguage === 'ur'
            ? 'justify-end'
            : 'justify-start'
        } mx-auto pt-12 gap-4  `}
      >
        <div
          className={`lg:text-[48px] text-3xl font-bold text-black ${
            activeLanguage === 'ar' || activeLanguage === 'ur' ? 'text-end' : ''
          }`}
        >
          <h1>{t('company members')}</h1>
          <p
            className={`text-[16px] font-normal pt-2 ${
              activeLanguage === 'ar' || activeLanguage === 'ur'
                ? 'text-end'
                : ''
            }`}
          >
            {t('company mem details')}
          </p>
        </div>
      </div>
      <div className=" flex flex-row gap-9 relative justify-end px-5 ">
        <Swiper
          // modules={[Navigation, Autoplay]}
          // autoplay={{
          //   delay: 2000,
          //   disableOnInteraction: false,
          // }}
          className="mb-16"
          slidesPerView={screenWidth < 768 ? 1 : 3}
          spaceBetween={30}
        >
          <SwiperSlide>
            <div className="relative d-flex justify-center items-center">
              <img
                src={UserImage}
                className=" w-[100%] md:w-[500px] lg:h-[450px] "
                alt=""
              />
              <div className="bg-slate-800 rounded-[10px] absolute top-[30px] left-[30px] w-[85%] h-[80%] md:w-[400px] lg:h-[400px] opacity-[0.7] flex items-end justify-end p-3">
                <p className="text-white text-[25px]">
                  {t('team_member_1_name')}
                </p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="relative d-flex justify-center items-center">
              <img
                src={UserImage}
                className=" w-[100%] md:w-[500px] lg:h-[450px] "
                alt=""
              />
              <div className="bg-slate-800 rounded-[10px] absolute top-[30px] left-[30px] w-[85%] h-[80%] md:w-[400px] lg:h-[400px] opacity-[0.7] flex items-end justify-end p-3">
                <p className="text-white text-[25px]">
                  {t('team_member_2_name')}
                </p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="relative d-flex justify-center items-center">
              <img
                src={UserImage}
                className=" w-[100%] md:w-[500px] lg:h-[450px] "
                alt=""
              />
              <div className="bg-slate-800 rounded-[10px] absolute top-[30px] left-[30px] w-[85%] h-[80%] md:w-[400px] lg:h-[400px] opacity-[0.7] flex items-end justify-end p-3">
                <p className="text-white text-[25px]">
                  {t('team_member_3_name')}
                </p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className=" mb-20">
            <div className="relative d-flex justify-center items-center">
              <img
                src={UserImage}
                className=" w-[100%] md:w-[500px] lg:h-[450px] "
                alt=""
              />
              <div className="bg-slate-800 rounded-[10px] absolute top-[30px] left-[30px] w-[85%] h-[80%] md:w-[400px] lg:h-[400px] opacity-[0.7] flex items-end justify-end p-3">
                <p className="text-white text-[25px]">
                  {t('team_member_4_name')}
                </p>
              </div>
            </div>
          </SwiperSlide>
          {/* <SwiperSlide className=" mb-20">
            <img
              src={UserImage}
              className=" w-[100%] md:w-[500px] lg:h-[450px] "
              alt=""
            />
          </SwiperSlide> */}
          <SwperController2 className={'text-black'} />
        </Swiper>
      </div>
    </div>
  );
};

export default LawServices;
