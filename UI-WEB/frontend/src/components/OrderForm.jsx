import React, { useState } from "react";
import axios from "axios";

const OrderForm = ({ serviceId, onClose }) => {
  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    service_id: serviceId,
  });
  const [invoiceUrl, setInvoiceUrl] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formData);
    const { customerName, customerEmail, service_id } = formData;

    if (!customerName || !customerEmail) {
      console.error("Please fill in both Customer Name and Customer Email");
      return; // Prevent sending the request if fields are empty
    }

    try {
      const apiParams = {
        customerName,
        customerEmail,
        service_id,
      };

      const queryString = `service_id=${service_id}&customerName=${encodeURIComponent(
        customerName
      )}&customerEmail=${encodeURIComponent(customerEmail)}`;
      // Build the complete URL
      const url = `https://api.fawazlaw.sa/myfatoorah?${queryString}`;

      //   console.log("Request URL:", url); // Log the request URL

      const response = await fetch(url);
      const data = await response.json();

      if (response.ok) {
        const invoiceUrl = data.invoiceURL;
        const newWindow = window.open(url, "_blank");
        // onClose && onClose();

        if (invoiceUrl) {
          // Redirect the user to the invoice URL
          newWindow.location.href = invoiceUrl;
        } else {
          console.error("No invoiceURL found in the response data.");
        }
      } else {
        console.error("Error:", data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
    onClose && onClose();
  };

  if (invoiceUrl) {
    window.location.href = invoiceUrl;
    return null;
  }

  return (
    <div className="w-full h-[100%] overflow-hidden bg-slate-500 bg-opacity-25  top-0 fixed z-[100] ">
      <div className=" w-[500px] mx-auto mt-[200px] top-[350px] left-[400px] flex flex-col bg-white gap-5 shadow-2xl rounded-xl justify-center items-center py-4 px-2">
        <h2>Order Form</h2>
        <form
          onSubmit={handleSubmit}
          className=" flex flex-col w-[500px] justify-center items-center gap-7"
        >
          <label className="input-group input-group-md">
            <span>Name</span>
            <input
              required
              type="text"
              className="input input-bordered w-full"
              onChange={handleChange}
              value={formData.customerName}
              name="customerName"
              placeholder="Enter your name"
            />
          </label>
          <label className="input-group input-group-md">
            <span>Email</span>
            <input
              required
              type="email"
              className="input input-bordered w-full"
              onChange={handleChange}
              value={formData.customerEmail}
              name="customerEmail"
              placeholder="Enter your Email"
            />
          </label>

          <button type="submit" className="btn bg-[#003E6F] text-white">
            Submit Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default OrderForm;
