import React, {useEffect} from "react";
import { act } from "react";
import { useTranslation } from 'react-i18next';
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";

const HomwBlogSection = () => {
  const { t, i18n } = useTranslation();
  const activeLanguage = i18n.language; // 'en' or 'ar'

  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    } 
  }, []);
  return (
    <div className=" w-full my-14 gap-10 flex flex-col ">
      <div className={`w-[90%] flex ${activeLanguage == 'ar' ? 'lg:flex-row' : 'lg:flex-row-reverse'}  flex-col  justify-between mx-auto pt-4 gap-4`}>
        <a
          href="/blog"
          className={`flex ${activeLanguage == 'ar' ? 'flex-row' : 'flex-row-reverse'} items-top pt-3 text-black `}
        >
          {activeLanguage == 'ar' ? <BsArrowLeftCircle size={25} /> : <BsArrowRightCircle size={25} />}
          <p>{t('allposts')}</p>
        </a>
        <div className={`lg:text-[48px] text-3xl text-black ${activeLanguage == 'ar' ? 'text-end' : ''}`}>
          <h1 className="font-bold text-[35px] text-3xl">{t('blogsTitle')}</h1>
          <p className=" text-[16px] pt-3">
            {t('blogsSubtitle')}
          </p>
        </div>
      </div>
      <div className=" flex flex-col lg:flex-row gap-3 w-[90%] mx-auto justify-center items-center">
        <div className={`p-6 flex group flex-col justify-end ${activeLanguage === 'ar' ? 'items-end' : ''} gap-6 rounded-xl border hover:shadow-xl`}>
          <div
            className=" w-[352px] h-[240px] rounded-xl"
            style={{
              backgroundImage: `url("/Images/blog1.png")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
          <div className={`gap-4 flex flex-col ${activeLanguage === 'ar' ? 'text-end' : ''} `}>
            <h1 className={`text-[20px] font-bold ${activeLanguage === 'ar' ? 'text-end' : ''}`}>
              {t('blog1Title')}
            </h1>
            <p className=" text-[14px]">
              {t('blog1Subtitle')}
            </p>
            <backward className={`flex ${activeLanguage === 'ar' ? 'justify-end' : ''} text-[14px]`}>
              {t('blog1Date')}
            </backward>
          </div>
          <button className="px-5 hidden py-2 w-fit lg:hidden group-hover:flex border rounded-lg text-[#3E4450] border-[#C8CBD3] items-center gap-[1px]">
            <p>{t('details')}</p>
          </button>
        </div>
        <div className={`p-6 flex group flex-col justify-end ${activeLanguage === 'ar' ? 'items-end' : ''} gap-6 rounded-xl border hover:shadow-xl`}>
          <div
            className=" w-[352px] h-[240px] rounded-xl"
            style={{
              backgroundImage: `url("/Images/blog2.png")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
          <div className={`gap-4 flex flex-col ${activeLanguage === 'ar' ? 'text-end' : ''} `}>
            <h1 className={`text-[20px] font-bold ${activeLanguage === 'ar' ? 'text-end' : ''}`}>
              {t('blog1Title')}
            </h1>
            <p className=" text-[14px]">
            {t('blog1Subtitle')}
            </p>
            <backward className={`flex ${activeLanguage === 'ar' ? 'justify-end' : ''} text-[14px]`}>
            {t('blog1Date')}
            </backward>
          </div>
          <button className="px-5 hidden py-2 w-fit lg:hidden group-hover:flex border rounded-lg text-[#3E4450] border-[#C8CBD3] items-center gap-[1px]">
            <p>{t('details')}</p>
          </button>
        </div>
        <div className={`p-6 flex group flex-col justify-end ${activeLanguage === 'ar' ? 'items-end' : ''} gap-6 rounded-xl border hover:shadow-xl`}>
          <div
            className=" w-[352px] h-[240px] rounded-xl"
            style={{
              backgroundImage: `url("/Images/blog3.png")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
          <div className={`gap-4 flex flex-col ${activeLanguage === 'ar' ? 'text-end' : ''} `}>
            <h1 className={`text-[20px] font-bold ${activeLanguage === 'ar' ? 'text-end' : ''}`}>
            {t('blog1Title')}
            </h1>
            <p className=" text-[14px]">
            {t('blog1Subtitle')}
            </p>
            <backward className={`flex ${activeLanguage === 'ar' ? 'justify-end' : ''} text-[14px]`}>
            {t('blog1Date')}
            </backward>
          </div>
          <button className="px-5 hidden py-2 w-fit lg:hidden group-hover:flex border rounded-lg text-[#3E4450] border-[#C8CBD3] items-center gap-[1px]">
            <p>{t('details')}</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomwBlogSection;
