import React from "react";

const FloatingCTA = () => (
  <div className="fixed bottom-4 left-4 right-4 z-40 flex gap-2 md:left-auto md:right-6 md:w-auto" dir="rtl">
    <a className="flex-1 rounded-full bg-[#003E6F] px-4 py-3 text-center text-sm font-bold text-white shadow-xl md:flex-none" href="/contacts">
      احجز استشارة
    </a>
    <a className="flex-1 rounded-full bg-[#B9975B] px-4 py-3 text-center text-sm font-bold text-white shadow-xl md:flex-none" href="https://wa.me/966920013767" target="_blank" rel="noreferrer">
      واتساب
    </a>
  </div>
);

export default FloatingCTA;
