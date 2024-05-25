import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
require("dotenv").config();

const ManageArticles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found. Access denied.");
        return;
      }
      const response = await axios.get(`${process.env.BACKEND_URL}articles`,
      {headers: {
        Authorization: `Bearer ${token}`,
      },}
      );
      console.log("The articles are as follow: ", response.data);
      setArticles(response.data);
    } catch (error) {
      setError("Error fetching articles");
      console.error("Error fetching articles:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteArticle = async (id) => {
    console.log("id: ", id);
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`${process.env.BACKEND_URL}articles/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setArticles((prevArticles) =>
        prevArticles.filter((article) => article.id !== id)
      );
    } catch (error) {
      setError("Error deleting article");
      console.error("Error deleting article:", error);
    }
  };

  const editArticle = (article) => {
    setSelectedArticle(article);
    navigate("/dashboard/addarticle", { state: { article } });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="w-[80%] flex flex-col justify-center items-center mx-auto gap-10">
      <h2 className="text-2xl py-5">Manage Articles</h2>
      <div className=" grid grid-cols-3 gap-6 w-full justify-center items-center col-auto">
        {articles.map((article) => (
          <div
            key={article.id}
            className=" col-span-1 justify-center items-center flex flex-col gap-3 "
          >
            <h3>{article.title}</h3>
            <div>
              <button
                className="btn btn-danger mr-2"
                onClick={() => deleteArticle(article.id)}
              >
                Delete
              </button>
              <button
                className="btn btn-primary"
                onClick={() => editArticle(article)}
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageArticles;
