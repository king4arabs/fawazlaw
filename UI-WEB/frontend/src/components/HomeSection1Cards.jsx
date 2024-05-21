import React from "react";
import { TiTick } from "react-icons/ti";

const HomeSection1Cards = () => {
    return (
        <div className=" flex lg:flex-row flex-col gap-3 justify-center items-center lg:h-[400px]">
          <div className=" shadow-top w-[370px] py-8 px-5 border rounded-lg gap-10  flex flex-col items-end">
            <div className=" flex flex-col items-end gap-5">
            <img src="/images/lllll.png" className=" w-10 h-10" alt="logo" />
              <div className=" justify-end items-end flex flex-col gap-3 w-full">
                <h1 className=" text-[20px] font-black text-end text-[#003E6F]">
                باقة العقود العمالية
                </h1>
                <div className="subsection flex gap-2">
                  <h3 className="text-[18px] text-end max-w-xs mx-auto break-words text-[#667085] font-medium">
                  إستشارات قانونية لمدة سنة بالاتصال المباشر والدردشة الفورية (شات بوت)
                </h3>
                <div className="w-12 h-5 flex items-center justify-center rounded-full bg-[#DAF4E8] mt-3">
                <TiTick size={15} style={{ fill: 'green' }}/>
                </div>
                

                </div>
              </div>
            </div>
            <div className="justify-end items-center flex content-center w-full transition duration-[100ms] gap-1">
              <span className="text-[18px] text-[#081F2F] font-bold">سنويا</span>
              <span className="text-[18px] text-[#667085] font-black">SAR</span>
              <span className="text-[23px] text-[#081F2F] font-black">365</span>
            </div>
          </div>

          <div className=" shadow-top w-[370px] py-8 px-5 border rounded-lg gap-10  flex flex-col items-end justify-end">
            <div className=" flex flex-col items-end gap-5">
            <img src="/images/lllll.png" className=" w-10 h-10" alt="logo" />
              <div className=" justify-end items-end flex flex-col gap-3 w-full">
                <h1 className=" text-[20px] font-black text-end text-[#003E6F]">
                  استشارات عقود العمل
                </h1>
                <div className="subsection flex gap-2">
                  <h3 className="text-[18px] text-end max-w-xs mx-auto break-words text-[#667085] font-medium">
                  إستشارات قانونية لمدة سنة بالاتصال المباشر والدردشة الفورية (شات بوت)
                </h3>
                <div className="w-12 h-5 flex items-center justify-center rounded-full bg-[#DAF4E8] mt-3">
                <TiTick size={15} style={{ fill: 'green' }}/>
                </div>
                

                </div>
              </div>
            </div>
            <div className="justify-end items-center flex content-center w-full transition duration-[100ms] gap-1">
              <span className="text-[18px] text-[#081F2F] font-bold">سنويا</span>
              <span className="text-[18px] text-[#667085] font-black">SAR</span>
              <span className="text-[23px] text-[#081F2F] font-black">1200</span>
            </div>
          </div>
          <div className=" shadow-top w-[370px] py-8 px-5 border rounded-lg gap-10  flex flex-col items-end justify-end">
            <div className=" flex flex-col items-end gap-5">
            <img src="/images/lllll.png" className=" w-10 h-10" alt="logo" />
              <div className=" justify-end items-end flex flex-col gap-3 w-full">
                <h1 className=" text-[20px] font-black text-end text-[#003E6F]">
                  استشارات الشركات والاعمال
                </h1>
                <div className="subsection flex gap-2">
                  <h3 className="text-[18px] text-end max-w-xs mx-auto break-words text-[#667085] font-medium">
                  إستشارات قانونية لمدة سنة بالاتصال المباشر والدردشة الفورية (شات بوت)
                </h3>
                <div className="w-12 h-5 flex items-center justify-center rounded-full bg-[#DAF4E8] mt-3">
                <TiTick size={15} style={{ fill: 'green' }}/>
                </div>
                

                </div>
              </div>
            </div>
            <div className="justify-end items-center flex content-center w-full transition duration-[100ms] gap-1">
              <span className="text-[18px] text-[#081F2F] font-bold">سنويا</span>
              <span className="text-[18px] text-[#667085] font-black">SAR</span>
              <span className="text-[23px] text-[#081F2F] font-black">3000</span>
            </div>

          </div>
        </div>

    )
}
export default HomeSection1Cards