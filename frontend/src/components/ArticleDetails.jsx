import React from "react";
import parse from "html-react-parser";
import { Link, useLocation } from "react-router-dom";
import { Helmet } from 'react-helmet';

const ArticleDetails = () => {
  const location = useLocation();
  const { data } = location.state;
  return (
    <>
      <Helmet>
        <title>المدونة</title>
      </Helmet>
      <div className=" w-[80%] flex flex-col mx-auto ">
        <h1>{data.title}</h1>
        <p>{parse(data.content)}</p>
      </div>
    </>
  );
};

export default ArticleDetails;
