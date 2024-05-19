import React from "react";

const WeDefendSection = () => {
  return (
    <div className=" w-full my-14 bg-[#003E6F]">
      <div className=" flex flex-col justify-end mx-auto pt-12 px-12 text-white text-end" >
        <h1 className="font-bold text-[28px] text-3xl">ندافع عنكم ونقدم النصيحة</h1>
        <p className=" text-[16px] text-end pt-3">
          استشارات قانونية متخصصة مصممة خصيصًا لتلبية احتياجاتك بمختلف وسائل التواصل
        </p>
      </div>

      {/* 2 cards */}
      <div className="subblocks flex gap-6 pt-11 justify-end px-8">
        <div className="block1 gap-2 h-[160px] w-[500px] bg-white flex justify-center px-2 items-center ">
            <div className="text text-end px-3 w-[80%]">
                <div className="texttitle font-bold text-black text-[18px] ">حماية قانونية</div>
                <div className="text-subtitle text-black text-[10] font-thin pt-2">خصوصيتك بأمان معنا وخدماتنا رهن طلبك بأسهل الطرق لتأمين حماية قانونية شاملة لك ولموظفيك ولعائلتك ومؤسستك</div>
            </div>
            <div className="icon h-[50%] items-start pr-4 w-[15%]">
                <img src="/images/Iconcheck22.png" alt="" />
            </div>
        </div>
        <div className="block2">
        <div className="block1 gap-2 h-[160px] w-[500px] bg-[#32648c] flex justify-center px-2 items-center ">
            <div className="text text-end px-3 w-[85%]">
                <div className="texttitle font-bold text-white text-[18px] ">حماية قانونية</div>
                <div className="text-subtitle text-[#FFFFFF] text-[10] font-thin pt-2">خصوصيتك بأمان معنا وخدماتنا رهن طلبك بأسهل الطرق لتأمين حماية قانونية شاملة لك ولموظفيك ولعائلتك ومؤسستك</div>
            </div>
            <div className="icon h-[50%] items-start pr-4 w-[13%]">
                <img src="/images/Iconcheck11.png" alt="" />
            </div>
        </div>
        </div>
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
