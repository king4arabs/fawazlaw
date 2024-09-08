import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwperController2 from './SwperController2';
import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const Rating = ({ rating, totalStars }) => {
  const filledStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = totalStars - filledStars - (hasHalfStar ? 1 : 0);

  const renderStar = (type) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-3 w-3 text-yellow-400"
      fill={type === 'filled' ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d={
          type === 'filled'
            ? 'M12 2L15.09 8.26L22 9.27l-5.46 4.73L18.36 21L12 17.27L5.64 21l1.82-7L2 9.27l6.91-.99L12 2z'
            : 'M12 2L15.09 8.26L22 9.27l-5.46 4.73L18.36 21L12 17.27L5.64 21l1.82-7L2 9.27l6.91-.99L12 2z'
        }
      />
    </svg>
  );
  return (
    <div className="flex items-center">
      {[...Array(filledStars)].map((_, index) => (
        <span key={index}>{renderStar('filled')}</span>
      ))}
      {hasHalfStar && <span>{renderStar('half')}</span>}
      {[...Array(emptyStars)].map((_, index) => (
        <span key={index}>{renderStar('empty')}</span>
      ))}
    </div>
  );
};

function Slider({ data }) {
  return (
    <div className="max-w-[100%] md:max-w-[70%]">
      <Swiper
        navigation={true}
        modules={[Navigation, Autoplay]}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        className="mySwiper"
      >
        {data?.map((item, i) => (
          <SwiperSlide
            key={i}
            style={{
              display: 'flex',
            }}
            className="justify-center"
          >
            <div className="shadow rounded p-3 min-h-[80px] w-[80%] flex md:flex-row flex-col items-center">
              <div className="min-w-[60px] md:mr-10">
                <img src={item.img} alt="" />
              </div>
              <div>
                <p className="text-[16px] text-center md:text-left">
                  {item.name}
                </p>
                <p className="text-[12px] text-center md:text-left">
                  {item.testimonial}
                </p>
                <div className="mt-2">
                  <Rating rating={item.rating} totalStars={5} />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

const PeopleAtTheCenter = () => {
  const { t, i18n } = useTranslation();
  const activeLanguage = i18n.language; // 'en' or 'ar'

  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, []);
  const ratings = [
    {
      name: 'Ahmed Abdullah',
      testimonial:
        'Fawaz Law provided exceptional legal counsel and support throughout my case. Their deep understanding of Saudi law and commitment to achieving justice is unparalleled. Highly recommend!',
      rating: 5,
      img: '/Images/Imageman.png',
    },
    {
      name: 'Fatima Al-Jaber',
      testimonial:
        'I am grateful to Fawaz Law for their compassionate approach and expert guidance during a complex legal matter. They navigated the intricacies of Saudi law with professionalism and integrity.',
      rating: 4.5,
      img: '/Images/Imagegirl.png',
    },
    {
      name: 'Muhammad Ibrahim',
      testimonial:
        "Fawaz Law exceeded my expectations in handling my legal issues. Their team's knowledge and dedication ensured a favorable outcome. I commend them for their excellent service.",
      rating: 5,
      img: '/Images/Group 14073lined.png',
    },
  ];
  return (
    <div className=" w-full flex bg-bggradient2 justify-center flex-col">
      <div className=" flex flex-col justify-center items-center w-[80%] gap-7  bg-transparent mx-auto  py-10 ">
        <div className=" items-center">
          <h1 className="text-[20px] md:text-[48px] text-center">
            {t('recommendation')}
          </h1>
          <p className=" text base text-[#667085]  text-center">
            {t('findWhatOurCustomersAreSaying')}
          </p>
        </div>
        <p className=" font-medium text-[#000929]"></p>
        <Slider data={ratings} />
      </div>
    </div>
  );
};

export default PeopleAtTheCenter;
