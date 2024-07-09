import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import { CounterComp } from './CounterComp';
import { consolidateObjects } from './DrawerContent';
import Loading from './Loading';
import NotFound from './NotFound';
import i18n from '../il8n';

const ServiceDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const { id: serviceId } = useParams();
  const [serviceData, setServiceData] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [activeLanguage, setActiveLanguage] = useState();
  const selectedLang = localStorage.getItem('selectedLanguage');

  useEffect(() => {
    console.log('running effect on change');
    console.log({ selectedLang });
    setActiveLanguage(selectedLang);
  }, [selectedLang]);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    const fetchServices = async () => {
      try {
        const response = await axios.get(
          `https://mohammedalsolami.com/api/services/${serviceId}`,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        setServiceData(response.data);
      } catch (error) {
        setError('Service not found');
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [serviceId]);

  const [cartCount, setCartCount] = useState(0);
  const addToCart = () => {
    const existCart = JSON.parse(localStorage.getItem('cartItems')) || [];
    const existingItemIndex = existCart.findIndex(
      (item) => item.service_id === serviceData.service_id
    );

    if (existingItemIndex !== -1) {
      setIsButtonDisabled(true); // Disable the button if the item already exists
      return; // Exit the function early
    }

    const newVal = { ...serviceData, quantity: quantity };
    const updatedCart = [...existCart, newVal];
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));

    // Update cart count in state
    setCartCount((prevCount) => prevCount + 1); // Increment the count

    // Reset quantity to 1 after adding to cart
    setQuantity(1);
  };

  if (error) return <NotFound titleText={'Product not found !!'} />;
  if (loading || !serviceData) return <Loading />;
  const {
    currency,
    content,
    content_en,
    content_ur,
    service_id,
    title,
    title_en,
    title_ur,
    price,
    thumbnail,
    thumbnail_ar,
    thumbnail_ur,
  } = serviceData || {};

  return (
    <>
      <Helmet>
        <title>الخدمات</title>
      </Helmet>
      <div className="py-10">
        <div className="w-[80%] flex m-auto gap-12 flex-col-reverse md:flex-row">
          <div
            className={`w-[100%] md:w-[50%] ${
              activeLanguage === 'en' ? 'text-left' : 'text-right'
            } flex flex-col`}
          >
            <p className="text-[28px] font-bold text-[#4a4a4a]">
              {activeLanguage === 'en'
                ? title_en
                : activeLanguage === 'ur'
                ? title_ur
                : title}
            </p>
            <p className="mt-[35px] mb-[17px] text-[#1f436a] text-[20px] font-semibold">
              {price} {currency}
            </p>
            <p
              className={`${
                activeLanguage !== 'en' && 'ml-auto'
              } max-w-[420px] text-[14px] text-[#818286]`}
            >
              {/* {content} */}
              {activeLanguage === 'en'
                ? content_en
                : activeLanguage === 'ur'
                ? content_ur
                : content}
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

              <button
                onClick={addToCart}
                disabled={isButtonDisabled}
                className="ml-auto w-full max-w-[580px] mt-[50px] rounded-[4px] py-3 text-white bg-[#1f436a] hover:bg-[#1c3c60] active:bg-[#1c3c60]"
                type="button"
              >
                {!isButtonDisabled
                  ? 'Add to cart'
                  : 'Item already in the cart.'}
              </button>
            </div>
          </div>
          <div className="w-[100%] md:w-[50%] ">
            <img
              className="rounded-[6px]"
              src={`/serviceImages/${
                activeLanguage === 'ar'
                  ? thumbnail_ar
                  : activeLanguage === 'ur'
                  ? thumbnail_ur
                  : thumbnail
              }`}
              alt="IMG"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceDetails;
