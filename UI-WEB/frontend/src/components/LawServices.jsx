import "swiper/css";
// import { Swiper } from "swiper";
import "swiper/css/pagination";
import React from "react";
import { BsArrowLeftCircle } from "react-icons/bs";
import { Swiper, SwiperSlide } from "swiper/react";
import { PiCaretLeft, PiCaretRight } from "react-icons/pi";
import SwperController from "./SwperController";
import SwperController2 from "./SwperController2";

const LawServices = () => {
  return (
    <div className=" w-full text-black my-14 gap-10 flex flex-col">
      <div className=" w-[80%] flex lg:flex-row flex-col  justify-end mx-auto pt-12 gap-4  ">
        <div className=" lg:text-[48px] text-3xl font-bold text-black text-end">
          <h1>أعضاء الشركة</h1>
          <p className=" text-[16px] font-normal text-end">
            تتسم خدماتنا القانونية بالتنوع مستندين على منهجية قانونية تتماشى مع
            المتغيرات والتطورات الحديثة
          </p>
        </div>
      </div>
      <div className=" flex flex-row gap-9 relative justify-end lg:mr-32 mr-16 ">
        <Swiper
          // modules={[Navigation, Pagination, Ally]}
          className="mb-16"
          slidesPerView={3}
          autoplay
          spaceBetween={30}
        >
          <SwiperSlide>
            <img
              src="\Images\item of infrastructure (2).png"
              className=" w-[500px] lg:h-[450px] "
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="\Images\item of infrastructure (1).png"
              alt=""
              className=" w-[500px] lg:h-[450px]"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="\Images\item of infrastructure (2).png"
              className="w-[500px] lg:h-[450px]"
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide className=" mb-20">
            <img
              src="\Images\item of infrastructure.png"
              className=" w-[500px] lg:h-[450px] "
              alt=""
            />
          </SwiperSlide>
          <SwperController2 className={"text-black"} />
        </Swiper>
      </div>
    </div>
  );
};

export default LawServices;
