import React from "react";
import {
  BsArrow90DegLeft,
  BsArrowBarLeft,
  BsArrowLeftCircle,
} from "react-icons/bs";
import { PiCaretLeft, PiCaretLeftThin, PiCaretRight } from "react-icons/pi";

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
      <div className=" flex flex-row gap-9 justify-end lg:mr-32 mr-16 ">
        <img src="\Images\Group 1000003317oooooo.png" alt="" className=" " />
        <img
          src="\Images\Group 1000003316nnnnncncncn.png"
          alt=""
          className=" "
        />
        <img
          src="/Images/Group 1000003315fefefefef.png"
          className=" w-[500px] "
          alt=""
        />
      </div>
      <div className=" w-[80%] mx-auto pb-12 flex flex-row  justify-between  ">
        <div className=" flex flex-row gap-2 ">
          <div className=" text-black w-6 h-6 rounded-full bg-white justify-center items-center flex ">
            <PiCaretLeft />
          </div>
          <div className=" text-black w-6 h-6 rounded-full bg-white justify-center items-center flex ">
            <PiCaretRight />
          </div>
        </div>
        <div className=" text-white"> 01 من 15 </div>
      </div>
    </div>
  );
};

export default DarkblueSection;
