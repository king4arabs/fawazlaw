import React from "react";
import Marquee from "react-fast-marquee";

const Whatwedo = () => {
  return (
    <div className="w-full flex-col flex px-12 py-10 justify-center items-center bg-[#003E6F] gap-16 ">
      <div className=" lg:w-[80%] text-white flex flex-col justify-end gap-3 items-end text-end">
        <h1 className=" lg:text-5xl text-xl text-end font-bold">
          ندافع عنكم ونقدم النصيحة
        </h1>
        <p className=" lg:text-[20px] text-sm text-end ">
          استشارات قانونية متخصصة مصممة خصيصًا لتلبية احتياجاتك بمختلف وسائل
          التواصل
        </p>
      </div>
      <div className=" w-full justify-end lg:mr-60 gap-7 flex flex-row">
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
      <div className=" lg:w-[80%] w-full text-white flex flex-row justify-center items-center gap-3 text-end border-t border-gray-500">
        <div className=" lg:w-[60%] w-full flex flex-row mx-auto justify-between items-center py-11">
          <div className=" flex flex-col justify-center items-center w-full  ">
            <h1 className=" lg:text-[40px] text-lg  text-white font-bold ">
              {" "}
              8,943
            </h1>
            <p className=" lg:text-base text-sm text-white ">قضية مغلقة</p>
          </div>
          <div className="border-r h-12 items-cente"></div>
          <div className="  text-white flex flex-col justify-center items-center w-full  ">
            <h1 className=" lg:text-[40px] text-lg font-bold "> 3,856</h1>
            <p className=" lg:text-base text-sm text-nowrap ">عميل سعيد</p>
          </div>
          <div className="border-r h-12 items-center"></div>
          <div className="  text-white flex flex-col justify-center items-center w-full  ">
            <h1 className=" lg:text-[40px] text-lg font-bold "> 15</h1>
            <p className=" lg:text-base text-sm text-nowrap ">عام من الخبرة</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Whatwedo;
