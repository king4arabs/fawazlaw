import React from "react";
import { useLocation } from "react-router-dom";

const MobileNav = () => {
  const location = useLocation();
  return (
    <div className=" w-full bg-white z-50 absolute">
      <div className="my-5 justify-center items-center w-52 mx-auto flex flex-col-reverse gap-10 ">
        <a
          href="/contacts"
          className={`flex px-1 py-[1px] hover:bg-[#ecedee] rounded-lg transition ${
            location.pathname === "/contacts"
              ? "text-[#003E6F] font-bold "
              : " font-normal"
          }`}
        >
          تواصل معنا
        </a>
        <a
          href="/faq"
          className={`flex px-1 py-[1px] hover:bg-[#ecedee] rounded-lg transition hover:border ${
            location.pathname === "/faq"
              ? "text-[#003E6F] font-bold "
              : " font-normal"
          }`}
        >
          الاسئلة الشائعة
        </a>
        <a
          href="/blog"
          className={`flex px-1 py-[1px] hover:bg-[#ecedee] rounded-lg transition hover:border ${
            location.pathname === "/blog"
              ? "text-[#003E6F] font-bold"
              : " font-normal"
          }`}
        >
          المدونة
        </a>
        <a
          href="/services"
          className={`flex px-1 py-[1px] hover:bg-[#ecedee] rounded-lg transition hover:border ${
            location.pathname === "/services"
              ? "text-[#003E6F] font-bold "
              : " font-normal"
          }`}
        >
          الخدمات
        </a>
        <a
          href="/whatwedo"
          className={`flex px-1 py-[1px] hover:bg-[#ecedee] rounded-lg transition hover:border ${
            location.pathname === "/whatwedo"
              ? "text-[#003E6F] font-bold "
              : " font-normal"
          }`}
        >
          من نحن
        </a>
        <a
          href="/"
          className={`flex px-1 py-[1px] hover:bg-[#ecedee] rounded-lg transition hover:border ${
            location.pathname === "/"
              ? "text-[#003E6F] font-bold "
              : " font-normal"
          }`}
        >
          الرئيسية
        </a>
      </div>
    </div>
    // <div className="w-[80%] flex justify-between items-center absolute top-0 z-50 bg-white right-0 h-[200px] ">
    //   <div className=" flex flex-col items-center gap-8">
    //     <button className="px-5 py-2 hidden lg:flex border rounded-lg text-[#3E4450] border-[#C8CBD3] items-center gap-[1px]">
    //       <p>احجز اجتماع</p>
    //     </button>
    //   </div>
    //   <div className=" lg:flex-col gap-2 lg:flex text-[16px]">
    //     <div className=" hidden lg:flex items-center gap-5 text-[#858D9D]">
    //       <a
    //         href="/contacts"
    //         className={`flex px-1 py-[1px] hover:bg-[#ecedee] rounded-lg transition hover:border ${
    //           location.pathname === "/contacts"
    //             ? "text-[#003E6F] font-bold "
    //             : " font-normal"
    //         }`}
    //       >
    //         تواصل معنا
    //       </a>
    //       <a
    //         href="/faq"
    //         className={`flex px-1 py-[1px] hover:bg-[#ecedee] rounded-lg transition hover:border ${
    //           location.pathname === "/faq"
    //             ? "text-[#003E6F] font-bold "
    //             : " font-normal"
    //         }`}
    //       >
    //         الاسئلة الشائعة
    //       </a>
    //       <a
    //         href="/blog"
    //         className={`flex px-1 py-[1px] hover:bg-[#ecedee] rounded-lg transition hover:border ${
    //           location.pathname === "/blog"
    //             ? "text-[#003E6F] font-bold"
    //             : " font-normal"
    //         }`}
    //       >
    //         المدونة
    //       </a>
    //       <a
    //         href="/services"
    //         className={`flex px-1 py-[1px] hover:bg-[#ecedee] rounded-lg transition hover:border ${
    //           location.pathname === "/services"
    //             ? "text-[#003E6F] font-bold "
    //             : " font-normal"
    //         }`}
    //       >
    //         الخدمات
    //       </a>
    //       <a
    //         href="/whatwedo"
    //         className={`flex px-1 py-[1px] hover:bg-[#ecedee] rounded-lg transition hover:border ${
    //           location.pathname === "/whatwedo"
    //             ? "text-[#003E6F] font-bold "
    //             : " font-normal"
    //         }`}
    //       >
    //         من نحن
    //       </a>
    //       <a
    //         href="/"
    //         className={`flex px-1 py-[1px] hover:bg-[#ecedee] rounded-lg transition hover:border ${
    //           location.pathname === "/"
    //             ? "text-[#003E6F] font-bold "
    //             : " font-normal"
    //         }`}
    //       >
    //         الرئيسية
    //       </a>
    //     </div>
    //     <a href="/" className=" flex items-center gap-1 pl-2">
    //       <img src="/images/lllll.png" className=" w-10 h-10" alt="logo" />
    //     </a>
    //   </div>
    // </div>
  );
};

export default MobileNav;
