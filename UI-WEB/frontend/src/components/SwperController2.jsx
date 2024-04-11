import React from "react";
import { PiCaretLeft, PiCaretRight } from "react-icons/pi";
import { useSwiper } from "swiper/react";

const SwperController2 = () => {
  const swiper = useSwiper();
  return (
    <div className=" w-[80%]  top-[500px] absolute z-50 mx-auto flex ml-20 flex-row  justify-between  ">
      <div className=" flex flex-row gap-2   ">
        <button
          onClick={() => swiper.slidePrev()}
          className=" text-black w-8 h-8 border rounded-full bg-white justify-center items-center flex "
        >
          <PiCaretLeft />
        </button>
        <button
          onClick={() => swiper.slideNext()}
          className=" text-black w-8 h-8 border rounded-full bg-white justify-center items-center flex "
        >
          <PiCaretRight />
        </button>
      </div>
      <div className=" text-black"> 01 من 15 </div>
    </div>
  );
};

export default SwperController2;
