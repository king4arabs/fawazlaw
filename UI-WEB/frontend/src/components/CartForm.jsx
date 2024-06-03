import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from 'react-i18next';
import toast from "react-hot-toast";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useNavigate } from "react-router-dom";

const CartForm = () => {
  const { t, i18n } = useTranslation();
  const activeLanguage = i18n.language; // 'en' or 'ar'

  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    } 
  }, []);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        price: 0,
        countryCode: ""
      });
      const [isLoading, setIsLoading] = useState(false);
      const [error, setError] = useState(null);
      const navigate = useNavigate();
    

      const [cartData, setCartData] = useState([]);
      useEffect(() => {
        console.log(formData);
        const existCart = JSON.parse(localStorage.getItem("cartItems"));
        const filteredData = consolidateObjects(existCart?? []);
        setCartData(filteredData);
      
        // Calculate the total amount here and update the state
        const totalAmount = filteredData.reduce((total, item) => total + item.price, 0);
        setFormData(prevFormData => ({...prevFormData, price: totalAmount }));
      }, []);


      const handleChange = (e) => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          [e.target.name]: e.target.value,
        }));
      };
    
      const handlePhoneChange = (value, data) => {
        setFormData((prevFormData) => ({
         ...prevFormData,
          countryCode: data.dialCode, // Save the country code
          phoneNumber: value.slice(data.dialCode.length), // Save the phone number without the country code
        }));
      };
      
      
    
      const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setError(null);
    
        try {
          const response = await axios.post(
            "http://localhost:3001/api/payment",
            formData,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
    
          // Handle successful response
          console.log(response.data);
          // Extract sessionID from the response
          const sessionID = response.data.SessionId;
          const countryCode = response.data.CountryCode;
          const id = response.data.id;
          const price = response.data.price;
          navigate('/payment', { state: { sessionId: sessionID, countryCode: countryCode, price: price, id: id } });
      // Navigate to the CardViewPayment page and pass the sessionID
          
          // Reset form data or navigate to a different route
          // setFormData({ name: "", email: "", phone_number: ""});
          // navigate("/articles");
        } catch (error) {
          console.error("Some error", error);
          setError(error.response.data.message || "Some error");
        } finally {
          setIsLoading(false);
        }
      };
    
    
    
    return (
        <div className=" w-full lg:py-16">
            <h1 className={`w-[90%] ${activeLanguage === 'ar' ? 'text-end' : 'pl-6'} pb-5 font-bold text-[22px]`}>{t('cartFormTitle')}</h1>
        <div className= {`flex flex-col w-[90%] ${activeLanguage === 'ar' ? 'items-end' : ''}  border rounded-md py-4 mx-4 px-4`}>
          <h1 className="pb-1">{t('fullName')}</h1>
          <div className="w-full gap-2 flex flex-col">
            <form
              onSubmit={handleSubmit}
              className={`w-full flex ${activeLanguage === 'ar' ? 'justify-end items-end text-end' : ''} flex-col gap-4`}
            >
              <label className=" justify-end text-end w-full flex items-center gap-2 hover:border px-4 py-2 active:border rounded-lg outline outline-1">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`grow outline-none bg-transparent border-none ${activeLanguage === 'ar' ? 'text-end justify-end' : ''}  w-full`}
                  placeholder={t('fullName')}
                  required
                />
              </label>
              <div className=" w-full gap-2 flex flex-col">
                <p>{t('emailform')}</p>
                <label className=" justify-end text-end w-full flex items-center gap-2 hover:border px-4 py-2 active:border rounded-lg outline outline-1">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`grow outline-none bg-transparent border-none ${activeLanguage === 'ar' ? 'text-end justify-end' : ''}  w-full`}
                    placeholder={t('emailform')}
                    required
                  />
                </label>
              </div>

              <div className="w-full gap-2 flex flex-col">
                <p>{t('phone')}</p>
                <label
                  htmlFor=""
                  className="justify-start text-end w-full flex items-center gap-2 hover:border px-4 py-2 active:border rounded-lg outline outline-1"
                >
                  <div className=" flex justify-start items-start left-0">
                    <PhoneInput
                      country={"sa"}
                      value={formData.phone_number}
                      onChange={handlePhoneChange}
                      inputStyle={{
                        border: "none",
                        gap: 0,
                        justifyContent: "start",
                        width: "200px",
                      }}
                      className={`grow outline-none bg-transparent border-none ${activeLanguage === 'ar' ? 'text-end justify-end' : ''}  w-full`}
                      name="phone_number"
                      required
                    />
                  </div>
                </label>
              </div>
              {error && <p className="text-red-500">{error}</p>}
              <button
                type="submit"
                className=" btn bg-[#003E6F] hover:bg-[#b6953e] w-full text-white "
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : t('buy')}
              </button>
            </form>
          </div>
        </div>
      
    </div>
    )
}

export function consolidateObjects(objects) {
  const consolidated = {};

  objects.forEach((obj) => {
    if (consolidated[obj.service_id]) {
      consolidated[obj.service_id].quantity += obj.quantity;
    } else {
      consolidated[obj.service_id] = { ...obj };
    }
  });

  return Object.values(consolidated);
}


export default CartForm