import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PiCaretDownBold } from 'react-icons/pi';
import { TbWorld } from 'react-icons/tb';
import { useLocation } from 'react-router-dom';
import i18n from '../il8n';

const MobileNav = () => {
  const [activeLanguage, setActiveLanguage] = useState();
  const location = useLocation();
  const { t } = useTranslation();
  useEffect(() => {
    setActiveLanguage(i18n.language);
    localStorage.setItem('selectedLanguage', i18n.language);
  }, []);
  const changeLanguage = (lng) => {
    console.log({ lng });
    localStorage.setItem('selectedLanguage', lng);
    i18n.changeLanguage(lng);
    setActiveLanguage(lng);
  };
  useEffect(() => {
    setActiveLanguage(i18n.language);
    localStorage.setItem('selectedLanguage', i18n.language);
  }, []);
  console.log({ activeLanguage });
  const languages = [
    {
      name: 'English',
      shortHand: 'en',
    },
    {
      name: 'العربية',
      shortHand: 'ar',
    },
    {
      name: 'اردو',
      shortHand: 'ur',
    },
  ];
  return (
    <>
      <div className=" w-full bg-white absolute z-[100]">
        <div className="my-5 justify-center items-center w-52 mx-auto flex flex-col-reverse gap-10 ">
          <div className="flex flex-col items-center md:hidden group">
            <button className="focus:outline-none border-b border-b-[#ccc] w-[100%]">
              {activeLanguage === 'ar' ? (
                <span className="flex items-center justify-center">
                  <PiCaretDownBold />
                  <p className="ml-2">العربية</p>
                </span>
              ) : activeLanguage === 'en' ? (
                <span className="flex items-center justify-center">
                  <PiCaretDownBold />
                  <p className="ml-2">EN</p>
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <PiCaretDownBold />
                  <p className="ml-2">اردو</p>
                </span>
              )}
            </button>
            <div className=" mt-2 w-48 bg-white rounded-md shadow-lg py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
              {languages.map((language, i) => (
                <p
                  key={i}
                  onClick={() => changeLanguage(language.shortHand)}
                  className={`block px-4 py-2 text-center cursor-pointer ${
                    activeLanguage === language.shortHand &&
                    'bg-slate-500 text-white'
                  } text-gray-800 hover:bg-gray-200`}
                >
                  {language.name}
                </p>
              ))}
            </div>
          </div>
          <a
            href="/contacts"
            className={`border-b border-b-[#ccc] w-[100%] flex px-1 py-[1px] hover:bg-[#ecedee] justify-center transition ${
              location.pathname === '/contacts'
                ? 'text-[#003E6F] font-bold '
                : ' font-normal'
            }`}
          >
            {t('contact us')}
          </a>
          <a
            href="/faq"
            className={`border-b border-b-[#ccc] w-[100%] flex px-1 py-[1px] hover:bg-[#ecedee] justify-center transition  ${
              location.pathname === '/faq'
                ? 'text-[#003E6F] font-bold '
                : ' font-normal'
            }`}
          >
            {t('faq')}
          </a>
          <a
            href="/blog"
            className={`border-b border-b-[#ccc] w-[100%] flex px-1 py-[1px] hover:bg-[#ecedee] justify-center transition  ${
              location.pathname === '/blog'
                ? 'text-[#003E6F] font-bold'
                : ' font-normal'
            }`}
          >
            {t('blogs')}
          </a>
          <a
            href="/services"
            className={`border-b border-b-[#ccc] w-[100%] flex px-1 py-[1px] hover:bg-[#ecedee] justify-center transition  ${
              location.pathname === '/services'
                ? 'text-[#003E6F] font-bold '
                : ' font-normal'
            }`}
          >
            {t('services')}
          </a>
          <a
            href="/whatwedo"
            className={`border-b border-b-[#ccc] w-[100%] flex px-1 py-[1px] hover:bg-[#ecedee] justify-center transition  ${
              location.pathname === '/whatwedo'
                ? 'text-[#003E6F] font-bold '
                : ' font-normal'
            }`}
          >
            {t('about us')}
          </a>
          <a
            href="/"
            className={`border-b border-b-[#ccc] w-[100%] flex px-1 py-[1px] hover:bg-[#ecedee] justify-center transition  ${
              location.pathname === '/'
                ? 'text-[#003E6F] font-bold '
                : ' font-normal'
            }`}
          >
            {t('home')}
          </a>
        </div>
      </div>
    </>
  );
};

export default MobileNav;
