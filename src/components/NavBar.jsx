import React, { useRef, useState } from 'react';
import { BsSnapchat, BsTwitterX } from 'react-icons/bs';
import { CiFacebook, CiLinkedin, CiYoutube } from 'react-icons/ci';
import {
  IoLogoInstagram,
  IoMailOutline,
  IoPhonePortraitOutline,
} from 'react-icons/io5';
import { PiCaretDownBold, PiTiktokLogo } from 'react-icons/pi';
import { TbWorld } from 'react-icons/tb';
import NavHeader from './NavHeader';
import i18n from '../il8n';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const NavBar = () => {
  const { cart } = useCart();
  const location = useLocation();
  const [activeLanguage, setActiveLanguage] = useState();
  const [isVisibleNav, setIsVisibleNav] = useState(false);
  useEffect(() => {
    setActiveLanguage(i18n.language);
    localStorage.setItem('selectedLanguage', i18n.language);
  }, []);

  const changeLanguage = (lng) => {
    localStorage.setItem('selectedLanguage', lng);
    i18n.changeLanguage(lng);
    setActiveLanguage(lng);
    setIsVisibleNav(false);
    if (location.pathname.includes('/services/')) {
      window.location.reload();
    }
  };

  useEffect(() => {
    setActiveLanguage(i18n.language);
    localStorage.setItem('selectedLanguage', i18n.language);
  }, []);

  const navRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsVisibleNav(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
      <div className=" w-[100%] flex h-12 bg-[#003E6F] justify-center items-center overflow-x-auto no-scrollbar">
        <div className="w-[90%] flex justify-between items-center">
          <div className={`flex flex-row items-center gap-3`}>
            <a
              className="hidden md:block"
              href="https://twitter.com/fawazlawyer"
              target="_blank"
            >
              <BsTwitterX size={20} className="  text-white" />
            </a>
            <a
              className="hidden md:block"
              href="https://www.facebook.com/fawaz.law/?_rdr"
              target="_blank"
            >
              <CiFacebook size={25} className="  text-white" />
            </a>
            <a
              className="hidden md:block"
              href="https://www.instagram.com/fawazlawyer_/"
              target="_blank"
            >
              <IoLogoInstagram size={22} className="  text-white" />
            </a>
            <a href="#" target="_blank" className="hidden md:block">
              <CiLinkedin size={25} className="  text-white" />
            </a>
            <a
              href="https://youtube.com/@user-wf5vr3ky7b?si=0m7Iwc7oJkb_EroL"
              target="_blank"
              className="hidden md:block"
            >
              <CiYoutube size={25} className="  text-white" />
            </a>
            <a
              href="https://wa.link/cpdeol"
              target="_blank"
              className=" flex items-center gap-1 pl-2"
            >
              <IoPhonePortraitOutline size={18} className="  text-white" />
              <p className=" text-white text-sm">+966920013767</p>
            </a>
            <a
              href="mailto:info@fawazlaw.sa"
              target="_blank"
              className=" flex items-center gap-1 pl-2"
            >
              <IoMailOutline size={20} className="  text-white" />
              <p className=" text-white text-sm">info@fawazlaw.sa</p>
            </a>
          </div>
          <div className="hidden md:block group z-50" ref={navRef}>
            <button
              onClick={() => setIsVisibleNav((ps) => !ps)}
              className="text-white focus:outline-none"
            >
              {activeLanguage === 'ar' ? (
                <span className="flex items-center justify-end">
                  <PiCaretDownBold />
                  <p className="mx-2">العربية</p>
                  <TbWorld />
                </span>
              ) : activeLanguage === 'en' ? (
                <span className="flex items-center justify-end">
                  <PiCaretDownBold />
                  <p className="mx-2">EN</p>
                  <TbWorld />
                </span>
              ) : (
                <span className="flex items-center justify-end">
                  <PiCaretDownBold />
                  <p className="mx-2">اردو</p>
                  <TbWorld />
                </span>
              )}
            </button>
            {isVisibleNav && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2  transition-opacity duration-300 z-10">
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
            )}
          </div>
        </div>
      </div>
      <NavHeader cart={cart} />
    </>
  );
};

export default NavBar;
