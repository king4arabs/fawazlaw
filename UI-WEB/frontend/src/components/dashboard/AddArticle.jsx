import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import RichTextEditor from "../TextEditor";
import JoditEdito, { JoditEditorComponent } from "../JoditEditor";

const AddArticle = () => {
  const [formData, setFormData] = useState({ title: "", content: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.article) {
      setFormData(location.state.article);
    }
  }, [location.state]);

  const handleChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleContentChange = (content) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      content,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found. Access denied.");
        setIsLoading(false);
        return;
      }

      const apiMethod = location.state?.article ? "put" : "post";
      const apiUrl = location.state?.article
        ? `https://api.fawazlaw.sa/api/articles/${location.state.article.id}`
        : "https://api.fawazlaw.sa/api/articles";

      const response = await axios[apiMethod](apiUrl, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Article created/updated successfully:", response.data);
      navigate("/dashboard/managearticles");
    } catch (error) {
      console.error("Error creating/updating article", error);
      setError(
        error.response.data.message || "Failed to create/update article."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex items-center justify-center">
      <div className="flex w-[80%] mx-auto justify-center items-center">
        <div className="w-[70%] my-16 mx-auto justify-center items-center bg-white border rounded shadow-lg">
          <form
            onSubmit={handleSubmit}
            className="px-[40px] py-12 mx-auto flex flex-col gap-5"
          >
            <label className="input-group input-group-md">
              <span>Title</span>
              <input
                required
                type="text"
                className="input input-bordered w-full"
                onChange={handleChange}
                name="title"
                placeholder="Enter title"
                value={formData.title}
              />
            </label>
            <JoditEditorComponent
              setContent={handleContentChange}
              content={formData.content}
            />

            {error && <p className="text-red-500">{error}</p>}
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isLoading}
            >
              {isLoading
                ? "Loading..."
                : location.state?.article
                ? "Update"
                : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddArticle;
