import React, {useEffect} from "react";
import { useTranslation } from 'react-i18next';

const BottomNewNav = () => {
    const { t, i18n } = useTranslation();
    const activeLanguage = i18n.language; // 'en' or 'ar'
  
    useEffect(() => {
      const savedLanguage = localStorage.getItem('selectedLanguage');
      if (savedLanguage) {
        i18n.changeLanguage(savedLanguage);
      }
    }, []);

  return (
    <div className="main bg-[#F8F8F9] w-full pb-12">
        <div className={`"text pt-12 pb-5 text-[16px]" ${activeLanguage == "ar"? 'text-right  pr-16' : 'pl-16'}`}>
        {t("bottomNavNewTitle")}
        </div>
        <div className={`"logos flex gap-3 w-full pt-9" ${activeLanguage == "ar" ? 'justify-end  pr-16' : "justify-start pl-16"}`}>
            <div className="box w-[90px] h-[80px] object-cover">
                <img src="/images/paymentIcon1.png" alt=""  />
            </div>
            <div className="box w-[90px] h-[80px] object-cover">
                <img src="/images/paymentIcon2.png" alt=""  />
            </div>
            <div className="box w-[90px] h-[80px] object-cover">
                <img src="/images/paymentIcon3.png" alt=""  />
            </div>
            <div className="box w-[90px] h-[80px] object-cover">
                <img src="/images/paymentIcon4.png" alt=""  />
            </div>
            <div className="box w-[90px] h-[80px] object-cover">
                <img src="/images/paymentIcon5.png" alt=""  />
            </div>
            <div className="box w-[90px] h-[80px] object-cover">
                <img src="/images/paymentIcon6.png" alt=""  />
            </div>
        </div>
        <div className={`"text pr-16 text-[16px] ${activeLanguage == "ar"? 'text-right  pr-16' : 'pl-16'}`}>
        {t("bottomNavNewPayment")}
        </div>
        <div className={`"paymentmethods logos flex gap-3 w-full pt-6 pr-16" ${activeLanguage == "ar" ? 'justify-end  pr-16' : "justify-start pl-16"}`}>
        <div className="box w-[50px] h-[40px] object-cover">
                <img src="/images/paymet1.png" alt=""  />
            </div>
            <div className="box w-[50px] h-[40px] object-cover">
                <img src="/images/paymet2.png" alt=""  />
            </div>
            <div className="box w-[50px] h-[40px] object-cover">
                <img src="/images/paymet3.png" alt=""  />
            </div>
            <div className="box w-[50px] h-[40px] object-cover">
                <img src="/images/paymet4.png" alt=""  />
            </div>
            <div className="box w-[50px] h-[40px] object-cover">
                <img src="/images/paymet5.png" alt=""  />
            </div>
            <div className="box w-[50px] h-[40px] object-cover">
                <img src="/images/paymet6.png" alt=""  />
            </div>
            <div className="box w-[50px] h-[40px] object-cover">
                <img src="/images/paymet7.png" alt=""  />
            </div>
            <div className="box w-[50px] h-[40px] object-cover">
                <img src="/images/paymet8.png" alt=""  />
            </div>
            <div className="box w-[50px] h-[40px] object-cover">
                <img src="/images/paymet9.png" alt=""  />
            </div>
            <div className="box w-[50px] h-[40px] object-cover">
                <img src="/images/paymet10.png" alt=""  />
            </div>
            <div className="box w-[50px] h-[40px] object-cover">
                <img src="/images/paymet11.png" alt=""  />
            </div>
            <div className="box w-[50px] h-[40px] object-cover">
                <img src="/images/paymet12.png" alt=""  />
            </div>
            <div className="box w-[50px] h-[40px] object-cover">
                <img src="/images/paymet13.png" alt=""  />
            </div>
        </div>
    </div>
  );
};

export default BottomNewNav;
