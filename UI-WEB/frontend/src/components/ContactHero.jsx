import React from "react";

const ContactHero = () => {
  return (
    <div className=" overflow-hidden w-full bg-bggradient justify-center items-center relative  lg:pb-28 lg:pt-10 py-9 ">
      <div className=" overflow-hidden w-full bg-bggradient justify-center items-center relative lg:h-[50vh] lg:pb-28 lg:pt-10 py-9 ">
        <img
          src="\Images\bgservices.png"
          alt=""
          className=" absolute z-0 bottom-0 opacity-5"
        />
        <div className=" w-[80%] flex h-full lg:flex-row mx-auto lg:justify-end z-10 flex-col lg:items-center">
          <div className=" gap-2 lg:w-[65%]  flex flex-col z-10">
            <div className=" lg:w-[660px]">
              {/* <h3 className=" text-[24px] text-[#003E6F] font-medium text-end">
                شركة
              </h3> */}
              <h1 className=" lg:text-[50px] text-4xl text-[#003E6F] text-end font-bold">
                الخدمات
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
      {/* hereeeeeeeeeeeeeeeeeeeee */}
      <div className="w-full mx-auto">
        <div className=" border w-full mx-auto flex flex-col justify-center items-center relative lg:pb-28 lg:pt-10 py-9 ">
          <div className="w-full">
            <img src="\Images\Container (1).png" alt="" className="" />
          </div>
        </div>
      </div>
      <div>
        <div className=" w-[80%] mx-auto grid gap-3 just grid-cols-1 lg:grid-cols-3 my-12 ">
          <div className=" gap-2 text-end flex flex-col w-full justify-center items-center">
            <div className=" w-fit items-end">
              <h1 className=" font-bold text-2xl">مساعدة؟</h1>
              <p>فريقنا الودود هنا للمساعدة.</p>
              <h4 className=" text-xl font-bold text-[#003E6F] ">
                info@fawazlaw.sa
              </h4>
            </div>
          </div>
          <div className=" flex flex-col gap-2">
            <h1 className=" text-xl font-bold text-end">العنوان</h1>
            <div className=" flex flex-row gap-2">
              <div className=" flex flex-col text-end justify-end w-full">
                <p className=" text-base font-bold text-end">الرياض</p>
                <p className=" text-[14px] text-end">
                  الملقا - طريق أنس بن مالك مركز وادي الأعمال
                </p>
              </div>
              <img
                src="\Images\marker-pin-05ddddd.png"
                className="w-4 h-4"
                alt=""
              />
            </div>
            <div className=" flex flex-row gap-2 w-full">
              <div className=" flex flex-col text-end justify-end w-full">
                <p className=" text-base font-bold text-end">جدة</p>
                <p className=" text-[14px] text-end">
                  شارع الامير محمد بن عبد العزيز مركز الباشا الدور
                </p>
              </div>
              <img
                src="\Images\marker-pin-05ddddd.png"
                className="w-4 h-4"
                alt=""
              />
            </div>
          </div>
          <div className=" gap-2 text-end flex flex-col w-full justify-center items-center">
            <div className=" w-[230px] items-end">
              <h1 className=" font-bold text-2xl">الجوال</h1>
              <p className="">
                من السبت إلى الخميس من الساعة 8 صباحًا حتى 5 مساءً.
              </p>
              <h4 className=" text-xl font-bold text-[#003E6F] ">
                +966920013767
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactHero;
