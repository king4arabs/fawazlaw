import React from "react";
import { BsArrowLeftCircle } from "react-icons/bs";

const HomwBlogSection = () => {
  return (
    <div className=" w-full bg-[#ffff] my-14 gap-10 flex flex-col ">
      <div className=" w-[80%] flex lg:flex-row flex-col  justify-between mx-auto pt-12 gap-4">
        <a
          href="/blog"
          className=" flex flex-row items-center text-black gap-2 "
        >
          <BsArrowLeftCircle size={25} />
          <p>كل الخدمات</p>
        </a>
        <div className=" lg:text-[48px] text-3xl text-black text-end">
          <h1 className="font-bold text-3xl">اخر التدوينات</h1>
          <p className=" text-[16px] text-end">
            فى شركة فواز نحن نفهم اهمية هذه القرارت ولهذا السبب نحن هنا لنقدم لك
            المشورة القانونية المتخصصة
          </p>
        </div>
      </div>
      <div className=" flex flex-col lg:flex-row gap-8 w-[80%] mx-auto justify-center items-center">
        <div className=" p-6 flex group flex-col w-[350px] justify-end items-end gap-6 rounded-xl border hover:shadow-xl">
          <div
            className=" w-[300px] h-[240px] rounded-xl"
            style={{
              backgroundImage: `url("/Images/judg222.png")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
          <div className="gap-4 flex flex-col text-end ">
            <h1 className=" text-[26px] font-bold text-end">
              شركة فواز الداهش للمحاماة تنتهي من اكبر عدد قاضايا
            </h1>
            <p className=" text-[18px]">
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
        <div className=" p-6 flex flex-col w-[350px] justify-end items-end gap-6 rounded-xl border shadow-xl">
          <div
            className=" w-[300px] h-[240px] rounded-xl"
            style={{
              backgroundImage: `url("/Images/judg111.png")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
          <div className="gap-4 flex flex-col text-end ">
            <h1 className=" text-[26px] font-bold text-end">
              شركة فواز الداهش للمحاماة تنتهي من اكبر عدد قاضايا
            </h1>
            <p className=" text-[18px]">
              تفاصيل عن الخبر في سطرين فقط وباختصار بسيط والبقية في التفاصيل
            </p>
            <backward className="  flex justify-end text-[14px]">
              &#x202e;21 محرم 3441 - 30 مساء
            </backward>
          </div>
          <button className="px-5 py-2 w-fit lg:flex border rounded-lg text-[#3E4450] border-[#C8CBD3] items-center gap-[1px]">
            <p>التفاصيل</p>
          </button>
        </div>
        <div className=" p-6 flex group flex-col w-[350px] justify-end items-end gap-6 rounded-xl border hover:shadow-xl">
          <div
            className=" w-[300px] h-[240px] rounded-xl"
            style={{
              backgroundImage: `url("/Images/judg333.png")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
          <div className="gap-4 flex flex-col text-end ">
            <h1 className=" text-[26px] font-bold text-end">
              شركة فواز الداهش للمحاماة تنتهي من اكبر عدد قاضايا
            </h1>
            <p className=" text-[18px]">
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
