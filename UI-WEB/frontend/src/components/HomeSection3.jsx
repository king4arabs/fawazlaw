import React from "react";
import { BsArrow90DegLeft } from "react-icons/bs";

const HomeSection3 = () => {
  return (
    <div className="w-[80%] mx-auto flex flex-col my-16">
      <div className=" flex flex-row justify-between">
        <div className=" flex flex-row items-center gap-2">
          <img
            src="\Images\Group 1000002977.svg"
            className=" w-[28px]"
            alt=""
          />
          <p className=" flex text-nowrap">اطلب الان</p>
        </div>
        <div className="text-end">
          <h1 className="text-[48px] font-bold text-end ">
            برنامج الحماية الوقائية
          </h1>
          <p className=" text-base text-end">
            برنامج للحماية الوقائية الأكثر شمولية للشركات والمؤسسات
          </p>
        </div>
      </div>
      <div className=" flex flex-row">
        <div
          className=" w-[40%] bg-bggradien items-center flex flex-col h-[500px] border px-6 pt-16 "
          style={{
            backgroundImage: `url("/Images/Convention Building.png")`,
            backgroundRepeat: "no-repeat",
            backgroundSize: 200,
            backgroundPositionY: 295,
          }}
        >
          <div className=" w-full flex flex-col justify-center mx-auto ">
            <div className=" W-44">
              <h1 className=" text-3xl font-bold text-end">
                فريق قانوني لمنشأتك مجانا
              </h1>
              <p className=" text-end flex ">
                اطلب خدمة زيارة الفريق لمنشأتك مجانا
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeSection3;
