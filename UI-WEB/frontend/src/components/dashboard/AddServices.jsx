import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";

const AddServices = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    currency: "",
    thumbnail: null,
    thumbnailUrl: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (location.state && location.state.service) {
      const { name, description, price, currency } = location.state.service;
      setFormData({ name, description, price, currency });
    }
  }, [location.state]);

  const handleChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    // Validate name field
    if (!formData.name.trim()) {
      setError("Name is required.");
      setIsLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found. Access denied.");
        setIsLoading(false);
        return;
      }

      const formDataWithFile = new FormData();
      formDataWithFile.append("name", formData.name);
      formDataWithFile.append("description", formData.description);
      formDataWithFile.append("price", formData.price);
      formDataWithFile.append("currency", formData.currency);

      if (formData.thumbnail) {
        formDataWithFile.append("thumbnail", formData.thumbnail);
      }

      let response;
      if (location.state && location.state.service) {
        // If editing existing service
        response = await axios.put(
          `https://api.fawazlaw.sa/api/services/${location.state.service.id}`,
          formDataWithFile,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        navigate("/dashboard/manageservices");
        setError(null);
      } else {
        // If adding new service
        response = await axios.post(
          "https://api.fawazlaw.sa/api/services",
          formDataWithFile,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setFormData({
          name: "",
          description: "",
          price: 0,
          currency: "",
          thumbnail: null,
          thumbnailUrl: null,
        });
        navigate("/dashboard/manageservices");
      }
      console.log("Service created/updated successfully:", response.data);
    } catch (error) {
      console.error("Error creating/editing service:", error);
      if (error.response) {
        // If response contains data, it means server provided more info about the error
        console.log("Server error:", error.response.data);
        const serverErrorMessage =
          error.response.data.message || "Failed to create/edit service.";
        setError(serverErrorMessage);
      } else {
        // If no response received, it could be a network error
        setError("Network error. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const fileUrl = URL.createObjectURL(file);
      setFormData((prevFormData) => ({
        ...prevFormData,
        thumbnail: file,
        thumbnailUrl: fileUrl,
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        thumbnail: null,
        thumbnailUrl: null,
      }));
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpeg", ".jpg", ".png"] },
    multiple: false,
    maxFiles: 1,
    maxSize: 1024 * 1024 * 10,
  });

  return (
    <div className="w-full flex items-center justify-center">
      <div className="flex w-[80%] mx-auto justify-center items-center">
        <div className="w-[70%] my-16 mx-auto justify-center items-center bg-white border rounded shadow-lg">
          <form
            onSubmit={handleSubmit}
            className="px-[40px] py-12 mx-auto flex flex-col gap-5"
          >
            <label className="input-group input-group-md">
              <span>Name</span>
              <input
                required
                type="text"
                className="input input-bordered w-full"
                onChange={handleChange}
                name="name"
                placeholder="Name"
                value={formData.name}
              />
            </label>
            <label className="input-group input-group-md">
              <span>Description</span>
              <input
                required
                type="text"
                className="input input-bordered w-full"
                onChange={handleChange}
                name="description"
                placeholder="Enter description"
                value={formData.description}
              />
            </label>
            <label className="input-group input-group-md">
              <span>Price</span>
              <input
                required
                type="number"
                className="input input-bordered w-full"
                onChange={handleChange}
                name="price"
                placeholder="Enter price"
                value={formData.price}
              />
            </label>
            <label className="input-group input-group-md">
              <span>Currency</span>
              <select
                required
                className="input input-bordered w-full"
                onChange={handleChange}
                name="currency"
                value={formData.currency}
              >
                <option value="">Select Currency</option>
                <option value="NGN">SAR</option>
                <option value="USD">USD</option>
              </select>
            </label>

            <div className="flex flex-col items-center mb-4">
              {formData.thumbnailUrl && (
                <img
                  src={formData.thumbnailUrl}
                  alt="Preview"
                  className="max-w-full h-auto mb-2"
                />
              )}
              {!formData.thumbnailUrl && <p>No image selected</p>}
            </div>

            <label className="input-group input-group-md">
              <span>Thumbnail</span>
              <div
                className="border-2 border-slate-400 p-2 border-dashed cursor-pointer text-sm font-normal text-slate-400 flex items-center justify-center"
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                {isDragActive ? (
                  <p>Drop Image here...</p>
                ) : (
                  <p>+ Add Thumbnail Image</p>
                )}
              </div>
            </label>

            {error && <p className="text-red-500">{error}</p>}
            <button
              type="submit"
              className="btn btn-primary text-white"
              disabled={isLoading}
            >
              {isLoading
                ? "Loading..."
                : location.state && location.state.service
                ? "Update Service"
                : "Create Service"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddServices;
