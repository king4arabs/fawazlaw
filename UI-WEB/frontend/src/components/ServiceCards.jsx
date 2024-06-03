import React, {useEffect, useState} from "react";
import { useTranslation } from 'react-i18next';
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { TiTick } from "react-icons/ti";
import HomeSection1Cards from "./HomeSection1Cards";
import axios from "axios";
import { Link } from "react-router-dom";
import { act } from "react";

const ServiceCards = () => {
  const { t, i18n } = useTranslation();
  const activeLanguage = i18n.language; // 'en' or 'ar'

  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    } 
  }, []);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedServiceId, setSelectedServiceId] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/services", {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const sortedServices = response.data.sort((a, b) => {
          // Replace this with your actual sorting logic
          return b.id - a.id; // Assuming a higher ID means a more recent service
        });

        // Take the first three services from the sorted array
        const latestThreeServices = sortedServices.slice(0, 3);

        setServices(latestThreeServices);
      } catch (error) {
        setError("Failed to fetch services.");
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleOrderClick = (serviceId) => {
    setSelectedServiceId(serviceId);
  };
  return (
    <div className="w-full my-20 px-14">
      <div className="w-[100%]">
      <div className="w-full">
        <h1 className="w-full lg:text-[35px] text-4xl font-bold pb-1 flex justify-center">
        {t('serviceCardTitle')}
        </h1>
      <p className="w-full flex justify-center text-[16px] xl:mt-4 mt-1 ml-auto">
      {t('serviceCardSubtitle')}
      </p>
    </div>
    <div className=" flex lg:flex-row flex-col gap-3 justify-center items-center lg:h-[400px] pt-9">
    {services.map((service) => (
        <div key={service.service_id} className="shadow-top-blue w-[370px] py-8 px-5 border rounded-lg gap-10 flex flex-col items-end">
          <div className={`flex flex-col ${activeLanguage === 'ar' ? 'items-end' : ''} gap-5`}>
            <img src="/images/lllll.png" className="w-10 h-10" alt="logo" />
            <div className="justify-end items-end flex flex-col gap-3 w-full">
              <h1 className={`text-[20px] font-black ${activeLanguage === 'ar' ? 'text-end' : ''} text-[#003E6F]`}>
                {activeLanguage === 'ar' ? service.title : service.title_en}
              </h1>
              <div className={`subsection flex ${activeLanguage === 'ar' ? 'flex-row' : 'flex-row-reverse'} gap-2`}>
                <h3 className={`text-[18px] ${activeLanguage === 'ar' ? 'text-end' : ''} max-w-xs mx-auto break-words text-[#667085] font-medium`}>
                {activeLanguage === 'ar' ? service.content : service.content_en}
                </h3>
                <div className="w-12 h-5 flex items-center justify-center rounded-full bg-[#DAF4E8] mt-3">
                  <TiTick size={15} style={{ fill: 'green' }}/>
                </div>
              </div>
            </div>
          </div>
          <div className={`${activeLanguage === 'ar' ? 'justify-end' : ''} items-center flex content-center w-full transition duration-[100ms] gap-1`}>
              <span className="text-[18px] text-[#081F2F] font-bold">{t('yearly')}</span>
              <span className="text-[18px] text-[#667085] font-black">{service.currency}</span>
              <span className="text-[23px] text-[#081F2F] font-black">{service.price}</span>
            </div>
        </div>
      ))}       

      </div>

      </div>
    </div>
  );
};

export default ServiceCards;
