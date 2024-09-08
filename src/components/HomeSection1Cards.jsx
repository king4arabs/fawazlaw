import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { TiTick } from 'react-icons/ti';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import logo from '../assets/images/lllll.png';

const HomeSection1Cards = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const activeLanguage = i18n.language; // 'en' or 'ar'
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/services`,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        const sortedServices = response.data.sort((a, b) => {
          // Replace this with your actual sorting logic
          return b.id - a.id; // Assuming a higher ID means a more recent service
        });

        // Take the first three services from the sorted array
        const latestThreeServices = sortedServices.slice(0, 3);

        setServices(latestThreeServices);
      } catch (error) {
        setError('Failed to fetch services.');
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, []);
  return (
    <div className=" flex lg:flex-row flex-col gap-3 justify-center items-center mt-5">
      {services.map((service) => (
        <Link to={`/services/${service.service_id}`}>
          <div
            className={`" shadow-top w-auto md:w-[370px] mb-5 py-8 px-5 border rounded-lg gap-4 flex flex-col items-end"`}
          >
            <div
              className={`" flex flex-col gap-5" ${
                activeLanguage == 'ar' ? 'items-end' : ''
              }`}
            >
              <img src={logo} className=" w-10 h-10 my-3" alt="logo" />
              <div className=" justify-end items-end flex flex-col gap-3 w-full">
                <img
                  src={`/serviceImages/${
                    activeLanguage === 'ar'
                      ? service.thumbnail_ar
                      : activeLanguage === 'ur'
                      ? service.thumbnail_ur
                      : service.thumbnail
                  }`}
                />
                <h1
                  className={`" text-[20px] font-black text-[#003E6F] my-3" ${
                    activeLanguage == 'ar' ? 'text-end' : ''
                  }`}
                >
                  {activeLanguage == 'ar'
                    ? service.title
                    : activeLanguage == 'en'
                    ? service.title_en
                    : service.title_ur}
                </h1>
                <div className="subsection flex gap-2">
                  <h3
                    className={`"text-[18px] my-3 max-w-xs mx-auto break-words text-[#667085] font-medium" ${
                      activeLanguage == 'ar' ? 'text-end' : 'order-2'
                    }`}
                  >
                    {/* {activeLanguage == 'ar'
                      ? service.content
                      : activeLanguage == 'en'
                      ? service.content_en
                      : service.content_ur} */}
                  </h3>
                  {/* <button className="border px-3 py-2 flex flex-col justify-center items-center">
                    <p className=" text-sm">Logout</p>
                  </button> */}
                  {/* <div className="w-12 h-5 flex items-center justify-center rounded-full bg-[#DAF4E8] mt-3">
                    <TiTick size={15} style={{ fill: 'green' }} />
                  </div> */}
                </div>
              </div>
            </div>
            <div
              className={`"items-center flex content-center w-full transition duration-[100ms] gap-1 ${
                activeLanguage == 'ar' ? 'justify-end' : ''
              }"`}
            >
              <span className="text-[18px] text-[#081F2F] font-bold">
                {t('yearly')}
              </span>
              <span className="text-[18px] text-[#667085] font-black">
                {service.currency}
              </span>
              <span className="text-[23px] text-[#081F2F] font-black">
                {service.price}
              </span>
            </div>
            <button className="border px-3 py-2 flex flex-col justify-center items-center">
              <p className=" text-sm">{t('see_more')}</p>
            </button>
          </div>
        </Link>
      ))}
    </div>
  );
};
export default HomeSection1Cards;
