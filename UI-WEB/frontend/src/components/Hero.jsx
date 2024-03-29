import React from "react";

const Hero = () => {
  return (
    <div className=" overflow-hidden w-full bg-bggradient justify-center items-center lg:h-[83vh] relative">
      <img
        src="\Images\bgvector.png"
        alt=""
        className=" absolute z-0 bottom-0 opacity-5"
      />
      <div className=" w-[80%] flex h-full lg:flex-row mx-auto lg:justify-between z-10 flex-col lg:items-center">
        <div className=" flex z-10">
          <img src="\Images\herolawer.png" alt="lawerPhoto" />
        </div>
        <div className=" gap-9 lg:w-[65%]  flex flex-col z-10">
          <div>
            <h3 className=" text-[24px] text-[#003E6F] font-medium text-end">
              شركة
            </h3>
            <h1 className=" lg;text-[50px] text-4xl text-[#003E6F] text-end font-bold">
              فواز الداهش للمحاماة
            </h1>
          </div>
          <div className=" lg:w-[660px] justify-end text-end">
            <p className=" text-end text-[24px] leading-10 font-normal ">
              شركة مرخصة لمزاولة مهنة المحاماة من وزارة العدل في المملكة العربية
              السعودية حيث تقدم الشركة خدمات قانونية في مختلف مجالات القانون
            </p>
          </div>
          <div className=" flex flex-row justify-end gap-3">
            <button className="px-5 py-2 flex border rounded-lg bg-[#003E6F] text-white items-center gap-[1px]">
              تواصل معنا
            </button>
            <button className="px-5 py-2 flex border rounded-lg  text-[#3E4450] items-center gap-[1px]">
              تعرف على خدماتنا
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
