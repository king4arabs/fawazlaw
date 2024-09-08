import React, { useEffect } from 'react';
import Helmet from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { AiOutlineHome } from 'react-icons/ai';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import NavBar from '../components/NavBar';

const PrivacyAndPolic = () => {
  const { t, i18n } = useTranslation();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);
  return (
    <>
      <Helmet>
        <title>{t('privacy_page_title')}</title>
      </Helmet>
      {/* <NavBar /> */}
      <div>
        <div className=" overflow-hidden w-full bg-bggradient justify-center items-center relative  lg:pb-28 lg:pt-10 py-9 ">
          <div className=" overflow-hidden w-full bg-bggradient justify-center items-center relative lg:h-[50vh] lg:pb-28 lg:pt-10 py-9 ">
            <img
              src="\Images\bgservices.png"
              alt=""
              className=" absolute z-0 bottom-0 opacity-5"
            />
            <div
              className={` w-[80%] flex h-full lg:flex-row mx-auto ${
                i18n.language === 'en' ? 'lg:justify-start' : 'lg:justify-end'
              } z-10 flex-col lg:items-center`}
            >
              <div className=" gap-2 lg:w-[65%]  flex flex-col z-10">
                <div className=" lg:w-[660px]">
                  <div
                    className={` flex flex-row gap-2 items-center text-end ${
                      i18n.language === 'en' ? 'justify-start' : 'justify-end'
                    } pr-6 mb-5 `}
                  >
                    <a
                      href="/tandc"
                      className={`flex w-fit flex-row ${
                        i18n.language === 'en' && 'flex-row-reverse'
                      } gap-2 items-center text-end justify-end  `}
                    >
                      <h1> {t('privacy_page_breadcrumb')}</h1>
                      {i18n.language === 'en' ? (
                        <FaAngleRight />
                      ) : (
                        <FaAngleLeft />
                      )}
                      <AiOutlineHome />
                    </a>
                  </div>
                  <h1
                    className={` lg:text-[50px] text-4xl text-[#003E6F] ${
                      i18n.language === 'en' ? 'text-start' : 'text-end'
                    } font-bold`}
                  >
                    {t('privacy_page_title')}
                  </h1>
                </div>
                <div className=" lg:w-[660px]">
                  <p
                    className={` ${
                      i18n.language === 'en' ? 'text-start' : 'text-end'
                    } text-[20px] leading-10 font-normal`}
                  >
                    {t('privacy_page_subtile')}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className=" w-[78%] flex flex-col mx-auto gap-6">
            <div
              className={` w-full flex-col flex gap-3 justify-end ${
                i18n.language === 'en'
                  ? 'text-start items-start'
                  : 'text-end items-end'
              } `}
            >
              <h1 className=" font-bold text-[24px] ">
                {t('terms_introduction_title')}
              </h1>
              <p className="font-normal text-[18px]">
                {t('terms_introduction_content')}{' '}
              </p>
            </div>
            <div
              className={` w-full flex-col flex gap-3 justify-end ${
                i18n.language === 'en'
                  ? 'text-start items-start'
                  : 'text-end items-end'
              }`}
            >
              <h1 className=" font-bold text-[24px] ">
                {t('terms_first_text_title')}
              </h1>
              <p className="font-normal text-[18px]">
                {t('terms_first_text_content')}{' '}
              </p>
            </div>
            <div
              className={` w-full flex-col flex gap-3 justify-end   ${
                i18n.language === 'en'
                  ? 'text-start items-start'
                  : 'text-end items-end'
              }`}
            >
              <h1 className=" font-bold text-[24px] ">
                {t('terms_sec_text_title')}
              </h1>
              <p className="font-normal text-[18px]">
                {t('terms_sec_text_content')}{' '}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyAndPolic;
