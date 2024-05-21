import React from "react";
import Marquee from "react-fast-marquee";
import { AiOutlineHome } from "react-icons/ai";
import { FaAngleLeft } from "react-icons/fa6";
const WhatWedoHero = () => {
  return (
    <>
      <div className=" overflow-hidden w-full bg-bggradient justify-center items-center lg:h-[83vh] relative mb-10 pb-14">
        <img
          src="\Images\whatwedobg.png"
          alt=""
          className=" absolute z-0 bottom-0 opacity-5"
        />
        <div className=" w-[80%] flex h-full lg:flex-row mx-auto lg:justify-between z-10 flex-col lg:items-center">
          <div className=" flex z-10 lg:max-w-[40%]">
            <img src="\Images\Group.png" alt="lawerPhoto" />
          </div>
          <div className=" gap-9 lg:w-[60%] flex flex-col z-10 items-end text-end">
            <div className=" flex flex-row gap-2 items-center text-end justify-end pr-6 ">
              <a
                href="/"
                className="flex w-fit flex-row gap-2 items-center text-end justify-end  "
              >
                <h1>من نحن</h1>
                <FaAngleLeft />
                <AiOutlineHome />
              </a>
            </div>
            <div className=" gap-5 flex flex-col">
              <h3 className=" lg:text-[50px] text-4xl text-[#003E6F] font-medium text-end">
                من نحن
              </h3>
              <h1 className=" lg:text-[16px] text-xl text-end">
                شركة المحامي فواز محمد الداهش للمحاماة والاستشارات القانونية
              </h1>
            </div>
            <div className=" lg:w-[580px] justify-end text-end">
              <p className=" text-end text-[24px] leading-10 font-normal ">
                شركة مرخصة لمزاولة مهنة المحاماة من وزارة العدل في المملكة
                العربية السعودية حيث تقدم الشركة خدمات قانونية في مختلف مجالات
                القانون
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className=" flex flex-row gap-6 mx-auto justify-center items-center lg:-mt-40 -mt-20 z-50  ml-16 pb-10 pt-16">
        <Marquee
          className=""
          pauseOnClick={true}
          pauseOnHover={true}
          speed={100}
          loop={100}
        >
          <div className=" flex flex-col gap-5 px-10 w-[170px] h-[230px] py-10 justify-end items-end bg-white shadow-2xl rounded-lg mx-6 mb-4">
            <img
              src="\Images\Frame 1000003323graph.png"
              className="w-20 h-20 text-end"
              alt=""
            />
            <h1 className=" font-bold text-xl">التحكيم</h1>
          </div>
          <div className=" flex flex-col gap-5 px-10 w-[170px] h-[230px] py-10 justify-end items-end bg-white shadow-2xl rounded-lg mx-6">
            <img
              src="\Images\Frame 1000003323bookandpen.png"
              className="w-20 h-20 text-end justify-end"
              alt=""
            />
            <h1 className=" font-bold text-xl flex text-nowrap">ملكية فكرية</h1>
          </div>
          <div className=" flex flex-col gap-5 px-10 w-[170px] h-[230px] py-10 justify-end items-end bg-white shadow-2xl rounded-lg mx-6">
            <img
              src="\Images\Frame 1000003323bot (1).png"
              className="w-20 h-20 text-end"
              alt=""
            />
            <h1 className=" font-bold text-xl text-nowrap">توثيق قانوني</h1>
          </div>
          <div className=" flex flex-col gap-5 px-10 w-[170px] h-[230px] py-10 justify-end items-end bg-white shadow-2xl rounded-lg mx-6">
            <img
              src="\Images\Frame 1000003323jotter (1).png"
              className="w-20 h-20 text-end"
              alt=""
            />
            <h1 className=" font-bold text-xl text-nowrap">أمناء إفلاس</h1>
          </div>
          <div className=" flex flex-col gap-5 px-10 w-[170px] h-[230px] py-10 justify-end items-end bg-white shadow-2xl rounded-lg mx-6">
            <img
              src="\Images\Frame 1000003323searchman.png"
              className="w-20 h-20 text-end"
              alt=""
            />
            <h1 className=" font-bold text-xl text-end">
              الإستشارات القانونية
            </h1>
          </div>
          <div className=" flex flex-col gap-5 px-10 w-[170px] h-[230px] py-10 justify-end items-end bg-white shadow-2xl rounded-lg mx-6">
            <img
              src="\Images\Frame 1000003324lawbalance.png"
              className="w-20 h-20 text-end"
              alt=""
            />
            <h1 className=" font-bold text-xl">المحاماة</h1>
          </div>
        </Marquee>
      </div>
    </>
  );
};

export default WhatWedoHero;
