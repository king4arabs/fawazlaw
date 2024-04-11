import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import { FaAngleLeft } from "react-icons/fa6";

const ServicesHero = () => {
  return (
    <>
      <div className=" overflow-hidden w-full bg-bggradient justify-center items-center relative lg:h-[50vh] z-0 lg:pb-28 lg:pt-10 py-9 ">
        <img
          src="\Images\bgservices.png"
          alt=""
          className=" absolute z-0 bottom-0 opacity-5"
        />
        <div className=" w-[80%] flex h-full lg:flex-row mx-auto lg:justify-end z-10 flex-col lg:items-center relative">
          <div className=" gap-4 lg:w-[65%] flex flex-col z-10 text-end justify-end">
            <div className=" flex flex-row gap-2 items-center text-end justify-end pr-6 ">
              <a
                href="/whatwedo"
                className="flex w-fit flex-row gap-2 items-center text-end justify-end  "
              >
                <h1> الخدمات</h1>
                <FaAngleLeft />
                <AiOutlineHome />
              </a>
            </div>
            <div className=" lg:w-[660px] flex-col flex gap-3 justify-end text-end">
              {/* <h3 className=" text-[24px] text-[#003E6F] font-medium text-end">
                شركة
              </h3> */}
              <h1 className=" lg:text-[50px] text-4xl text-[#003E6F] text-end font-bold">
                الخدمات
              </h1>
            </div>
            <div className=" lg:w-[660px] justify-end text-end">
              <p className=" text-end text-[20px] leading-10 font-normal ">
                شركة المحامي فواز محمد الداهش للمحاماة والاستشارات القانونية
              </p>
            </div>
          </div>
        </div>

        {/* hereeeeeeeeeeeeeeeeeeeee */}
      </div>
      <div className=" w-full lg:-mt-20 -z-50  ">
        <div className=" w-[80%] overflow-hidden -z-40 flex justify-center items-center lg:flex-row flex-col mx-auto gap-10  ">
          <p></p>
          <div className=" w-[370px] bg-white z-50 py-8 px-5 border rounded-lg gap-10 group flex flex-col items-end justify-end hover:shadow-2xl">
            <div className=" flex flex-col items-end gap-5">
              <img src="\Images\Circleidk.png" alt="" />
              <div className=" justify-end items-end flex flex-col gap-3 w-full">
                <h1 className=" text-[22px] font-bold text-end">
                  استشارات الشركات والاعمال
                </h1>
                <h3 className=" text-[16.9px] font-normal text-end">
                  نحرص على تقديم خدماتنا من خلال فريق عمل يتميز بعمق التجربة
                  والمعرفة الوثيقة بكافة جوانبة
                </h3>
              </div>
            </div>
            <div className=" justify-end items-end hidden group-hover:flex w-full opacity-0 group-hover:opacity-100 transition duration-[100ms] ">
              <button className="px-5 py-2 flex border rounded-lg  text-[#3E4450] items-center gap-[1px]">
                اطلب الان
              </button>
            </div>
          </div>
          <div className=" w-[370px] bg-white z-50 py-8 px-5 border rounded-lg gap-10  flex flex-col items-end justify-end shadow-2xl">
            <div className=" flex flex-col items-end gap-5">
              <img src="\Images\Icongraph.png" alt="" />
              <div className=" justify-end items-end flex flex-col gap-3 w-full">
                <h1 className=" text-[20px] font-bold text-end">
                  استشارات عقود العمل
                </h1>
                <h3 className=" text-[16.9px] font-normal text-end">
                  نسعى لأن نقدم خدماتنا المتنوعة لعملائنا باهتمام عالي لتحقيق
                  أعلي مستويات الانجاز والرضا.
                </h3>
              </div>
            </div>
            <div className=" justify-end items-end flex  group-hover:flex w-full ">
              <button className="px-5 py-2 flex border rounded-lg  text-[#3E4450] items-center gap-[1px]">
                اطلب الان
              </button>
            </div>
          </div>
          <div className=" w-[370px] bg-white z-50 py-8 px-5 border rounded-lg gap-10 group flex flex-col items-end justify-end hover:shadow-2xl">
            <div className=" flex flex-col items-end gap-5">
              <img src="\Images\Circleidk.png" alt="" />
              <div className=" justify-end items-end flex flex-col gap-3 w-full">
                <h1 className=" text-[22px] font-bold text-end">
                  استشارات الشركات والاعمال
                </h1>
                <h3 className=" text-[16.9px] font-normal text-end">
                  نحرص على تقديم خدماتنا من خلال فريق عمل يتميز بعمق التجربة
                  والمعرفة الوثيقة بكافة جوانبة
                </h3>
              </div>
            </div>
            <div className=" justify-end items-end hidden group-hover:flex w-full opacity-0 group-hover:opacity-100 transition duration-[100ms] ">
              <button className="px-5 py-2 flex border rounded-lg  text-[#3E4450] items-center gap-[1px]">
                اطلب الان
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServicesHero;
