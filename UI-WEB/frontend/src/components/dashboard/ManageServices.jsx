import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
require("dotenv").config();

const ManageServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedService, setSelectedService] = useState(null); // State to hold the selected service
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No token found. Access denied.");
          return;
        }

        const response = await axios.get(
          `${process.env.BACKEND_URL}services`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setServices(response.data);
      } catch (error) {
        setError("Failed to fetch services.");
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const deleteService = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found. Access denied.");
        return;
      }

      await axios.delete(`https://api.fawazlaw.sa/api/services/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Remove the deleted service from the state
      setServices((prevServices) =>
        prevServices.filter((service) => service.id !== id)
      );
    } catch (error) {
      setError("Failed to delete service.");
      console.error("Error deleting service:", error);
    }
  };

  const editService = (service) => {
    setSelectedService(service); // Set the selected service
    navigate("/dashboard/addservice", { state: { service } }); // Navigate to the form for editing
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  console.log(services[0].thumbnail);

  return (
    <div className="w-[80%] flex flex-col justify-center items-center mx-auto gap-10">
      <h2 className="text-2xl py-5">Manage Services</h2>
      <div>
        {services.map((service) => (
          <div key={service.id}>
            <div className="flex items-center">
              <img
                src={service.thumbnail}
                alt={service.name}
                className="w-16 h-16 object-cover mr-4"
              />

              <div>
                <h3>{service.name}</h3>
                <p>{service.description}</p>
                <p>
                  Price: {service.price} {service.currency}
                </p>
                <div>
                  <button
                    className="btn btn-danger mr-2"
                    onClick={() => deleteService(service.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={() => editService(service)}
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageServices;
