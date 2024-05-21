import React from "react";
import Marquee from "react-fast-marquee";

const WeDefendSection = () => {
  return (
    <div className=" w-full my-[40px] bg-[#003E6F]">
      <div className=" flex flex-col justify-end mx-auto pt-12 px-12 text-white text-end" >
        <h1 className="font-bold text-[28px] text-3xl">ندافع عنكم ونقدم النصيحة</h1>
        <p className=" text-[16px] text-end pt-3">
          استشارات قانونية متخصصة مصممة خصيصًا لتلبية احتياجاتك بمختلف وسائل التواصل
        </p>
      </div>

      {/* 2 cards */}
      <div className=" w-full justify-end lg:mr-60 gap-7 flex flex-row mx-5 pt-9">
        <Marquee
          pauseOnClick={true}
          pauseOnHover={true}
          speed={100}
          className=""
        >
          <div className=" flex lg:w-fit w-[400px] flex-row-reverse gap-3  px-4 py-6 rounded-xl  justify-end bg-[#FFFFFF] mx-6">
            <img
              src="Images\Iconcheck33.png"
              alt="dfsjfbjb"
              className="w-12 h-12"
            />
            <div className=" gap-2 w-[400px]">
              <h1 className=" text-2xl font-bold text-end">محامون مؤهلون</h1>
              <p className=" text-base text-end ">
                يمكنك الاعتماد على فريقنا المختص من المحامين والمستشارين
                المرخصين بخبرات واسعه لتوفير الحماية القانونية لك
              </p>
            </div>
          </div>
          <div className=" flex lg:w-fit w-[400px] flex-row-reverse gap-6  px-4 py-8 rounded-xl  justify-end bg-[#FFFFFF] mx-6">
            <img
              src="Images\Iconcheck22.png"
              alt="dfsjfbjb"
              className="w-12 h-12"
            />
            <div className=" gap-2 w-[400px]">
              <h1 className=" text-2xl font-bold text-end">تواصل مستمر</h1>
              <p className=" text-base text-end ">
                يمكنك التواصل مع فريقنا فى أى وقت لطلب الاستشارة والمساعدة
                القانونية اللازمة
              </p>
            </div>
          </div>
          <div className=" flex lg:w-fit w-[400px] flex-row-reverse gap-3  px-4 py-6 rounded-xl  justify-end bg-[#FFFFFF] mx-6">
            <img
              src="Images\Iconcheck11.png"
              alt="dfsjfbjb"
              className="w-12 h-12"
            />
            <div className=" gap-2 w-[400px]">
              <h1 className=" text-2xl font-bold text-end">حماية قانونية</h1>
              <p className=" text-base text-end ">
                خصوصيتك بأمان معنا وخدماتنا رهن طلبك بأسهل الطرق لتأمين حماية
                قانونية شاملة لك ولموظفيك ولعائلتك ومؤسستك
              </p>
            </div>
          </div>
        </Marquee>
      </div>

      {/* divider */}
      <div className="flex items-center justify-center h-[1px] pt-[60px]">
        <div class="border-b border-white w-[70%] border-opacity-25"></div>
      </div>

     {/* figures */}
    <div className="figures flex justify-center items-center gap-[60px] pt-7 pb-[70px]">
        <div className="num  flex flex-col justify-center items-center">
            <div className="number text-[30px] text-white font-extrabold">8,943</div>
            <div className="detail text-[14px] text-white text-opacity-[70%] ">قضية مغلقة</div>
        </div>
        <div className="flex items-center justify-center w-[1.5px]">
            <div class="border-l-[1.5px] border-white h-[60px] "></div>
        </div>
        <div className="num  flex flex-col justify-center items-center">
            <div className="number text-[30px] text-white font-extrabold">3,856</div>
            <div className="detail text-[14px] text-white text-opacity-[70%] ">عميل سعيد</div>
            <div className="detail text-[14px] text-white text-opacity-[70%] "></div>
        </div>
        <div className="flex items-center justify-center w-[1.5px]">
            <div class="border-l-[1.5px] border-white h-[60px] "></div>
        </div>
        <div className="num flex flex-col justify-center items-center">
            <div className="number text-[30px] text-white font-extrabold">15</div>
            <div className="detail text-[14px] text-white text-opacity-[70%] ">عام من الخبرة</div>
        </div>
    </div>
    </div>
  );
};

export default WeDefendSection;
