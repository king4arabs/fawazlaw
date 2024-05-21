import React from "react";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { TiTick } from "react-icons/ti";
import HomeSection1Cards from "./HomeSection1Cards";

const HomeSection1 = () => {
  return (
    <div className="w-full my-20 px-14">
      <div className="w-[100%]">
      <div className="w-full flex flex-col">
      <div className="subsection flex justify-between items-start">
        <div className="arrowAndbutton flex items-center gap-1 pt-2 pl-2">
          <FaRegArrowAltCircleLeft size={23} />
          <p className="lg:text-[14px] font-bold">كل الخدمات</p>
        </div>
        <h1 className="lg:text-[35px] text-4xl font-bold w-fit pb-3">
          خدمات تتناسب مع طبيعة عملك
        </h1>
      </div>
      <p className="text-[16px] xl:mt-4 mt-1 ml-auto">
        تتسم خدماتنا القانونية بالتنوع مستندين على منهجية قانونية تتماشى مع المتغيرات والتطورات الحديثة
      </p>
    </div>
      <HomeSection1Cards/>
      </div>
    </div>
  );
};

export default HomeSection1;
