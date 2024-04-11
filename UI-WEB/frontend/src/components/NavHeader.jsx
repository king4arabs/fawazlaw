import React, { useState } from "react";
// import { CiMenuBurger } from "react-icons/ci";
import { IoMenuOutline } from "react-icons/io5";
// import { TbBurger } from "react-icons/tb";
import { useLocation } from "react-router-dom";
import MobileNav from "./MobileNav";

const NavHeader = () => {
  const location = useLocation();
  const [showNav, setShowNav] = useState(false);
  return (
    <>
      <div className=" w-[100%] flex h-20 bg-[#FFFFFF] justify-center items-center border-b relative">
        <div className="w-[80%] flex justify-between items-center">
          <div className=" flex items-center gap-">
            <button className="px-5 py-2 hidden lg:flex border rounded-lg text-[#3E4450] border-[#C8CBD3] items-center gap-[1px]">
              <p>احجز اجتماع</p>
            </button>
            <button
              onClick={() => setShowNav(!showNav)}
              className=" lg:hidden flex"
            >
              <IoMenuOutline size={40} />
            </button>
          </div>
          <div className="  lg:flex-row gap-2 lg:flex text-[16px]">
            <div className=" hidden lg:flex items-center gap-5 text-[#858D9D]">
              <a
                href="/contacts"
                className={`flex px-1 py-[1px] hover:bg-[#ecedee] rounded-lg transition hover:border ${
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
            <a href="/" className=" flex items-center gap-1 pl-2">
              <img src="/images/lllll.png" className=" w-10 h-10" alt="logo" />
            </a>
          </div>
        </div>
      </div>

      {showNav && <MobileNav />}
    </>
  );
};

export default NavHeader;
