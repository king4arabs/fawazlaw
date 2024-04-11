import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
// import Container from "../Container";
import { useLocation, useNavigate } from "react-router-dom";
import { TbLogout2 } from "react-icons/tb";

const AdminNav = ({ isLoggedin, setIsLoggedin }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    // setIsLoggedin(false);
    const token = localStorage.getItem("token");
    try {
      const responce = axios.post(
        "https://api.fawazlaw.sa/api/admin/logout",
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(responce);
      localStorage.removeItem("token");
      toast.success("Logged Out");
      navigate("/login");
    } catch (error) {
      console.log("error loging out:>>>>", error);
      // setIsLoggedin(false);
    }

    console.log(token);
  };
  const location = useLocation();
  return (
    <div className=" w-full shadow-sm top-20 border-b-[1px] pt-4">
      <div className="max-w-[1920px] mx-auto xl:px-20 md:px-2 px-4 ">
        <div className=" flex flex-row items-centrt justify-between md:justify-center gap-8 md:gap-12 overscroll-x-auto flex-nowrap ">
          <a href={"/dashboard/addarticle"}>
            <div
              className={`flex items-center justify-center text-center gap-1 p-2 border-b-2 hover:text-slate-800 transition cursor-pointer 
              ${
                location.pathname === "/dashboard/addarticle"
                  ? "border-b-slate-800 text-slate-800 "
                  : " border-transparent text-slate-500"
              } `}
            >
              <div className=" font-medium text-sm text-center">
                Add Article
              </div>
            </div>
          </a>
          <a href={"/dashboard/addservice"}>
            <div
              className={`flex items-center justify-center text-center gap-1 p-2 border-b-2 hover:text-slate-800 transition cursor-pointer 
              ${
                location.pathname === "/dashboard/addservice"
                  ? "border-b-slate-800 text-slate-800 "
                  : " border-transparent text-slate-500"
              } `}
            >
              <div className=" font-medium text-sm text-center">
                Add Services
              </div>
            </div>
          </a>
          <a href={"/dashboard/manageservices"}>
            <div
              className={`flex items-center justify-center text-center gap-1 p-2 border-b-2 hover:text-slate-800 transition cursor-pointer 
              ${
                location.pathname === "/dashboard/manageservices"
                  ? "border-b-slate-800 text-slate-800 "
                  : " border-transparent text-slate-500"
              } `}
            >
              <div className=" font-medium text-sm text-center">
                Manage Services
              </div>
            </div>
          </a>
          <a href={"/dashboard/managearticles"}>
            <div
              className={`flex items-center justify-center text-center gap-1 p-2 border-b-2 hover:text-slate-800 transition cursor-pointer 
              ${
                location.pathname === "/dashboard/managearticles"
                  ? "border-b-slate-800 text-slate-800 "
                  : " border-transparent text-slate-500"
              } `}
            >
              <div className=" font-medium text-sm text-center">
                Manage Articles
              </div>
            </div>
          </a>
          {/* <a href={"/dashboard/addarticle"}>
            <div
              className={`flex items-center justify-center text-center gap-1 p-2 border-b-2 hover:text-slate-800 transition cursor-pointer 
              ${
                location.pathname === "/dashboard/addarticle"
                  ? "border-b-slate-800 text-slate-800 "
                  : " border-transparent text-slate-500"
              } `}
            >
              <div className=" font-medium text-sm text-center">
                Add Article
              </div>
            </div>
          </a> */}
          <button
            className=" flex flex-col justify-center items-center"
            onClick={() => handleLogout()}
          >
            <TbLogout2 />
            <p className=" text-sm">Logout</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminNav;
