import React from "react";

const NavHeader = () => {
  return (
    <div className=" w-[100%] flex h-20 bg-[#FFFFFF] justify-center items-center border-b">
      <div className="w-[80%] flex justify-between items-center ">
        <div className=" flex items-center gap-">
          <button className="px-5 py-2 flex border rounded-lg text-[#3E4450] border-[#C8CBD3] items-center gap-[1px]">
            <p>احجز اجتماع</p>
          </button>
        </div>
        <div className=" flex items-center gap-5 text-[#858D9D]">
          <a
            href="#"
            target="_blank"
            className=" flex px-1 py-[1px] hover:bg-[#ecedee] rounded-lg transition hover:border"
          >
            تواصل معنا
          </a>
          <a
            href="#"
            target="_blank"
            className=" flex px-1 py-[1px] hover:bg-[#ecedee] rounded-lg transition hover:border"
          >
            الاسئلة الشائعة
          </a>
          <a
            href="#"
            target="_blank"
            className=" flex px-1 py-[1px] hover:bg-[#ecedee] rounded-lg transition hover:border"
          >
            المدونة
          </a>
          <a
            href="#"
            target="_blank"
            className=" flex px-1 py-[1px] hover:bg-[#ecedee] rounded-lg transition hover:border"
          >
            الخدمات
          </a>
          <a
            href="#"
            target="_blank"
            className=" flex px-1 py-[1px] hover:bg-[#ecedee] rounded-lg transition hover:border"
          >
            من نحن
          </a>
          <a
            href="#"
            target="_blank"
            className=" text-[#003E6F] flex items-center gap-1 pl-2"
          >
            الرئيسية
          </a>
          <a href="#" target="_blank" className=" flex items-center gap-1 pl-2">
            <img src="/Logo (2).png" className=" w-10 h-10" alt="" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default NavHeader;
