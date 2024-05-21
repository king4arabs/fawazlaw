import React from "react";
import { BsArrowLeftCircle } from "react-icons/bs";

const HomwBlogSection = () => {
  return (
    <div className=" w-full my-14 gap-10 flex flex-col ">
      <div className=" w-[90%] flex lg:flex-row flex-col  justify-between mx-auto pt-4 gap-4">
        <a
          href="/blog"
          className=" flex flex-row items-top pt-3 text-black gap-2 "
        >
          <BsArrowLeftCircle size={25} />
          <p>كل الخدمات</p>
        </a>
        <div className=" lg:text-[48px] text-3xl text-black text-end">
          <h1 className="font-bold text-[35px] text-3xl">اخر التدوينات</h1>
          <p className=" text-[16px] text-end pt-3">
            فى شركة فواز نحن نفهم اهمية هذه القرارت ولهذا السبب نحن هنا لنقدم لك
            المشورة القانونية المتخصصة
          </p>
        </div>
      </div>
      <div className=" flex flex-col lg:flex-row gap-3 w-[90%] mx-auto justify-center items-center">
        <div className=" p-6 flex group flex-col justify-end items-end gap-6 rounded-xl border hover:shadow-xl">
          <div
            className=" w-[352px] h-[240px] rounded-xl"
            style={{
              backgroundImage: `url("/Images/blog1.png")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
          <div className="gap-4 flex flex-col text-end ">
            <h1 className=" text-[20px] font-bold text-end">
              شركة فواز الداهش للمحاماة تنتهي من اكبر عدد قاضايا
            </h1>
            <p className=" text-[14px]">
              تفاصيل عن الخبر في سطرين فقط وباختصار بسيط والبقية في التفاصيل
            </p>
            <backward className="  flex justify-end text-[14px]">
              &#x202e;21 محرم 3441 - 30 مساء
            </backward>
          </div>
          <button className="px-5 hidden py-2 w-fit lg:hidden group-hover:flex border rounded-lg text-[#3E4450] border-[#C8CBD3] items-center gap-[1px]">
            <p>التفاصيل</p>
          </button>
        </div>
        <div className="p-6 flex group flex-col justify-end items-end gap-6 rounded-xl border hover:shadow-xl">
          <div
            className=" w-[352px] h-[240px] rounded-xl"
            style={{
              backgroundImage: `url("/Images/blog2.png")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
          <div className="gap-4 flex flex-col text-end ">
            <h1 className=" text-[20px] font-bold text-end">
              شركة فواز الداهش للمحاماة تنتهي من اكبر عدد قاضايا
            </h1>
            <p className=" text-[14px]">
              تفاصيل عن الخبر في سطرين فقط وباختصار بسيط والبقية في التفاصيل
            </p>
            <backward className="  flex justify-end text-[14px]">
              &#x202e;21 محرم 3441 - 30 مساء
            </backward>
          </div>
          <button className="px-5 hidden py-2 w-fit lg:hidden group-hover:flex border rounded-lg text-[#3E4450] border-[#C8CBD3] items-center gap-[1px]">
            <p>التفاصيل</p>
          </button>
        </div>
        <div className=" p-6 flex group flex-col justify-end items-end gap-6 rounded-xl border hover:shadow-xl">
          <div
            className=" w-[352px] h-[240px] rounded-xl"
            style={{
              backgroundImage: `url("/Images/blog3.png")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
          <div className="gap-4 flex flex-col text-end ">
            <h1 className=" text-[20px] font-bold text-end">
              شركة فواز الداهش للمحاماة تنتهي من اكبر عدد قاضايا
            </h1>
            <p className=" text-[14px]">
              تفاصيل عن الخبر في سطرين فقط وباختصار بسيط والبقية في التفاصيل
            </p>
            <backward className="  flex justify-end text-[14px]">
              &#x202e;21 محرم 3441 - 30 مساء
            </backward>
          </div>
          <button className="px-5 hidden py-2 w-fit lg:hidden group-hover:flex border rounded-lg text-[#3E4450] border-[#C8CBD3] items-center gap-[1px]">
            <p>التفاصيل</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomwBlogSection;
