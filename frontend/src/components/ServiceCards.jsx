import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaRegArrowAltCircleLeft } from 'react-icons/fa';
import { TiTick } from 'react-icons/ti';
import HomeSection1Cards from './HomeSection1Cards';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { act } from 'react';
import checkIcon from '../assets/images/Check_icon.png';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import { AiOutlineHome } from 'react-icons/ai';

// const ServiceCards1 = () => {
//   const { t, i18n } = useTranslation();
//   const activeLanguage = i18n.language; // 'en' or 'ar'

//   useEffect(() => {
//     const savedLanguage = localStorage.getItem('selectedLanguage');
//     if (savedLanguage) {
//       i18n.changeLanguage(savedLanguage);
//     }
//   }, []);
//   const [services, setServices] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedServiceId, setSelectedServiceId] = useState(null);

//   useEffect(() => {
//     const fetchServices = async () => {
//       try {
//         const response = await axios.get(
//           'https://mohammedalsolami.com/api/services',
//           {
//             headers: {
//               'Content-Type': 'application/json',
//             },
//           }
//         );
//         const sortedServices = response.data.sort((a, b) => {
//           // Replace this with your actual sorting logic
//           return b.id - a.id; // Assuming a higher ID means a more recent service
//         });

//         // Take the first three services from the sorted array
//         const latestThreeServices = sortedServices.slice(0, 3);

//         setServices(latestThreeServices);
//       } catch (error) {
//         setError('Failed to fetch services.');
//         console.error('Error fetching services:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchServices();
//   }, []);

//   const handleOrderClick = (serviceId) => {
//     setSelectedServiceId(serviceId);
//   };
//   return (
//     <div className="w-full my-20 px-14">
//       <div className="w-[100%]">
//         <div className="w-full">
//           <h1 className="w-full lg:text-[35px] text-4xl font-bold pb-1 flex justify-center">
//             {t('serviceCardTitle')}
//           </h1>
//           <p className="w-full flex justify-center text-[16px] xl:mt-4 mt-1 ml-auto">
//             {t('serviceCardSubtitle')}
//           </p>
//         </div>
//         <div className=" flex lg:flex-row flex-col gap-3 justify-center items-center lg:h-[400px] mt-40">
//           {services.map((service) => (
//             <div
//               key={service.service_id}
//               className="w-[100%] md:w-[370px] py-8 px-5 border rounded-lg gap-10 flex flex-col items-end"
//               style={{
//                 borderTop: 'solid 5px #B60C0C',
//               }}
//             >
//               <div
//                 className={`flex flex-col ${
//                   (activeLanguage === 'ar' || activeLanguage === 'ur') ? 'items-end' : ''
//                 } gap-5`}
//               >
//                 <img src="/images/lllll.png" className="w-10 h-10" alt="logo" />
//                 <div className="justify-end items-end flex flex-col gap-3 w-full">
//                   <h1
//                     className={`text-[20px] font-black ${
//                       (activeLanguage === 'ar' || activeLanguage === 'ur') ? 'text-end' : ''
//                     } text-[#003E6F]`}
//                   >
//                     {(activeLanguage === 'ar' || activeLanguage === 'ur') ? service.title : service.title_en}
//                   </h1>
//                   <div
//                     className={`subsection flex ${
//                       (activeLanguage === 'ar' || activeLanguage === 'ur') ? 'flex-row' : 'flex-row-reverse'
//                     } gap-2`}
//                   >
//                     {/* <img src={checkIcon} alt="Check Icon" /> */}
//                     <h3
//                       className={`text-[18px] ${
//                         (activeLanguage === 'ar' || activeLanguage === 'ur') ? 'text-end' : ''
//                       } max-w-xs mx-auto break-words text-[#667085] font-medium`}
//                     >
//                       {(activeLanguage === 'ar' || activeLanguage === 'ur')
//                         ? service.content
//                         : service.content_en}
//                     </h3>
//                     <div className="w-12 h-5 flex items-center justify-center rounded-full bg-[#DAF4E8] mt-3">
//                       <TiTick size={15} style={{ fill: 'green' }} />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div
//                 className={`${
//                   (activeLanguage === 'ar' || activeLanguage === 'ur') ? 'justify-end' : ''
//                 } items-center flex content-center w-full transition duration-[100ms] gap-1`}
//               >
//                 <span className="text-[18px] text-[#081F2F] font-bold">
//                   {t('yearly')}
//                 </span>
//                 <span className="text-[18px] text-[#667085] font-black">
//                   {service.currency}
//                 </span>
//                 <span className="text-[23px] text-[#081F2F] font-black">
//                   {service.price}
//                 </span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };
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
        const response = await axios.get(
          'https://mohammedalsolami.com/api/services',
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
            <div className=" pt-4">
              <h1
                className={`" lg:text-[50px] text-4xl text-[#003E6F] ${
                  activeLanguage === 'ar' || activeLanguage === 'ur'
                    ? 'text-end'
                    : ''
                } font-bold pb-2"`}
              >
                {t('serviceCardTitle')}
              </h1>
            </div>
            <div
              className={`justify-end ${
                activeLanguage === 'ar' || activeLanguage === 'ur'
                  ? 'text-end'
                  : ''
              }`}
            >
              <p className=" text-[20px] font-normal pt-3">
                {t('serviceCardSubtitle')}
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
                className="cursor-pointer w-auto md:w-[370px] bg-white z-50 py-8 px-5 border rounded-lg gap-10 group flex flex-col  hover:shadow-2xl "
                style={{
                  borderTop: 'solid 5px #B60C0C',
                }}
              >
                <div
                  className={`flex flex-col ${
                    activeLanguage === 'ar' || activeLanguage === 'ur'
                      ? 'items-end'
                      : 'items-start'
                  } gap-5`}
                >
                  <img
                    src="\Images\lllll.png"
                    style={{
                      width: '50px',
                    }}
                    alt=""
                  />
                  <div className=" justify-end flex flex-col gap-3 w-full">
                    <h1
                      className={`text-[22px] font-bold ${
                        activeLanguage === 'ar' || activeLanguage === 'ur'
                          ? 'text-end'
                          : ''
                      }`}
                    >
                      {activeLanguage === 'ar' || activeLanguage === 'ur'
                        ? service.title
                        : service.title_en}
                    </h1>
                    <div
                      className={`flex ${
                        activeLanguage === 'ar' || activeLanguage === 'ur'
                          ? 'flex-row-reverse'
                          : 'flex-row'
                      }`}
                    >
                      <div className="w-12 h-5 flex items-center justify-center rounded-full bg-[#DAF4E8] mt-3">
                        <TiTick size={15} style={{ fill: 'green' }} />
                      </div>
                      <h3
                        className={`text-[16.9px] font-normal ${
                          activeLanguage === 'ar' || activeLanguage === 'ur'
                            ? 'text-end'
                            : ''
                        }`}
                      >
                        {activeLanguage === 'ar' || activeLanguage === 'ur'
                          ? service.content
                          : service.content_en}
                      </h3>
                    </div>
                    <h3
                      className={`text-[16.9px] font-normal ${
                        activeLanguage === 'ar' || activeLanguage === 'ur'
                          ? 'text-end'
                          : ''
                      }`}
                    >
                      {service.price} {service.currency}
                    </h3>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      {/* {selectedServiceId && (
        <OrderForm
          serviceId={selectedServiceId}
          onClose={() => setSelectedServiceId(null)}
        />
      )} */}
    </>
  );
};

export default ServiceCards;
