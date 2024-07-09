import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import icon1 from '../assets/footerlogos/paymentIcon1.png';
import icon2 from '../assets/footerlogos/paymentIcon2.png';
import icon3 from '../assets/footerlogos/paymentIcon3.png';
import icon4 from '../assets/footerlogos/paymentIcon4.png';
import icon5 from '../assets/footerlogos/paymentIcon5.png';
import icon6 from '../assets/footerlogos/paymentIcon6.png';
import pay1 from '../assets/footerlogos/paymet1.png';
import pay2 from '../assets/footerlogos/paymet2.png';
import pay3 from '../assets/footerlogos/paymet3.png';
import pay4 from '../assets/footerlogos/paymet4.png';
import pay5 from '../assets/footerlogos/paymet5.png';
import pay6 from '../assets/footerlogos/paymet6.png';
import pay7 from '../assets/footerlogos/paymet7.png';
import pay8 from '../assets/footerlogos/paymet8.png';
import pay9 from '../assets/footerlogos/paymet9.png';
import pay10 from '../assets/footerlogos/paymet10.png';
import pay11 from '../assets/footerlogos/paymet11.png';
import pay12 from '../assets/footerlogos/paymet12.png';
import pay13 from '../assets/footerlogos/paymet13.png';

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
      <div
        className={`"text pt-12 pb-5 text-[16px]" ${
          activeLanguage == 'ar' ? 'text-right pr-6 md:pr-16' : 'pl-6 md:pl-16'
        }`}
      >
        {t('bottomNavNewTitle')}
      </div>
      <div
        className={`"logos flex gap-3 w-full pt-9" ${
          activeLanguage == 'ar'
            ? 'justify-end pr-6 md:pr-16'
            : 'justify-start pl-6 md:pl-16'
        }`}
        style={{
          flexWrap: 'wrap',
        }}
      >
        <div className="box object-cover">
          <img src={icon1} style={{ width: '80px' }} alt="" />
        </div>
        <div className="box object-cover">
          <img src={icon2} style={{ width: '80px' }} alt="" />
        </div>
        <div className="box object-cover">
          <img src={icon3} style={{ width: '80px' }} alt="" />
        </div>
        <div className="box object-cover">
          <img src={icon4} style={{ width: '80px' }} alt="" />
        </div>
        <div className="box object-cover">
          <img src={icon5} style={{ width: '80px' }} alt="" />
        </div>
        <div className="box object-cover">
          <img src={icon6} style={{ width: '80px' }} alt="" />
        </div>
      </div>
      <div
        className={`"text pr-16 text-[16px]  mt-[20px] ${
          activeLanguage == 'ar' ? 'text-right  pr-6 md:pr-16' : 'pl-6 md:pl-16'
        }`}
      >
        {t('bottomNavNewPayment')}
      </div>
      <div
        className={`"paymentmethods logos flex gap-3 w-full" ${
          activeLanguage == 'ar'
            ? 'justify-end pr-6 md:pr-16'
            : 'justify-start  pl-6 md:pl-16'
        }`}
        style={{
          flexWrap: 'wrap',
        }}
      >
        <div
          style={{
            width: '30px',
          }}
          className="box object-cover"
        >
          <img
            src={pay1}
            style={{
              maxWidth: '100%',
            }}
            alt=""
          />
        </div>
        <div
          style={{
            width: '30px',
          }}
          className="box object-cover"
        >
          <img
            src={pay2}
            style={{
              maxWidth: '100%',
            }}
            alt=""
          />
        </div>
        <div
          style={{
            width: '30px',
          }}
          className="box object-cover"
        >
          <img
            src={pay3}
            style={{
              maxWidth: '100%',
            }}
            alt=""
          />
        </div>
        <div
          style={{
            width: '30px',
          }}
          className="box object-cover"
        >
          <img
            src={pay4}
            style={{
              maxWidth: '100%',
            }}
            alt=""
          />
        </div>
        <div
          style={{
            width: '30px',
          }}
          className="box object-cover"
        >
          <img
            src={pay5}
            style={{
              maxWidth: '100%',
            }}
            alt=""
          />
        </div>
        <div
          style={{
            width: '30px',
          }}
          className="box object-cover"
        >
          <img
            src={pay6}
            style={{
              maxWidth: '100%',
            }}
            alt=""
          />
        </div>
        <div
          style={{
            width: '30px',
          }}
          className="box object-cover"
        >
          <img
            src={pay7}
            style={{
              maxWidth: '100%',
            }}
            alt=""
          />
        </div>
        <div
          style={{
            width: '30px',
          }}
          className="box object-cover"
        >
          <img
            src={pay8}
            style={{
              maxWidth: '100%',
            }}
            alt=""
          />
        </div>
        <div
          style={{
            width: '30px',
          }}
          className="box object-cover"
        >
          <img
            src={pay9}
            style={{
              maxWidth: '100%',
            }}
            alt=""
          />
        </div>
        <div
          style={{
            width: '30px',
          }}
          className="box object-cover"
        >
          <img
            src={pay10}
            style={{
              maxWidth: '100%',
            }}
            alt=""
          />
        </div>
        <div
          style={{
            width: '30px',
          }}
          className="box object-cover"
        >
          <img
            src={pay11}
            style={{
              maxWidth: '100%',
            }}
            alt=""
          />
        </div>

        <div
          style={{
            width: '30px',
          }}
          className="box object-cover"
        >
          <img
            src={pay13}
            style={{
              maxWidth: '100%',
            }}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default BottomNewNav;
