import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useNavigate } from "react-router-dom";

const CartForm = () => {
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
        const countryCode = data.country;
        console.log("Log from the phone handle change. the country code is: ", countryCode);
      
        // Assuming the phone number is stored in the `value` parameter
        // You might need to adjust this depending on how the PhoneInput component structures its output
        const phoneNumber = value; // Adjust this line if needed
        setFormData((prevFormData) => ({
         ...prevFormData,
          countryCode: countryCode, // Save the country code
          phoneNumber: phoneNumber, // Save the phone number
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
          navigate('/payment', { state: { sessionId: sessionID, countryCode: countryCode  } });
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
            <h1 className="w-[90%] text-end pb-5 font-bold text-[22px]">برجاء ادخال البيانات الخاصة بك</h1>
        <div className=" flex flex-col w-[90%] items-end border rounded-md py-4 mx-4 px-4">
          <h1 className="pb-1">الاسم بالكامل</h1>
          <div className="w-full gap-2 flex flex-col">
            <form
              onSubmit={handleSubmit}
              className=" w-full flex justify-end items-end text-end flex-col gap-4"
            >
              <label className=" justify-end text-end w-full flex items-center gap-2 hover:border px-4 py-2 active:border rounded-lg outline outline-1">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="grow outline-none bg-transparent border-none text-end justify-end w-full"
                  placeholder="الاسم بالكامل"
                  required
                />
              </label>
              <div className=" w-full gap-2 flex flex-col">
                <p>البريد الالكتروني</p>
                <label className=" justify-end text-end w-full flex items-center gap-2 hover:border px-4 py-2 active:border rounded-lg outline outline-1">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="grow outline-none bg-transparent border-none text-end justify-end w-full"
                    placeholder="البريد الالكتروني"
                    required
                  />
                </label>
              </div>

              <div className="w-full gap-2 flex flex-col">
                <p>رقم الجوال</p>
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
                      className="grow outline-none bg-transparent border-none text-end justify-end w-full"
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
                {isLoading ? "Loading..." : "الاستمرار في الدفع"}
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