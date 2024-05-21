import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import { FaAngleLeft } from "react-icons/fa6";

const CartHero = () => {
  return (
    <div className=" overflow-hidden w-full bg-bggradient justify-center items-center relative lg:h-[50vh] lg:pb-28 lg:pt-20 py-9 ">
      <img
        src="\Images\bgservices.png"
        alt=""
        className=" absolute z-0 bottom-0 opacity-5"
      />
      <div className=" w-[80%] flex h-full lg:flex-row mx-auto lg:justify-end z-10 flex-col lg:items-center">
        <div className=" gap-2 lg:w-[65%]  flex flex-col z-10">
        <div className=" flex flex-row gap-2 items-center text-end justify-end pr-6 ">
              <a
                href="/cart"
                className="flex w-fit flex-row gap-2 items-center text-end justify-end  "
              >
                <h1> سلة الطلبات</h1>
                <FaAngleLeft />
                <AiOutlineHome />
              </a>
            </div>
          <div className=" lg:w-[660px] pt-4">
            <h1 className=" lg:text-[50px] text-4xl text-[#003E6F] text-end font-bold pb-2">
            سلة الطلبات

            </h1>
          </div>
          <div className=" lg:w-[660px] justify-end text-end">
            <p className=" text-end text-[20px] leading-10 font-normal">
              شركة المحامي فواز محمد الداهش للمحاماة والاستشارات القانونية
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartHero;
