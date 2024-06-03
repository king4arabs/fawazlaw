import React, {useEffect} from "react";
import { useTranslation } from 'react-i18next';
import { BsSnapchat, BsTwitterX } from "react-icons/bs";
import { CiFacebook, CiLinkedin, CiYoutube } from "react-icons/ci";
import { MdOutlineMailOutline } from "react-icons/md";
import BottomNavNew from "../components/BottomNavNew";
import {
  IoLogoInstagram,
  IoMailOutline,
  IoPhonePortraitOutline,
} from "react-icons/io5";
import { PiTiktokLogo } from "react-icons/pi";

const FooterMain = () => {
  const { t, i18n } = useTranslation();
  const activeLanguage = i18n.language; // 'en' or 'ar'

  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, []);
  return (
    <div className="w-full flex flex-col justify-center items-center ">
      <div className=" w-full flex py-6 bg-gradient-to-b from-[#ECF2FF] to-[#fff]">
        <div className={`" mx-auto w-[80%] flex ${activeLanguage == 'ar'? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-2 items-center flex-col justify-between " `}>
          <div className={`${activeLanguage == 'ar'? 'flex flex-row gap-3' : 'flex flex-row-reverse gap-3'}`}>
            <button className="btn  bg-[#003E6F] text-white hover:bg-[#b6953e]">
              {t('subscribe')}
            </button>
            <label className={`" justify-end text-end lg:w-[300px] flex items-center gap-2 hover:border px-4 py-2 active:border rounded-lg outline outline-1" ${activeLanguage == 'ar'? '' : ''}`}>
            <MdOutlineMailOutline size={22} className={`${activeLanguage == 'ar'? 'hidden' : ''}`}/>
              <input
                type="text"
                className={`"grow outline-none bg-transparent border-none justify-end pr-2 " ${activeLanguage == 'ar'? 'text-end' : ''}`}
                placeholder={t('email')}
              />
              <MdOutlineMailOutline size={22} className={`${activeLanguage == 'ar'? '' : 'hidden'}`}/>
            </label>
          </div>
          <div>
            <h1 className={`font-bold  ${activeLanguage == 'ar'? 'text-end text-[20px]' : 'text-[17px]'}`}>
              {t("footerEmailText")}
            </h1>
          </div>
        </div>
      </div>
      <div className=" w-full flex">
        <div className=" w-[80%] flex flex-col mx-auto">
          <div className=" w-full grid lg:grid-cols-5 grid-cols-2 gap-5 py-20">
          {activeLanguage == 'ar'? (
              <><div className=" flex flex-col gap-4">
                <h1 className=" text-2xl font-bold text-end">العنوان</h1>
                <div className=" flex flex-row gap-2">
                  <div>
                    <p className=" text-base font-bold text-end">الرياض</p>
                    <p className=" text-base text-end opacity-55">
                      الملقا - طريق أنس بن مالك مركز وادي الأعمال
                    </p>
                  </div>  
                  <img
                    src="\Images\marker-pin-05ddddd.png"
                    className="w-4 h-4"
                    alt="" />
                </div>
                <div className=" flex flex-row gap-2">
                  <div>
                    <p className=" text-base font-bold text-end">جدة</p>
                    <p className=" text-base text-end opacity-55">
                      شارع الامير محمد بن عبد العزيز مركز الباشا الدور
                    </p>
                  </div>
                  <img
                    src="\Images\marker-pin-05ddddd.png"
                    className="w-4 h-4"
                    alt="" />
                </div>
              </div><div className=" flex flex-col gap-4">
                  <h1 className=" text-2xl font-bold text-[#000929] text-end">
                    العنوان
                  </h1>
                  <p className=" text-[#000929] text-end text-lg font-medium opacity-55">
                    تواصل معنا
                  </p>
                  <p className=" text-[#000929] text-end text-lg font-medium opacity-55">
                    الاسئلة الشائعة
                  </p>
                  <a
                    href="/contacts/tandc"
                    className=" text-[#000929] text-end text-lg font-medium opacity-55"
                  >
                    الشروط والاحكام
                  </a>
                  <a
                    href="/contacts/privacyPolicy"
                    className=" text-[#000929] text-end text-lg font-medium opacity-55"
                  >
                    سياسية الخصوصية
                  </a>
                </div><div className=" flex flex-col gap-4">
                  <h1 className=" text-2xl font-bold text-[#000929] text-end">
                    عن الشركة
                  </h1>
                  <p className=" text-[#000929] text-end text-lg font-medium opacity-55">
                    الرئيسية
                  </p>
                  <p className=" text-[#000929] text-end text-lg font-medium opacity-55">
                    عن الشركة
                  </p>
                  <p className=" text-[#000929] text-end text-lg font-medium opacity-55">
                    الخدمات
                  </p>
                  <p className=" text-[#000929] text-end text-lg font-medium opacity-55">
                    المدونة
                  </p>
                </div><div className=" flex flex-col lg:col-span-2 items-end gap-5">
                  <img
                    src="/images/lllll.png"
                    className="w-20 h-20 flex justify-end items-end text-end"
                    alt="" />
                  <h1 className=" text-xl text-[#525A6A] text-end lg:w-[280px]">
                    شركة المحامي فواز الداهش
                  </h1>
                  <h1 className=" text-xl text-[#525A6A] text-end lg:w-[280px]">
                    للمحاماة والاستشارات القانونية
                  </h1>
                </div></>

            ) : (
              <>
              <div className=" flex flex-col lg:col-span-2 gap-5">
                  <img
                    src="/images/lllll.png"
                    className="w-20 h-20 flex justify-end"
                    alt="" />
                  <h1 className=" text-xl text-[#525A6A] lg:w-[280px]">
                   {t('footerMainText')}
                  </h1>
                </div>
                <div className=" flex flex-col gap-2">
                  <h1 className=" text-2xl pb-3 font-bold text-[#000929]">
                    About
                  </h1>
                  <p className=" text-[#000929] text-base font-medium opacity-55">
                    Home
                  </p>
                  <p className=" text-[#000929] text-base font-medium opacity-55">
                    About
                  </p>
                  <p className=" text-[#000929] text-base font-medium opacity-55">
                    Services
                  </p>
                  <p className=" text-[#000929] text-base font-medium opacity-55">
                    Blogs
                  </p>
                </div>
                <div className=" flex flex-col gap-2">
                  <h1 className=" text-2xl pb-3 font-bold text-[#000929] ">
                    Contacts
                  </h1>
                  <p className=" text-[#000929] text-base font-medium opacity-55">
                    Connect Us
                  </p>
                  <p className=" text-[#000929] text-base font-medium opacity-55">
                    FAQs
                  </p>
                  <a
                    href="/contacts/tandc"
                    className=" text-[#000929] text-base font-medium opacity-55"
                  >
                   Terms and conditions
                  </a>
                  <a
                    href="/contacts/privacyPolicy"
                    className=" text-[#000929] text-base font-medium opacity-55"
                  >
                    Privacy Policy
                  </a>
                </div>
                <div className=" flex flex-col gap-4">
                <h1 className=" text-2xl font-bold ">Address</h1>
                <div className=" flex flex-row-reverse gap-2">
                  <div>
                    <p className=" text-base font-bold">Riyadh</p>
                    <p className=" text-base opacity-55">
                    Al Malqa - Anas bin Malik Road, Wadi Business Center
                    </p>
                  </div>
                  <img
                    src="\Images\marker-pin-05ddddd.png"
                    className="w-4 h-4"
                    alt="" />
                </div>
                <div className=" flex flex-row-reverse gap-2">
                  <div>
                    <p className=" text-base font-bold">Jeddah</p>
                    <p className=" text-base opacity-55">
                    Prince Muhammad bin Abdulaziz Street, Al-Basha Center, Floor
                    </p>
                  </div>
                  <img
                    src="\Images\marker-pin-05ddddd.png"
                    className="w-4 h-4"
                    alt="" />
                </div>
              </div>
              </>
            )}
          </div>
        </div>
      </div>
      <BottomNavNew />
      <div className=" w-[100%] flex lg:h-12 bg-[##F3F4F5] py-2 justify-center items-center ">
        <div className="w-[90%] flex lg:flex-row flex-col justify-between items-center">
          <div className=" flex lg:flex-row flex-col items-center gap-2 ">
            <div className="flex items-center gap-4">
              <a href="https://twitter.com/fawazlawyer" target="_blank">
                <BsTwitterX size={20} className="  text-[#000929]" />
              </a>
              <a href="#">
                <CiFacebook size={25} className="  text-[#000929]" />
              </a>
              <a href="https://www.instagram.com/fawazlawyer_/">
                <IoLogoInstagram size={25} className="  text-[#000929]" />
              </a>
              <a href="#" className=" flex">
                <CiLinkedin size={25} className="  text-[#000929]" />
              </a>
              <a href="https://youtube.com/@user-wf5vr3ky7b?si=0m7Iwc7oJkb_EroL" target="_blank" className=" flex">
                <CiYoutube size={25} className="  text-[#000929]" />
              </a>
            </div>
            <div className=" flex items-center gap-2 ">
              <a href="#" className=" flex items-center gap-1 pl-2">
                <IoPhonePortraitOutline
                  size={20}
                  className="  text-[#000929]"
                />
                <p className=" text-[#000929] text-[14px]">+966920013767</p>
              </a>
              <a href="#" className=" flex items-center gap-1 pl-2">
                <IoMailOutline size={20} className="  text-[#000929]" />
                <p className=" text-[#000929] text-[14px]">info@fawazlaw.sa</p>
              </a>
            </div>
          </div>
          <div className=" items-center lg:text-base text-sm gap-2 text-end lg:flex text-[#3E4450]">
            {t("footerTerms")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterMain;
