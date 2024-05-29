import React, { useEffect, useState, useRef } from "react";
import { IoMenuOutline } from "react-icons/io5";
import { useLocation } from "react-router-dom";
import MobileNav from "./MobileNav";
import { LuShoppingCart } from "react-icons/lu";
import Drawer from "react-modern-drawer";
import { useNavigate } from 'react-router-dom';

//import styles 👇
import "react-modern-drawer/dist/index.css";
import DrawerContent from "./DrawerContent";
import { useTranslation } from 'react-i18next';

const NavHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const [cartData, setCartData] = useState([]);
  const cartDataRef = useRef(cartData); // Use a ref to track changes
  const { t, i18n } = useTranslation();
  const activeLanguage = i18n.language; // 'en' or 'ar'

  useEffect(() => {
    const existCart = JSON.parse(localStorage.getItem("cartItems"));
    const filteredData = consolidateObjects(existCart ?? []);
    setCartData(filteredData);

    cartDataRef.current = filteredData;
  }, [cartData.length]);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, []);
  return (
    <>
  
      <div className=" w-[100%] flex h-20 bg-[#FFFFFF] justify-center items-center border-b relative">
        <div className={`relative w-[90%] flex justify-between items-center ${activeLanguage == "en"? 'flex-row-reverse': ''}`}>
          <div className={`buttons flex gap-3`}>
          <button
            onClick={() => {
              navigate('/cart');
            }}
            className="cursor-pointer px-3 py-2 hidden lg:flex border rounded-lg text-[#3E4450] border-[#C8CBD3] items-center"
          >
            <div className="relative flex items-center space-x-1">
              <p className="font-regular text-sm">{t('services')}</p>
              <span className="font-regular text-sm">({cartData.length})</span>
              <LuShoppingCart size={15} />
            </div>
          </button>
          <div className={`flex items-center gap`}>
            <a
              href="https://calendly.com/fawaz-cvx5/30min"
              target="_blank"
              className="cursor-pointer px-5 py-2 hidden lg:flex border rounded-lg text-[#3E4450] border-[#C8CBD3] items-center gap-[1px]"
            >
              <p className="font-regular text-sm">{t('book meeting')}</p>
            </a>
            <button
              onClick={() => setShowNav(!showNav)}
              className=" lg:hidden flex"
            >
              <IoMenuOutline size={40} />
            </button>
          </div>
          </div>
          
          <div className={`lg:flex-row gap-2 lg:flex text-[16px]`}>
            <div className={`hidden lg:flex items-center gap-5 text-[#858D9D] ${activeLanguage == "en"? 'order-2 flex-row-reverse' :'order-0'}`}>
              <a
                href="/contacts"
                className={`flex px-1 py-[1px] hover:bg-[#ecedee] rounded-lg transition hover:border ${location.pathname === "/contacts"
                    ? "text-[#003E6F] text-sm font-semibold "
                    : " font-medium text-sm"
                  }`}
              >
                {t('contact us')}
              </a>
              <a
                href="/faq"
                className={`flex px-1 py-[1px] hover:bg-[#ecedee] rounded-lg transition hover:border ${location.pathname === "/faq"
                    ? "text-[#003E6F] text-sm font-semibold "
                    : " font-medium text-sm"
                  }`}
              >
                {t('faq')}
              </a>
              <a
                href="/blog"
                className={`flex px-1 py-[1px] hover:bg-[#ecedee] rounded-lg transition hover:border ${location.pathname === "/blog"
                    ? "text-[#003E6F] text-sm font-semibold"
                    : " font-medium text-sm"
                  }`}
              >
                {t('blogs')}
              </a>
              <a
                href="/services"
                className={`flex px-1 py-[1px] hover:bg-[#ecedee] rounded-lg transition hover:border ${location.pathname === "/services"
                    ? "text-[#003E6F] text-sm font-semibold "
                    : " font-medium text-sm"
                  }`}
              >
                {t('services')}
              </a>
              <a
                href="/whatwedo"
                className={`flex px-1 py-[1px] hover:bg-[#ecedee] rounded-lg transition hover:border ${location.pathname === "/whatwedo"
                    ? "text-[#003E6F] text-sm font-semibold"
                    : "font-medium text-sm"
                  }`}
              >
                {t('about us')}
              </a>
              <a
                href="/"
                className={`flex px-1 py-[1px] hover:bg-[#ecedee] rounded-lg transition hover:border ${location.pathname === "/"
                    ? "text-[#003E6F] text-sm font-semibold "
                    : " font-medium text-sm"
                  }`}
              >
                {t('home')}
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
export function consolidateObjects(objects) {
  const consolidated = {};

  objects.forEach((obj) => {
    if (consolidated[obj.id]) {
      consolidated[obj.id].quantity += obj.quantity;
    } else {
      consolidated[obj.id] = { ...obj };
    }
  });

  return Object.values(consolidated);
}
