import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import { FaAngleLeft } from "react-icons/fa6";

const BlogHero = () => {
  return (
    <>
      <div className=" overflow-hidden w-full bg-bggradient justify-center items-center relative -z-30 lg:h-[50vh] lg:pb-28 lg:pt-10 py-9 ">
        <img
          src="\Images\bgservices.png"
          alt=""
          className=" absolute z-0 bottom-0 opacity-5"
        />
        <div className=" w-[80%] flex h-full lg:flex-row mx-auto lg:justify-end z-10 flex-col lg:items-center">
          <div className=" gap-2 lg:w-[65%]  flex flex-col z-10">
            <div className=" flex flex-row gap-2 items-center text-end justify-end pr-6 ">
              <a
                href="/services"
                className="flex w-fit flex-row gap-2 items-center text-end justify-end  "
              >
                <h1> المدونة</h1>
                <FaAngleLeft />
                <AiOutlineHome />
              </a>
            </div>
            <div className=" lg:w-[660px]">
              {/* <h3 className=" text-[24px] text-[#003E6F] font-medium text-end">
                شركة
              </h3> */}
              <h1 className=" lg:text-[50px] text-4xl pt-3 text-[#003E6F] text-end font-bold">
              المدونة
              </h1>
            </div>
            <div className=" lg:w-[660px] justify-end text-end">
              <p className=" text-end text-[20px] leading-10 font-normal ">
              شركة المحامي فواز محمد الداهش للمحاماة والاستشارات القانونية
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className=" w-full lg:-mt-20 z-[100] ">
        <div className=" w-[90%] overflow-hidden flex justify-center items-center lg:flex-row flex-col mx-auto gap-10  ">
          <img
            src="\Images\blog3new.png"
            className="lg:h-[440px] z-50 object-cover"
            alt=""
          />
          <img
            className="lg:h-[440px] z-50 object-cover"
            src="/Images/blog2new.png"
            alt=""
          />
          <img
            className=" lg:w-[500px] lg:h-[440px]  z-50"
            src="\Images\blog1new.png"
            alt=""
          />
        </div>
      </div>
    </>
  );
};

export default BlogHero;
