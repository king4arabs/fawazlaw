import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BsSnapchat, BsTwitterX } from 'react-icons/bs';
import { CiFacebook, CiLinkedin, CiYoutube } from 'react-icons/ci';
import { MdOutlineMailOutline } from 'react-icons/md';
import BottomNavNew from '../components/BottomNavNew';
import {
  IoLogoInstagram,
  IoMailOutline,
  IoPhonePortraitOutline,
} from 'react-icons/io5';
import { PiTiktokLogo } from 'react-icons/pi';
import logo from '../assets/images/lllll.png';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

const FooterMain = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { t, i18n } = useTranslation();
  const activeLanguage = i18n.language; // 'en' or 'ar'

  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, []);
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/inquiry/subscription`,
        { email },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      // Handle successful response
      console.log('Contact sent successfully:', response?.data);
      toast.success('Contact Sent');
      // Reset form data or navigate to a different route
      // navigate("/articles");
    } catch (error) {
      console.error('Error sending contact', error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="w-full flex flex-col justify-center items-center ">
      <div className=" w-full flex py-6 bg-gradient-to-b from-[#ECF2FF] to-[#fff]">
        <div
          className={`" mx-auto w-[80%] flex ${
            activeLanguage == 'ar' ? 'md:flex-row' : 'md:flex-row-reverse'
          } gap-2 items-center flex-col-reverse justify-between " `}
        >
          <form onSubmit={handleSubmit}>
            <div
              className={`flex flex-col-reverse ${
                activeLanguage == 'ar'
                  ? 'md:flex-row gap-3'
                  : 'md:flex-row-reverse gap-3'
              }`}
              style={{
                flexWrap: 'wrap',
              }}
            >
              <button
                type="submit"
                className="btn  bg-[#003E6F] text-white hover:bg-[#b6953e]"
                disabled={isLoading}
              >
                {isLoading ? 'Loading...' : t('subscribe')}
              </button>
              <label
                className={`" justify-end text-end lg:w-[300px] flex items-center gap-2 hover:border px-4 py-2 active:border rounded-lg outline outline-1" ${
                  activeLanguage == 'ar' ? '' : ''
                }`}
              >
                <MdOutlineMailOutline
                  size={22}
                  className={`${activeLanguage == 'ar' ? 'hidden' : ''}`}
                />
                <input
                  type="text"
                  className={`"grow outline-none bg-transparent border-none justify-end pr-2 " ${
                    activeLanguage == 'ar' ? 'text-end' : ''
                  }`}
                  placeholder={t('email')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <MdOutlineMailOutline
                  size={22}
                  className={`${activeLanguage == 'ar' ? '' : 'hidden'}`}
                />
              </label>
            </div>
          </form>
          <div>
            <h1
              className={`font-bold  ${
                activeLanguage == 'ar' ? 'text-end text-[20px]' : 'text-[17px]'
              }`}
            >
              {t('footerEmailText')}
            </h1>
          </div>
        </div>
      </div>
      <div className=" w-full flex">
        <div className=" w-[80%] flex flex-col mx-auto">
          <div className=" w-full flex flex-col md:grid md:grid-cols-1 grid-cols-2 gap-5 py-20">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div class="md:col-span-1 w-ful">
                <div className=" flex flex-col lg:col-span-2 gap-5">
                  <img
                    src={logo}
                    className="w-20 h-20 flex justify-end"
                    alt=""
                  />
                  <h1 className=" text-xl text-[#525A6A] lg:w-[280px]">
                    {t('footerMainText')}
                  </h1>
                </div>
              </div>

              <div class="md:col-span-3 w-full grid grid-cols-2 md:grid-cols-3 gap-4">
                <div class="col-span-1">
                  <div className=" flex flex-col gap-2">
                    <h1
                      className={`${
                        activeLanguage === 'en' ? 'text-left' : 'text-right'
                      } text-2xl pb-3 font-bold text-[#000929]`}
                    >
                      {t('about us')}
                    </h1>
                    <p
                      className={`${
                        activeLanguage === 'en' ? 'text-left' : 'text-right'
                      } text-[#000929] text-base font-medium opacity-55`}
                    >
                      <Link
                        onClick={() => {
                          window.scrollTo({
                            top: 0,
                            behavior: 'smooth',
                          });
                        }}
                        to={'/'}
                      >
                        {t('home')}
                      </Link>
                    </p>
                    <p
                      className={`${
                        activeLanguage === 'en' ? 'text-left' : 'text-right'
                      } text-[#000929] text-base font-medium opacity-55`}
                    >
                      <Link
                        onClick={() => {
                          window.scrollTo({
                            top: 0,
                            behavior: 'smooth',
                          });
                        }}
                        to={'/whatwedo'}
                      >
                        {t('about us')}
                      </Link>
                    </p>
                    <p
                      className={`${
                        activeLanguage === 'en' ? 'text-left' : 'text-right'
                      } text-[#000929] text-base font-medium opacity-55`}
                    >
                      <Link
                        onClick={() => {
                          window.scrollTo({
                            top: 0,
                            behavior: 'smooth',
                          });
                        }}
                        to={'/services'}
                      >
                        {t('services')}
                      </Link>
                    </p>
                    <p
                      className={`${
                        activeLanguage === 'en' ? 'text-left' : 'text-right'
                      } text-[#000929] text-base font-medium opacity-55`}
                    >
                      <Link
                        onClick={() => {
                          window.scrollTo({
                            top: 0,
                            behavior: 'smooth',
                          });
                        }}
                        to={'/blog'}
                      >
                        {t('blogs')}
                      </Link>
                    </p>
                  </div>
                </div>
                <div class="col-span-1">
                  <div className=" flex flex-col gap-2">
                    <h1
                      className={`${
                        activeLanguage === 'en' ? 'text-left' : 'text-right'
                      } text-2xl pb-3 font-bold text-[#000929] `}
                    >
                      {t('contact us')}
                    </h1>
                    <p
                      className={`${
                        activeLanguage === 'en' ? 'text-left' : 'text-right'
                      } text-[#000929] text-base font-medium opacity-55`}
                    >
                      <Link
                        onClick={() => {
                          window.scrollTo({
                            top: 0,
                            behavior: 'smooth',
                          });
                        }}
                        to={'/contacts'}
                      >
                        {t('contact us')}
                      </Link>
                    </p>
                    <p
                      className={`${
                        activeLanguage === 'en' ? 'text-left' : 'text-right'
                      } text-[#000929] text-base font-medium opacity-55`}
                    >
                      <Link
                        onClick={() => {
                          window.scrollTo({
                            top: 0,
                            behavior: 'smooth',
                          });
                        }}
                        to={'/faq'}
                      >
                        {t('faq')}
                      </Link>
                    </p>
                    <p
                      className={`${
                        activeLanguage === 'en' ? 'text-left' : 'text-right'
                      } text-[#000929] text-base font-medium opacity-55`}
                    >
                      <Link
                        onClick={() => {
                          window.scrollTo({
                            top: 0,
                            behavior: 'smooth',
                          });
                        }}
                        to={'/contacts/tandc'}
                      >
                        {t('terms_page_title')}
                      </Link>
                    </p>
                    <p
                      className={`${
                        activeLanguage === 'en' ? 'text-left' : 'text-right'
                      } text-[#000929] text-base font-medium opacity-55`}
                    >
                      <Link
                        onClick={() => {
                          window.scrollTo({
                            top: 0,
                            behavior: 'smooth',
                          });
                        }}
                        to={'/contacts/privacyPolicy'}
                      >
                        {t('privacy_page_title')}
                      </Link>
                    </p>
                  </div>
                </div>
                <div class="col-span-1">
                  <div className=" flex flex-col gap-4">
                    <h1
                      className={`${
                        activeLanguage === 'en' ? 'text-left' : 'text-right'
                      } text-2xl font-bold `}
                    >
                      {t('address')}
                    </h1>
                    <div className=" flex flex-row-reverse gap-2">
                      <div>
                        <p
                          className={`${
                            activeLanguage === 'en' ? 'text-left' : 'text-right'
                          } text-base font-bold`}
                        >
                          {t('riyadh')}
                        </p>
                        <p
                          className={`${
                            activeLanguage === 'en' ? 'text-left' : 'text-right'
                          } text-base opacity-55`}
                        >
                          {t('riyadhLocation')}
                        </p>
                      </div>
                      <img
                        src="\Images\marker-pin-05ddddd.png"
                        className="w-4 h-4"
                        alt=""
                      />
                    </div>
                    <div className=" flex flex-row-reverse gap-2">
                      <div>
                        <p
                          className={`${
                            activeLanguage === 'en' ? 'text-left' : 'text-right'
                          } text-base font-bold`}
                        >
                          {t('Jeddah')}
                        </p>
                        <p
                          className={`${
                            activeLanguage === 'en' ? 'text-left' : 'text-right'
                          } text-base opacity-55`}
                        >
                          {t('jeddahLocation')}
                        </p>
                      </div>
                      <img
                        src="\Images\marker-pin-05ddddd.png"
                        className="w-4 h-4"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BottomNavNew />
      <div className=" w-[100%] flex lg:h-12 bg-[##F3F4F5] py-2 justify-center items-center ">
        <div className="w-[90%] flex lg:flex-row flex-col justify-between items-center">
          <div className=" flex lg:flex-row flex-col items-center gap-2 ">
            <div className="flex items-center gap-4">
              <a href="https://twitter.com/fawazlawyer" target="_blank">
                <BsTwitterX size={20} className="  text-[#000929]" />
              </a>
              <a href="#">
                <CiFacebook size={25} className="  text-[#000929]" />
              </a>
              <a href="https://www.instagram.com/fawazlawyer_/">
                <IoLogoInstagram size={25} className="  text-[#000929]" />
              </a>
              <a href="#" className=" flex">
                <CiLinkedin size={25} className="  text-[#000929]" />
              </a>
              <a
                href="https://youtube.com/@user-wf5vr3ky7b?si=0m7Iwc7oJkb_EroL"
                target="_blank"
                className=" flex"
              >
                <CiYoutube size={25} className="  text-[#000929]" />
              </a>
            </div>
            <div className=" flex items-center gap-2 ">
              <a
                href="tel:+966920013767"
                className=" flex items-center gap-1 pl-2"
              >
                <IoPhonePortraitOutline
                  size={20}
                  className="  text-[#000929]"
                />
                <p className=" text-[#000929] text-[14px]">+966920013767</p>
              </a>
              <a
                href="mailto:info@fawazlaw.sa"
                className=" flex items-center gap-1 pl-2"
              >
                <IoMailOutline size={20} className="  text-[#000929]" />
                <p className=" text-[#000929] text-[14px]">info@fawazlaw.sa</p>
              </a>
            </div>
          </div>
          <div className=" items-center lg:text-base text-sm gap-2 text-end lg:flex text-[#3E4450]">
            {t('footerTerms')}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterMain;
