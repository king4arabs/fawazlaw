import "swiper/css";
// import { Swiper } from "swiper";
import "swiper/css/pagination";
import React from "react";
import { BsArrowLeftCircle } from "react-icons/bs";
import { Swiper, SwiperSlide } from "swiper/react";
import { PiCaretLeft, PiCaretRight } from "react-icons/pi";
import SwperController from "./SwperController";

const DarkblueSection = () => {
  return (
    <div className=" w-full bg-[#00192C] my-14 gap-10 flex flex-col">
      <div className=" w-[80%] flex lg:flex-row flex-col  justify-between mx-auto pt-12 gap-4  ">
        <div className=" flex flex-row items-center text-white gap-2 ">
          <BsArrowLeftCircle size={25} />
          <p>كل الخدمات</p>
        </div>
        <div className=" lg:text-[48px] text-3xl font-bold text-white text-end">
          <h1>خدمات تتناسب مع طبيعة عملك</h1>
          <p className=" text-[16px] font-medium text-end">
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
              src="\Images\Group 1000003317oooooo.png"
              alt=""
              className=" "
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="\Images\Group 1000003316nnnnncncncn.png"
              alt=""
              className=" "
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="/Images/Group 1000003315fefefefef.png"
              className=" w-[500px] lg:h-[450px] "
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="\Images\Group 1000003316nnnnncncncn.png"
              alt=""
              className=" "
            />
          </SwiperSlide>
          <SwiperSlide className=" mb-20">
            <img
              src="/Images/Group 1000003315fefefefef.png"
              className=" w-[500px] lg:h-[450px] "
              alt=""
            />
          </SwiperSlide>
          <SwperController />
        </Swiper>
      </div>
    </div>
  );
};

export default DarkblueSection;
