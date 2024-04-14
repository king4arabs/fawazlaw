import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import parse from "html-react-parser";
import { Link, useLocation } from "react-router-dom";

const BlogDetails = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.fawazlaw.sa/api/articles"
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
        console.log("error>>>", error);
      }
    };
    fetchData();
  }, []);

  const imageUrls = [
    "/Images/judg222.png",
    "/Images/judg111.png",
    "/Images/judg333.png",
  ];

  return (
    <div className="w-full flex my-[100px]">
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 grid-cols-1 gap-8 w-[80%] mx-auto justify-center items-center">
          {data.map((item, id) => {
            const shuffledImageUrls = [...imageUrls].sort(
              () => 0.5 - Math.random()
            );
            return (
              <div
                key={id}
                className="p-6 h-[500px] flex group flex-col w-[350px] items-end gap-6 rounded-xl border hover:shadow-xl transition duration-500 overflow-hidden"
              >
                <>
                  <div
                    className="w-[300px] h-[240px] rounded-xl"
                    style={{
                      backgroundImage: `url("${
                        shuffledImageUrls[id % shuffledImageUrls.length]
                      }")`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  ></div>
                  <div className="gap-4 flex flex-col text-end">
                    <h1 className="text-[20px] font-bold text-end">
                      {item.title}
                    </h1>
                    <div className="w-full">
                      <p className="text-[18px] text-end max-w-[300px] word-break-break-word overflow-wrap-break-word">
                        {parse(item.content.slice(0, 100) + "...")}
                      </p>
                    </div>
                  </div>
                </>
                <Link
                  to={`/blog/${item.id}`}
                  state={{ data: item }}
                  className="px-5 hidden py-2 w-fit lg:hidden group-hover:flex border rounded-lg text-[#3E4450] border-[#C8CBD3] items-center gap-[1px]"
                >
                  <p>التفاصيل</p>
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

const ArticleDetails = () => {
  const location = useLocation();
  const { data } = location.state;

  return (
    <div>
      <h1>{data.title}</h1>
      <p>{parse(data.content)}</p>
    </div>
  );
};

export default BlogDetails;
// export { ArticleDetails };
