import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Marquee from 'react-fast-marquee';
import { AiOutlineHome } from 'react-icons/ai';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwperController2 from './SwperController2';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const WhatWedoHero = () => {
  const { t, i18n } = useTranslation();
  const activeLanguage = i18n.language; // 'en' or 'ar'

  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, []);
  const screenWidth = window.innerWidth;

  const sliderContent = [
    {
      id: 1,
      img: '/Images/Frame 1000003323graph.png',
      title: 'road',
    },
    {
      id: 2,
      img: '/Images/Frame 1000003323bookandpen.png',
      title: 'intellectual property',
    },
    {
      id: 3,
      img: '/Images/Frame 1000003323bot (1).png',
      title: 'legal novel',
    },
    {
      id: 4,
      img: '/Images/Frame 1000003323jotter (1).png',
      title: 'dictations of bankruptcy',
    },
    {
      id: 5,
      img: '/Images/Frame 1000003323searchman.png',
      title: 'Legal advice',
    },
    {
      id: 6,
      img: '/Images/Frame 1000003324lawbalance.png',
      title: 'Law firm',
    },
  ];
  return (
    <>
      <div className=" overflow-hidden w-full bg-bggradient justify-center items-center lg:h-[83vh] relative mb-10 pb-14">
        <img
          src="\Images\whatwedobg.png"
          alt=""
          className=" absolute z-0 bottom-0 opacity-5"
        />
        <div
          className={`w-[80%] flex h-full  ${
            activeLanguage === 'ar' || activeLanguage === 'ur'
              ? 'lg:flex-row'
              : 'lg:flex-row-reverse'
          } mx-auto lg:justify-between z-10 flex-col lg:items-center`}
        >
          <div className=" flex z-10 lg:max-w-[40%]">
            <img src="\Images\Group.png" alt="lawerPhoto" />
          </div>
          <div
            className={`gap-9 lg:w-[60%] flex flex-col z-10 ${
              activeLanguage === 'ar' || activeLanguage === 'ur'
                ? 'text-end items-end'
                : ''
            }`}
          >
            <div
              className={`flex gap-2 items-center ${
                activeLanguage === 'ar' || activeLanguage === 'ur'
                  ? 'text-end justify-end pr-6'
                  : 'pl-6'
              } `}
            >
              <a
                href="/"
                className={`flex w-fit ${
                  activeLanguage === 'ar' || activeLanguage === 'ur'
                    ? 'flex-row'
                    : 'flex-row-reverse'
                } gap-2 items-center text-end justify-end `}
              >
                <h1>{t('about us')}</h1>
                {activeLanguage === 'ar' || activeLanguage === 'ur' ? (
                  <FaAngleLeft />
                ) : (
                  <FaAngleRight />
                )}
                <AiOutlineHome />
              </a>
            </div>
            <div className=" gap-5 flex flex-col">
              <h3
                className={`lg:text-[50px] text-4xl text-[#003E6F] font-medium ${
                  activeLanguage === 'ar' || activeLanguage === 'ur'
                    ? 'text-end '
                    : ''
                }`}
              >
                {t('about us')}
              </h3>
              <h1
                className={`lg:text-[16px] text-xl  ${
                  activeLanguage === 'ar' || activeLanguage === 'ur' ? '' : ''
                }`}
              >
                {t('aboutUsTitle')}
              </h1>
            </div>
            <div className=" lg:w-[580px] ">
              <p
                className={` ${
                  activeLanguage === 'ar' || activeLanguage === 'ur'
                    ? 'text-[24px] leading-10'
                    : 'text-[20px]'
                }  font-normal`}
              >
                {t('aboutUsSubtitle')}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className=" flex flex-row gap-6 mx-auto justify-center items-center lg:-mt-40 -mt-20 z-50  ml-16 pb-10 pt-16">
        {/* <Marquee
          className=""
          pauseOnClick={true}
          pauseOnHover={true}
          speed={100}
          loop={100}
        >
          <div className=" flex flex-col gap-5 px-10 w-[170px] h-[230px] py-10 justify-end items-end bg-white shadow-2xl rounded-lg mx-6 mb-4">
            <img
              src="\Images\Frame 1000003323graph.png"
              className={`w-20 h-20 ${
                activeLanguage === 'ar' || activeLanguage === 'ur'
                  ? 'text-end'
                  : 'text-center'
              }`}
              alt=""
            />
            <h1
              className={`font-bold ${
                activeLanguage === 'ar' || activeLanguage === 'ur'
                  ? 'text-end'
                  : 'text-center'
              }`}
            >
              {t('road')}
            </h1>
          </div>
          <div className=" flex flex-col gap-5 px-10 w-[170px] h-[230px] py-10 justify-end items-end bg-white shadow-2xl rounded-lg mx-6">
            <img
              src="\Images\Frame 1000003323bookandpen.png"
              className={`w-20 h-20 ${
                activeLanguage === 'ar' || activeLanguage === 'ur'
                  ? 'text-end'
                  : 'text-center'
              }`}
              alt=""
            />
            <h1
              className={`font-bold ${
                activeLanguage === 'ar' || activeLanguage === 'ur'
                  ? 'text-end'
                  : 'text-center'
              }`}
            >
              {t('intellectual property')}
            </h1>
          </div>
          <div className=" flex flex-col gap-5 px-10 w-[170px] h-[230px] py-10 justify-end items-end bg-white shadow-2xl rounded-lg mx-6">
            <img
              src="\Images\Frame 1000003323bot (1).png"
              className={`w-20 h-20 ${
                activeLanguage === 'ar' || activeLanguage === 'ur'
                  ? 'text-end'
                  : 'text-center'
              }`}
              alt=""
            />
            <h1
              className={`font-bold ${
                activeLanguage === 'ar' || activeLanguage === 'ur'
                  ? 'text-end'
                  : 'text-center'
              }`}
            >
              {t('legal novel')}
            </h1>
          </div>
          <div className=" flex flex-col gap-5 px-10 w-[170px] h-[230px] py-10 justify-end items-end bg-white shadow-2xl rounded-lg mx-6">
            <img
              src="\Images\Frame 1000003323jotter (1).png"
              className={`w-20 h-20 ${
                activeLanguage === 'ar' || activeLanguage === 'ur'
                  ? 'text-end'
                  : 'text-center'
              }`}
              alt=""
            />
            <h1
              className={`font-bold ${
                activeLanguage === 'ar' || activeLanguage === 'ur'
                  ? 'text-end'
                  : 'text-center'
              }`}
            >
              {t('dictations of bankruptcy')}
            </h1>
          </div>
          <div className=" flex flex-col gap-5 px-10 w-[170px] h-[230px] py-10 justify-end items-end bg-white shadow-2xl rounded-lg mx-6">
            <img
              src="\Images\Frame 1000003323searchman.png"
              className={`w-20 h-20 ${
                activeLanguage === 'ar' || activeLanguage === 'ur'
                  ? 'text-end'
                  : 'text-center'
              }`}
              alt=""
            />
            <h1
              className={`font-bold ${
                activeLanguage === 'ar' || activeLanguage === 'ur'
                  ? 'text-end'
                  : 'text-center'
              }`}
            >
              {t('Legal advice')}
            </h1>
          </div>
          <div className=" flex flex-col gap-5 px-10 w-[170px] h-[230px] py-10 justify-end items-end bg-white shadow-2xl rounded-lg mx-6">
            <img
              src="\Images\Frame 1000003324lawbalance.png"
              className={`w-20 h-20 ${
                activeLanguage === 'ar' || activeLanguage === 'ur'
                  ? 'text-end'
                  : 'text-center'
              }`}
              alt=""
            />
            <h1
              className={`font-bold ${
                activeLanguage === 'ar' || activeLanguage === 'ur'
                  ? 'text-end'
                  : 'text-center'
              }`}
            >
              {t('Law firm')}
            </h1>
          </div>
        </Marquee> */}
        <Swiper
          // modules={[Navigation, Pagination, Autoplay]}
          className="mb-16"
          slidesPerView={screenWidth < 768 ? 1 : 4}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
          spaceBetween={30}
        >
          {sliderContent.map(({ img, title }, index) => {
            return (
              <SwiperSlide>
                <div className=" flex flex-col gap-5 px-10 w-[170px] h-[230px] md:w-[270px] md:h-[330px] py-10 md:justify-center md:items-center bg-white shadow-2xl rounded-lg mx-6">
                  <img
                    src={img}
                    className={`w-20 h-20 md:w-40 md:h-40 ${
                      activeLanguage === 'ar' || activeLanguage === 'ur'
                        ? 'text-end'
                        : 'text-center'
                    }`}
                    alt=""
                  />
                  <h1
                    className={`font-bold ${
                      activeLanguage === 'ar' || activeLanguage === 'ur'
                        ? 'text-center'
                        : 'text-center'
                    }`}
                  >
                    {t(title)}
                  </h1>
                </div>
              </SwiperSlide>
            );
          })}
          <div className="mt-5">
            <SwperController2 notAbsolute className={'text-black'} />
          </div>
        </Swiper>
      </div>
    </>
  );
};

export default WhatWedoHero;
