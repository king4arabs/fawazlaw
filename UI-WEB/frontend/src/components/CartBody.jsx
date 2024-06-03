import React, {useEffect} from "react";
import { useTranslation } from 'react-i18next';
import CartForm from "./CartForm";
import CartItems from "./CartItems";

const CartBody = () => {
    const { t, i18n } = useTranslation();
  const activeLanguage = i18n.language; // 'en' or 'ar'

  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    } 
  }, []);
    return (
        <div className={`w-full pt-5 mx-[20px] flex ${activeLanguage === 'ar' ? 'flex-row' : 'flex-row-reverse'}`}>
            <div className="left w-[50%]"><CartForm /></div>
            <div className="right w-[50%]"><CartItems /></div>

        </div>
    )
}





export default CartBody