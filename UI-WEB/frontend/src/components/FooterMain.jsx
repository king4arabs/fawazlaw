import React from "react";
import { BsTwitterX } from "react-icons/bs";
import { CiFacebook, CiLinkedin, CiYoutube } from "react-icons/ci";
import {
  IoLogoInstagram,
  IoMailOutline,
  IoPhonePortraitOutline,
} from "react-icons/io5";

const FooterMain = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center ">
      <div className=" w-full flex py-6 border-b">
        <div className=" mx-auto w-[80%] flex lg:flex-row gap-2 flex-col justify-between items-center">
          <div className=" flex flex-row gap-3">
            <button className="btn  bg-[#003E6F] text-white hover:bg-[#b6953e]">
              اشتراك
            </button>
            <label className=" justify-end text-end lg:w-[300px] flex items-center gap-2 hover:border px-4 py-2 active:border rounded-lg outline outline-1">
              <input
                type="text"
                className="grow outline-none bg-transparent border-none text-end justify-end"
                placeholder="البريد الالكتروني"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
            </label>
          </div>
          <div>
            <h1 className=" font-bold text-end text-[20px]">
              اشترك في النشرة البريدية لتصلك اخر الاخبار والتدوينات
            </h1>
          </div>
        </div>
      </div>
      <div className=" w-full flex">
        <div className=" w-[80%] flex flex-col mx-auto">
          <div className=" w-full grid lg:grid-cols-5 grid-cols-2 gap-5 py-20">
            <div className=" flex flex-col gap-4">
              <h1 className=" text-2xl font-bold text-end">العنوان</h1>
              <div className=" flex flex-row gap-2">
                <div>
                  <p className=" text-base font-bold text-end">الرياض</p>
                  <p className=" text-base text-end">
                    الملقا - طريق أنس بن مالك مركز وادي الأعمال
                  </p>
                </div>
                <img
                  src="\Images\marker-pin-05ddddd.png"
                  className="w-4 h-4"
                  alt=""
                />
              </div>
              <div className=" flex flex-row gap-2">
                <div>
                  <p className=" text-base font-bold text-end">جدة</p>
                  <p className=" text-base text-end">
                    شارع الامير محمد بن عبد العزيز مركز الباشا الدور
                  </p>
                </div>
                <img
                  src="\Images\marker-pin-05ddddd.png"
                  className="w-4 h-4"
                  alt=""
                />
              </div>
            </div>
            <div className=" flex flex-col gap-4">
              <h1 className=" text-2xl font-bold text-[#000929] text-end">
                العنوان
              </h1>
              <p className=" text-[#000929] text-end text-lg font-semibold opacity-55">
                تواصل معنا
              </p>
              <p className=" text-[#000929] text-end text-lg font-semibold opacity-55">
                الاسئلة الشائعة
              </p>
              <a
                href="/contacts/tandc"
                className=" text-[#000929] text-end text-lg font-semibold opacity-55"
              >
                الشروط والاحكام
              </a>
              <a
                href="/contacts/privacyPolicy"
                className=" text-[#000929] text-end text-lg font-semibold opacity-55"
              >
                سياسية الخصوصية
              </a>
            </div>
            <div className=" flex flex-col gap-4">
              <h1 className=" text-2xl font-bold text-[#000929] text-end">
                عن الشركة
              </h1>
              <p className=" text-[#000929] text-end text-lg font-semibold opacity-55">
                الرئيسية
              </p>
              <p className=" text-[#000929] text-end text-lg font-semibold opacity-55">
                عن الشركة
              </p>
              <p className=" text-[#000929] text-end text-lg font-semibold opacity-55">
                الخدمات
              </p>
              <p className=" text-[#000929] text-end text-lg font-semibold opacity-55">
                المدونة
              </p>
            </div>
            <div className=" flex flex-col lg:col-span-2 items-end gap-5">
              <img
                src="/images/lllll.png"
                className="w-20 h-20 flex justify-end items-end text-end"
                alt=""
              />
              <h1 className=" text-xl text-[#525A6A] text-end lg:w-[280px]">
                شركة المحامي فواز الداهش
              </h1>
              <h1 className=" text-xl text-[#525A6A] text-end lg:w-[280px]">
                شركة المحامي فواز الداهش
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className=" w-[100%] flex lg:h-12 bg-[#F8F8F9] py-2 justify-center items-center border-t-2">
        <div className="w-[80%] flex lg:flex-row flex-col justify-between items-center">
          <div className=" flex lg:flex-row flex-col items-center gap-2 ">
            <div className="flex items-center gap-2">
              <a href="#">
                <BsTwitterX size={25} className="  text-[#000929]" />
              </a>
              <a href="#">
                <CiFacebook size={30} className="  text-[#000929]" />
              </a>
              <a href="#">
                <IoLogoInstagram size={30} className="  text-[#000929]" />
              </a>
              <a href="#" className=" flex">
                <CiLinkedin size={30} className="  text-[#000929]" />
              </a>
              <a href="#" className=" flex">
                <CiYoutube size={30} className="  text-[#000929]" />
              </a>
              <a href="#" className=" flex">
                <IoLogoInstagram size={30} className="  text-[#000929]" />
              </a>
            </div>
            <div className=" flex items-center gap-2 ">
              <a href="#" className=" flex items-center gap-1 pl-2">
                <IoPhonePortraitOutline
                  size={20}
                  className="  text-[#000929]"
                />
                <p className=" text-[#000929]">+966920013767</p>
              </a>
              <a href="#" className=" flex items-center gap-1 pl-2">
                <IoMailOutline size={20} className="  text-[#000929]" />
                <p className=" text-[#000929]">info@fawazlaw.sa</p>
              </a>
            </div>
          </div>
          <div className=" items-center lg:text-base text-sm gap-2 text-end lg:flex">
            &#x202e;© جميع الحقوق محفوظة لشركة فواز الداهش للمحاماة{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterMain;
