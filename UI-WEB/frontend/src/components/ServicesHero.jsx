import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { FaAngleLeft } from "react-icons/fa6";
import OrderForm from "./OrderForm";
import { Link } from "react-router-dom";
require("dotenv").config();

const ServicesHero = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedServiceId, setSelectedServiceId] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(`${process.env.BACKEND_URL}services`, {
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
      <div className=" overflow-hidden w-full bg-bggradient justify-center items-center relative lg:h-[50vh] z-0 lg:pb-[49px] lg:pt-10 py-9 ">
        <img
          src="\Images\bgservices.png"
          alt=""
          className=" absolute z-0 bottom-0 opacity-5"
        />
        <div className=" w-[80%] flex h-full lg:flex-row mx-auto lg:justify-end z-10 flex-col lg:items-center relative">
          <div className=" gap-4 lg:w-[65%] flex flex-col z-10 text-end justify-end">
            <div className=" flex flex-row gap-2 items-center text-end justify-end pr-6 ">
              <a
                href="/whatwedo"
                className="flex w-fit flex-row gap-2 items-center text-end justify-end  "
              >
                <h1> الخدمات</h1>
                <FaAngleLeft />
                <AiOutlineHome />
              </a>
            </div>
            <div className=" lg:w-[660px] flex-col flex gap-3 justify-end text-end">
              <h1 className=" lg:text-[50px] text-4xl text-[#003E6F] text-end font-bold">
                الخدمات
              </h1>
            </div>
            <div className=" lg:w-[660px] justify-end text-end">
              <p className=" text-end text-[20px] leading-10 font-normal ">
                شركة المحامي فواز محمد الداهش للمحاماة والاستشارات القانونية
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
              <div className=" flex flex-col items-end gap-5">
                <img src="\Images\Circleidk.png" alt="" />
                <div className=" justify-end items-end flex flex-col gap-3 w-full">
                  <h1 className=" text-[22px] font-bold text-end">
                    {service.title}
                  </h1>
                  <h3 className=" text-[16.9px] font-normal text-end">
                    {service.content}
                  </h3>
                  <h3 className=" text-[16.9px] font-normal text-end">
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
