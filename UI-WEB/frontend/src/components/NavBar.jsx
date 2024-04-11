import React from "react";
import { TbWorld } from "react-icons/tb";
import { BsTwitterX } from "react-icons/bs";
import { CiFacebook } from "react-icons/ci";
import { IoPhonePortraitOutline } from "react-icons/io5";
import { CiYoutube } from "react-icons/ci";
import { CiLinkedin } from "react-icons/ci";
import { IoLogoInstagram } from "react-icons/io5";
import { IoMailOutline } from "react-icons/io5";
import { PiCaretDownBold } from "react-icons/pi";
import NavHeader from "./NavHeader";

const NavBar = () => {
  return (
    <>
      <div className=" w-[100%] flex h-12 bg-[#003E6F] justify-center items-center">
        <div className="w-[80%] flex justify-between items-center">
          <div className=" flex flex-row items-center gap-2">
            <a href="#" target="_blank">
              <BsTwitterX size={25} className="  text-white" />
            </a>
            <a href="#" target="_blank">
              <CiFacebook size={30} className="  text-white" />
            </a>
            <a href="#" target="_blank">
              <IoLogoInstagram size={30} className="  text-white" />
            </a>
            <a href="#" target="_blank" className=" flex">
              <CiLinkedin size={30} className="  text-white" />
            </a>
            <a href="#" target="_blank" className=" flex">
              <CiYoutube size={30} className="  text-white" />
            </a>
            <a href="#" target="_blank" className=" flex">
              <IoLogoInstagram size={30} className="  text-white" />
            </a>
            <a
              href="#"
              target="_blank"
              className=" flex items-center gap-1 pl-2"
            >
              <IoPhonePortraitOutline size={20} className="  text-white" />
              <p className=" text-white">+966920013767</p>
            </a>
            <a
              href="#"
              target="_blank"
              className=" flex items-center gap-1 pl-2"
            >
              <IoMailOutline size={20} className="  text-white" />
              <p className=" text-white">info@fawazlaw.sa</p>
            </a>
          </div>
          <div className=" items-center gap-2 lg:flex hidden">
            <div className="px-3 py-2 flex text-white items-center gap-[1px]">
              <PiCaretDownBold />
              <p>العربية</p>
              <TbWorld />
            </div>
            <div className="px-3 py-2 flex text-white items-center gap-[1px]">
              <PiCaretDownBold />
              <p>السعودية</p>
              <img src="/Flags.png" alt="flag" />
            </div>
          </div>
        </div>
      </div>
      <NavHeader />
    </>
  );
};

export default NavBar;
