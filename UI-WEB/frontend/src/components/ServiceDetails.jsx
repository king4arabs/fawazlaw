import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Helmet } from 'react-helmet';
import { useParams } from "react-router-dom";
import { CounterComp } from "./CounterComp";
import { consolidateObjects } from "./DrawerContent";
import Loading from "./Loading";
import NotFound from "./NotFound";

const ServiceDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const { id: serviceId } = useParams()
  const [serviceData, setServiceData] = useState(undefined)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(undefined)

  useEffect(() => {
    setLoading(true);
    const fetchServices = async () => {
      try {
        const response = await axios.get(`https://api.fawazlaw.sa/services/${serviceId}`, {
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
  const newVal = {...serviceData, quantity: quantity };
  const updatedCart = [...existCart, newVal];
  localStorage.setItem('cartItems', JSON.stringify(updatedCart));

  // Update cart count in state
  setCartCount(prevCount => prevCount + 1); // Increment the count

  // Reset quantity to 1 after adding to cart
  setQuantity(1);
  }

  if (error) return <NotFound titleText={'Product not found !!'} />
  if (loading || !serviceData) return <Loading />
  const { currency, description, id, name, price, created_at, thumbnail, updated_at } = serviceData || {}

  return (

    <>
      <Helmet>
        <title>الخدمات</title>
      </Helmet>
      <div className="py-10">
        <div className="w-[80%] flex m-auto gap-12 flex-col-reverse md:flex-row">
          <div className="w-[100%] md:w-[50%] text-right flex flex-col">
            <p className="text-[28px] font-bold text-[#4a4a4a]">{name}</p>
            <p className="mt-[35px] mb-[17px] text-[#1f436a] text-[20px] font-semibold">{price} {currency}</p>
            <p className="ml-auto max-w-[420px] text-[14px] text-[#818286]">
              {description}
            </p>

            {/* Product Action */}
            <div className="flex flex-col">
              <p className="mt-[30px] text-[16px]">Service Id</p>
              <p className="mt-[15px] mb-[30px]">{id}</p>
              <div className="flex justify-end gap-[30%]">
                {/* <div className="flex flex-col gap-[16px]">
                <p>the weight</p>
                <p>0 kg</p>
              </div> */}
                <div className="flex flex-col gap-[16px]">
                  <p>Quantity</p>
                  <CounterComp
                    count={quantity}
                    onIncrease={() => setQuantity((prev) => prev + 1)}
                    onDecrease={() => setQuantity((prev) => prev === 1 ? prev : prev - 1)}
                  />
                </div>
              </div>

              <button onClick={addToCart} className="ml-auto w-full max-w-[580px] mt-[50px] rounded-[4px] py-3 text-white bg-[#1f436a] hover:bg-[#1c3c60] active:bg-[#1c3c60]" type="button">
                Add to cart
              </button>
            </div>
          </div>
          <div className="w-[100%] md:w-[50%] ">
            <img className="rounded-[6px]" src='https://media.zid.store/cdn-cgi/image/f=auto/https://media.zid.store/87169eec-3185-48ff-9e73-59f161d4649c/eb8f104c-77a7-4434-86e8-d5afe42f32bf.png' alt="IMG" />
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceDetails;

