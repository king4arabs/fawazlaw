import React, { useState } from "react";
import { BsSnapchat, BsTwitterX } from "react-icons/bs";
import { CiFacebook, CiLinkedin, CiYoutube } from "react-icons/ci";
import {
  IoLogoInstagram,
  IoMailOutline,
  IoPhonePortraitOutline,
} from "react-icons/io5";
import { PiCaretDownBold, PiTiktokLogo } from "react-icons/pi";
import { TbWorld } from "react-icons/tb";
import NavHeader from "./NavHeader";
import i18n from '../il8n';

const NavBar = () => {
  const [activeLanguage, setActiveLanguage] = useState(i18n.language);

  const changeLanguage = (lng) => {
    localStorage.setItem('selectedLanguage', lng);
    i18n.changeLanguage(lng);
    setActiveLanguage(lng);
  };
  
  return (
    <>
      <div className=" w-[100%] flex h-12 bg-[#003E6F] justify-center items-center overflow-x-auto no-scrollbar">
        <div className="w-[90%] flex justify-between items-center">
          <div className={`flex flex-row items-center gap-3`}>
            <a href="https://twitter.com/fawazlawyer" target="_blank">
              <BsTwitterX size={20} className="  text-white" />
            </a>
            <a href="#" target="_blank">
              <CiFacebook size={25} className="  text-white" />
            </a>
            <a
              href="https://www.instagram.com/fawazlawyer_/"
              target="_blank"
            >
              <IoLogoInstagram size={22} className="  text-white" />
            </a>
            <a href="#" target="_blank" className=" flex">
              <CiLinkedin size={25} className="  text-white" />
            </a>
            <a
              href="https://youtube.com/@user-wf5vr3ky7b?si=0m7Iwc7oJkb_EroL"
              target="_blank"
              className=" flex"
            >
              <CiYoutube size={25} className="  text-white" />
            </a>
            <a
              href="#"
              target="_blank"
              className=" flex items-center gap-1 pl-2"
            >
              <IoPhonePortraitOutline size={18} className="  text-white" />
              <p className=" text-white text-sm">+966920013767</p>
            </a>
            <a
              href="#"
              target="_blank"
              className=" flex items-center gap-1 pl-2"
            >
              <IoMailOutline size={20} className="  text-white" />
              <p className=" text-white text-sm">info@fawazlaw.sa</p>
            </a>
          </div>
          {activeLanguage === "ar"? (
            <div className="items-center gap-4 lg:flex hidden">
              <div className="px-3 py-2 flex text-white items-center gap-[3px]" onClick={() => changeLanguage('en')}>
                <PiCaretDownBold />
                <p>EN</p>
                <TbWorld />
              </div>
            </div>
          ) : (
            <div className="items-center gap-4 lg:flex hidden">
              <div className="px-3 py-2 flex text-white items-center gap-[5px]" onClick={() => changeLanguage('ar')}>
                <PiCaretDownBold />
                <p>العربية</p>
                <TbWorld />
              </div>
            </div>
          )}
        </div>
      </div>
      <NavHeader />
    </>
  );
};

export default NavBar;
