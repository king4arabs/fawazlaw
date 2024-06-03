import axios from "axios";
import React, { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import { AiOutlineHome } from "react-icons/ai";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import OrderForm from "./OrderForm";
import { Link } from "react-router-dom";
import { act } from "react";

const ServicesHero = () => {
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
    <>
      <div className="hello overflow-hidden w-full bg-bggradient justify-center items-center relative  lg:pb-10 lg:pt-10">
      <img
        src="\Images\bgservices.png"
        alt=""
        className=" absolute z-0 bottom-0 opacity-5"
      />
      <div className=" w-[90%] flex h-full lg:flex-row mx-auto lg:justify-end z-10 flex-col lg:items-center">
        <div className=" gap-2 w-full flex flex-col z-10 pb-9">
        <div className={`flex flex-row gap-2 items-center ${activeLanguage === 'ar' ? 'text-end justify-end pr-6' : 'pl-6'}  `}>
              <a
                href="/services"
                className={`flex w-fit ${activeLanguage === 'ar'? 'flex-row' : 'flex-row-reverse'} gap-2 items-center text-end justify-end`}
              >
                <h1>  {t('services')}</h1>
                {activeLanguage === 'ar' ? <FaAngleLeft /> : <FaAngleRight />}
                <AiOutlineHome />
              </a>
            </div>
          <div className=" pt-4">
            <h1 className={`" lg:text-[50px] text-4xl text-[#003E6F] ${activeLanguage === 'ar' ? 'text-end' : ''} font-bold pb-2"`}>
            {t('services')}
            </h1>
          </div>
          <div className={`justify-end ${activeLanguage === 'ar' ? 'text-end' : ''}`}>
            <p className=" text-[20px] font-normal pt-3">
              {t('contactHeroSub')}
            </p>
          </div>
        </div>
      </div>
      </div>
      <div className=" w-full lg:-mt-20 -z-50  pb-[43px]">
        <div className=" w-[90%] flex justify-center items-center lg:flex-row flex-col mx-auto gap-2">
          {services.map((service) => (
            <div
              key={service.service_id}
              className="cursor-pointer bg-white py-8 rounded-lg gap-10 group flex flex-col"
              onClick={() => handleOrderClick(service.service_id)}
            >
            <Link
              to={`/services/${service.service_id}`}
              className="cursor-pointer w-[370px] h-[330px] bg-white z-50 py-8 px-5 border rounded-lg gap-10 group flex flex-col  hover:shadow-2xl " >
              <div className={`flex flex-col ${activeLanguage === 'ar' ? 'items-end' : "items-start"} gap-5`}>
                <img src="\Images\Circleidk.png" alt="" />
                <div className=" justify-end flex flex-col gap-3 w-full">
                  <h1 className={`text-[22px] font-bold ${activeLanguage === 'ar' ? 'text-end' : ''}`}>
                    {activeLanguage === 'ar' ? service.title : service.title_en}
                  </h1>
                  <h3 className= {`text-[16.9px] font-normal ${activeLanguage === 'ar' ? 'text-end' : ''}`}>
                  {activeLanguage === 'ar' ? service.content : service.content_en}
                  </h3>
                  <h3 className={`text-[16.9px] font-normal ${activeLanguage === 'ar' ? 'text-end' : ''}`}>
                    {service.price} {service.currency}
                  </h3>
                </div>
              </div>
            </Link></div>
          ))}
        </div>
      </div>
      {selectedServiceId && (
        <OrderForm
          serviceId={selectedServiceId}
          onClose={() => setSelectedServiceId(null)}
        />
      )}
    </>
  );
};

export default ServicesHero;
