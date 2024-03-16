import React from "react";

const Truts = () => {
  const logos = [
    "/Images/_x37_uoDrF.tif11111.png",
    "/Images/Bitmap33333.png",
    "/Images/Bitmap44444.png",
    "/Images/image 166666.png",
    "/Images/image 477777.png",
    "/Images/image 2439888888.png",
    "/Images/image 5999999.png",
  ];
  return (
    <div className=" w-full my-14">
      <div className=" mx-auto w-[80%] gap-2 flex flex-col justify-between items-center">
        <h1 className="lg:text-[50px] text-4xl font-bold w-fit justify-between text-end">
          جهات نفخر بهم
        </h1>
        <h6 className="text-[14px]">
          الشركات والهيئات والمؤسسات التي نتعامل معاها
        </h6>
      </div>
      <div className="flex flex-row w-full gap-7 justify-center items-center">
        {logos.map((logo, index) => {
          return (
            <div
              key={index}
              className="w-[200px] h-[200px] justify-center items-center flex"
            >
              <img src={logo} alt="logo" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Truts;
