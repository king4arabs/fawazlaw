import React, { useState } from "react";
import { IoMenuOutline } from "react-icons/io5";
import { useLocation } from "react-router-dom";
import MobileNav from "./MobileNav";
import { LuShoppingCart } from "react-icons/lu";
import Drawer from "react-modern-drawer";
import { useNavigate } from 'react-router-dom';

//import styles 👇
import "react-modern-drawer/dist/index.css";
import DrawerContent from "./DrawerContent";

const NavHeader = () => {
  const location = useLocation();
  const navigate = useNavigate(); 
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showNav, setShowNav] = useState(false);
  return (
    <>
      <div className=" w-[100%] flex h-20 bg-[#FFFFFF] justify-center items-center border-b relative">
        <div className="relative w-[90%] flex justify-between items-center">
        <button
    onClick={() => {
      navigate('/cart'); 
    }}
    className="absolute top-1/2 left-[70px] md:-left-[30px] -translate-y-1/2 cursor-pointer px-3 py-2 hidden lg:flex border rounded-lg text-[#3E4450] border-[#C8CBD3] items-center"
>
    <div className="relative flex items-center space-x-1"> 
        <p className="font-semibold text-sm">خدمات</p>
        <span className="font-semibold text-sm">(0)</span> 
        <LuShoppingCart size={15} />
    </div>
</button>
          <div className=" flex items-center gap-">
            <a
              href="https://calendly.com/fawaz-cvx5/30min"
              target="_blank"
              className="absolute top-1/2 left-[70px] md:-left-[-90px] -translate-y-1/2 cursor-pointer px-5 py-2 hidden lg:flex border rounded-lg text-[#3E4450] border-[#C8CBD3] items-center gap-[1px]"
            >
              <p className="font-semibold text-sm">احجز اجتماع</p>
            </a>
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
                    : " font-semibold text-sm"
                }`}
              >
                تواصل معنا
              </a>
              <a
                href="/faq"
                className={`flex px-1 py-[1px] hover:bg-[#ecedee] rounded-lg transition hover:border ${
                  location.pathname === "/faq"
                    ? "text-[#003E6F] font-bold "
                    : " font-semibold text-sm"
                }`}
              >
                الاسئلة الشائعة
              </a>
              <a
                href="/blog"
                className={`flex px-1 py-[1px] hover:bg-[#ecedee] rounded-lg transition hover:border ${
                  location.pathname === "/blog"
                    ? "text-[#003E6F] font-bold"
                    : " font-semibold text-sm"
                }`}
              >
                المدونة
              </a>
              <a
                href="/services"
                className={`flex px-1 py-[1px] hover:bg-[#ecedee] rounded-lg transition hover:border ${
                  location.pathname === "/services"
                    ? "text-[#003E6F] font-bold "
                    : " font-semibold text-sm"
                }`}
              >
                الخدمات
              </a>
              <a
                href="/whatwedo"
                className={`flex px-1 py-[1px] hover:bg-[#ecedee] rounded-lg transition hover:border ${
                  location.pathname === "/whatwedo"
                    ? "text-[#003E6F] font-bold "
                    : " font-semibold text-sm"
                }`}
              >
                من نحن
              </a>
              <a
                href="/"
                className={`flex px-1 py-[1px] hover:bg-[#ecedee] rounded-lg transition hover:border ${
                  location.pathname === "/"
                    ? "text-[#003E6F] font-bold "
                    : " font-semibold text-sm"
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
      <Drawer
        direction="left"
        className="!w-full mad:!w-[60%] max-w-[700px]"
        open={isCartOpen}
        onClose={() => setIsCartOpen((prev) => !prev)}
      >
        <DrawerContent
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen((prev) => !prev)}
        />
      </Drawer>
      {showNav && <MobileNav />}
    </>
  );
};

export default NavHeader;
