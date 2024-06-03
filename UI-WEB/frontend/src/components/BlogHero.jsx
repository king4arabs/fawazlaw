import React, {useEffect} from "react";
import { useTranslation } from 'react-i18next';
import { AiOutlineHome } from "react-icons/ai";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

const BlogHero = () => {
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
    <div className="hello overflow-hidden w-full bg-bggradient justify-center items-center relative  lg:pb-[100px] lg:pt-10">
      <img
        src="\Images\bgservices.png"
        alt=""
        className=" absolute z-0 bottom-0 opacity-5"
      />
      <div className=" w-[90%] flex h-full lg:flex-row mx-auto lg:justify-end z-10 flex-col lg:items-center">
        <div className=" gap-2 w-full flex flex-col z-10 pb-9">
        <div className={`flex flex-row gap-2 items-center ${activeLanguage === 'ar' ? 'text-end justify-end pr-6' : 'pl-6'}  `}>
              <a
                href="/blogs"
                className={`flex w-fit ${activeLanguage === 'ar'? 'flex-row' : 'flex-row-reverse'} gap-2 items-center text-end justify-end`}
              >
                <h1>  {t('blogs')}</h1>
                {activeLanguage === 'ar' ? <FaAngleLeft /> : <FaAngleRight />}
                <AiOutlineHome />
              </a>
            </div>
          <div className=" pt-4">
            <h1 className={`" lg:text-[50px] text-4xl text-[#003E6F] ${activeLanguage === 'ar' ? 'text-end' : ''} font-bold pb-2"`}>
            {t('blogs')}
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
      <div className=" w-full lg:-mt-20 z-[100] ">
        <div className=" w-[90%] overflow-hidden flex justify-center items-center lg:flex-row flex-col mx-auto gap-10  ">
          <img
            src="\Images\blog3new.png"
            className="lg:h-[440px] z-50 object-cover"
            alt=""
          />
          <img
            className="lg:h-[440px] z-50 object-cover"
            src="/Images/blog2new.png"
            alt=""
          />
          <img
            className=" lg:w-[500px] lg:h-[440px]  z-50"
            src="\Images\blog1new.png"
            alt=""
          />
        </div>
      </div>
    </>
  );
};

export default BlogHero;
