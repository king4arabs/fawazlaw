import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Helmet } from 'react-helmet';
import { useParams } from "react-router-dom";
import Loading from "./Loading";
import NotFound from "./NotFound";
require("dotenv").config();

const ServiceDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const { id: serviceId } = useParams()
  const [serviceData, setServiceData] = useState(undefined)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(undefined)
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchServices = async () => {
      try {
        const response = await axios.get(`${process.env.BACKEND_URL}services/${serviceId}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setServiceData(response.data);
      } catch (error) {
        setError("Service not found");
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [serviceId]);

  const [cartCount, setCartCount] = useState(0);
  const addToCart = () => {
    const existCart = JSON.parse(localStorage.getItem('cartItems')) || [];
    const existingItemIndex = existCart.findIndex(item => item.service_id === serviceData.service_id);

    if (existingItemIndex!== -1) {
      setIsButtonDisabled(true); // Disable the button if the item already exists
      return; // Exit the function early
    }

    const newVal = {...serviceData, quantity: quantity};
    const updatedCart = [...existCart, newVal];
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));

    // Update cart count in state
    setCartCount(prevCount => prevCount + 1); // Increment the count

    // Reset quantity to 1 after adding to cart
    setQuantity(1);
  };


  if (error) return <NotFound titleText={'Product not found !!'} />
  if (loading || !serviceData) return <Loading />
  const { currency, content, service_id, title, price, thumbnail} = serviceData || {}

  return (

    <>
      <Helmet>
        <title>الخدمات</title>
      </Helmet>
      <div className="py-10">
        <div className="w-[80%] flex m-auto gap-12 flex-col-reverse md:flex-row">
          <div className="w-[100%] md:w-[50%] text-right flex flex-col">
            <p className="text-[28px] font-bold text-[#4a4a4a]">{title}</p>
            <p className="mt-[35px] mb-[17px] text-[#1f436a] text-[20px] font-semibold">{price} {currency}</p>
            <p className="ml-auto max-w-[420px] text-[14px] text-[#818286]">
              {content}
            </p>

            {/* Product Action */}
            <div className="flex flex-col">
              <p className="mt-[30px] text-[16px]">Service Id</p>
              <p className="mt-[15px] mb-[30px]">{service_id}</p>
              <div className="flex justify-end gap-[30%]">
                {/* <div className="flex flex-col gap-[16px]">
                <p>the weight</p>
                <p>0 kg</p>
              </div> */}

              </div>

              <button onClick={addToCart} disabled={isButtonDisabled} className="ml-auto w-full max-w-[580px] mt-[50px] rounded-[4px] py-3 text-white bg-[#1f436a] hover:bg-[#1c3c60] active:bg-[#1c3c60]" type="button">
                {!isButtonDisabled?"Add to cart":"Item already in the cart."}
              </button>
            </div>
          </div>
          <div className="w-[100%] md:w-[50%] ">
            <img className="rounded-[6px]" src={`/serviceImages/${thumbnail}`} alt="IMG" />
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceDetails;

