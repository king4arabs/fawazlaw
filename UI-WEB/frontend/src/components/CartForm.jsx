import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useNavigate } from "react-router-dom";

const CartForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone_number: "",
      });
      const [isLoading, setIsLoading] = useState(false);
      const [error, setError] = useState(null);
      const navigate = useNavigate();
    
      const handleChange = (e) => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          [e.target.name]: e.target.value,
        }));
      };
    
      const handlePhoneChange = (value, data) => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          phone_number: value,
        }));
      };
    
      const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setError(null);
    
        try {
          const response = await axios.post(
            "https://api.fawazlaw.sa/api/contact-us",
            formData,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
    
          // Handle successful response
          console.log("Contact sent successfully:", response.data);
          toast.success("Contact Sent");
          // Reset form data or navigate to a different route
          setFormData({ name: "", email: "", phone_number: "", message: "" });
          // navigate("/articles");
        } catch (error) {
          console.error("Error sending contact", error);
          setError(error.response.data.message || "Failed to send contact.");
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
                {isLoading ? "Loading..." : "إرسال"}
              </button>
            </form>
          </div>
        </div>
      
    </div>
    )
}

export default CartForm