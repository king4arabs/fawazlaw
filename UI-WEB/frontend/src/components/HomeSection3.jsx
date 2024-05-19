import React from "react";

const HomeSection3 = () => {
  return (
    <div className="w-[100%] px-10 py-[90px] flex flex-col gap-10 my-16">
      <div className=" flex lg:flex-row gap-2 flex-col justify-between">
        <div className=" flex flex-row items-center gap-2">
          <img
            src="\Images\Group 1000002977.svg"
            className=" w-[28px]"
            alt=""
          />
          <p className=" flex text-nowrap">اطلب الان</p>
        </div>
        <div className="text-end flex flex-col gap-6">
          <h1 className="lg:text-[48px] text-2xl font-bold text-end ">
            برنامج الحماية الوقائية
          </h1>
          <p className=" text-base text-end">
            برنامج للحماية الوقائية الأكثر شمولية للشركات والمؤسسات
          </p>
        </div>
      </div>
      <div className=" flex flex-col lg:flex-row gap-10 ">
        <div className=" lg:w-[40%] items-center  bg-[gradientbg] bg-bggradient flex flex-col border-[3px] rounded border-[#7AB4E2] pt-16 ">
          <div
            className="  bg-[gradientbg] bg-bggradient w-full h-full flex flex-col gap-2 "
            style={{
              backgroundImage: `url("/Images/building2323.png")`,
              backgroundRepeat: "no-repeat",
              backgroundSize: 250,
              backgroundPositionY: 140,
            }}
          >
            <div className=" w-full flex flex-col items-center mx-auto h-full">
              <div className=" w-[340px] flex flex-col justify-center  gap-4">
                <h1 className=" lg:text-3xl text-[24px]  font-extrabold text-end">
                 1200
                 </h1>
                 <div className="flex justify-end gap-2">
                 <span className="text-[18px] text-[#081F2F] font-bold">سنويا</span>
              <span className="text-[18px] text-[#667085] font-black">SAR</span>

              </div>
              </div>
              <div className=" w-[73%] justify-end flex pt-7">
                <button className="px-5 py-2 flex border rounded-lg bg-[#003E6F]  text-white items-center gap-[1px] font-thin">
                  اطلب الان
                </button>
              </div>
              <div className=" w-[87%] flex justify-end items-end mt-[150px]">
                <img src="\Logo (2).png" className=" w-16" alt=""/>
              </div>
            </div>
          </div>
        </div>
        <div className=" flex flex-col gap-6">
          <div className=" flex flex-col lg:flex-row gap-6">
            <div className=" items-end flex flex-col gap-6">
              <img src="\Images\Iconoooooo.png" alt="" />
              <h1 className="text-[24px] font-bold text-black text-end">
                فحص قانوني
              </h1>
              <p className=" text-base text-[#525A6A] text-end w-[300px]">
                نحرص على تقديم خدماتنا من خلال فريق عمل يتميز بعمق التجربة
                والمعرفة الوثيقة بكافة جوانبة
              </p>
            </div>
            <div className=" items-end flex flex-col gap-6">
              <img src="\Images\Iconoooooo.png" alt="" />
              <h1 className="text-[24px] font-bold text-black text-end">
                فحص قانوني
              </h1>
              <p className=" text-base text-[#525A6A] text-end w-[300px]">
                نحرص على تقديم خدماتنا من خلال فريق عمل يتميز بعمق التجربة
                والمعرفة الوثيقة بكافة جوانبة
              </p>
            </div>
          </div>
          <div className=" flex flex-col lg:flex-row gap-6">
            <div className=" items-end flex flex-col gap-6">
              <img src="\Images\Iconoooooo.png" alt="" />
              <h1 className="text-[24px] font-bold text-black text-end">
                فحص قانوني
              </h1>
              <p className=" text-base text-[#525A6A] text-end w-[300px]">
                نحرص على تقديم خدماتنا من خلال فريق عمل يتميز بعمق التجربة
                والمعرفة الوثيقة بكافة جوانبة
              </p>
            </div>
            <div className=" items-end flex flex-col gap-6">
              <img src="\Images\Iconoooooo.png" alt="" />
              <h1 className="text-[24px] font-bold text-black text-end">
                فحص قانوني
              </h1>
              <p className=" text-base text-[#525A6A] text-end w-[300px]">
                نحرص على تقديم خدماتنا من خلال فريق عمل يتميز بعمق التجربة
                والمعرفة الوثيقة بكافة جوانبة
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeSection3;
