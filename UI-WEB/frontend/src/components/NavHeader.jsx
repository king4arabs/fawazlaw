import React from "react";
import { CiMenuBurger } from "react-icons/ci";
import { IoMenuOutline } from "react-icons/io5";
import { TbBurger } from "react-icons/tb";

const NavHeader = () => {
  return (
    <div className=" w-[100%] flex h-20 bg-[#FFFFFF] justify-center items-center border-b">
      <div className="w-[80%] flex justify-between items-center ">
        <div className=" flex items-center gap-">
          <button className="px-5 py-2 hidden lg:flex border rounded-lg text-[#3E4450] border-[#C8CBD3] items-center gap-[1px]">
            <p>احجز اجتماع</p>
          </button>
          <button>
            <IoMenuOutline size={40} />
          </button>
        </div>
        <div className="  lg:flex-row gap-2 lg:flex">
          <div className=" hidden lg:flex items-center gap-5 text-[#858D9D]">
            <a
              href="#"
              className=" flex px-1 py-[1px] hover:bg-[#ecedee] rounded-lg transition hover:border"
            >
              تواصل معنا
            </a>
            <a
              href="#"
              className=" flex px-1 py-[1px] hover:bg-[#ecedee] rounded-lg transition hover:border"
            >
              الاسئلة الشائعة
            </a>
            <a
              href="#"
              className=" flex px-1 py-[1px] hover:bg-[#ecedee] rounded-lg transition hover:border"
            >
              المدونة
            </a>
            <a
              href="#"
              className=" flex px-1 py-[1px] hover:bg-[#ecedee] rounded-lg transition hover:border"
            >
              الخدمات
            </a>
            <a
              href="#"
              className=" flex px-1 py-[1px] hover:bg-[#ecedee] rounded-lg transition hover:border"
            >
              من نحن
            </a>
            <a
              href="#"
              className=" text-[#003E6F] flex items-center gap-1 pl-2"
            >
              الرئيسية
            </a>
          </div>
          <a href="#" className=" flex items-center gap-1 pl-2">
            <img src="/Logo (2).png" className=" w-10 h-10" alt="" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default NavHeader;
