import React from "react";
import { TiTick } from "react-icons/ti";





const CartCard = () => {
    return (
        <div className=" w-[90%] shadow-top-darkRed py-8 pr-10 border-2 rounded-lg flex flex-col items-end justify-end">
            <div className=" flex flex-col items-end gap-5 pt-4">
              <div className=" justify-end items-end flex flex-col gap-3 w-[full]">
                <h1 className=" text-[20px] font-black text-end text-[#003E6F]">
                  استشارات عقود العمل
                </h1>
                <div className="w-full subsection flex gap-2">
                  <h3 className="text-[18px] text-end max-w-sm mx-auto break-words text-[#667085] font-medium pr-3">
                  إستشارات قانونية لمدة سنة بالاتصال المباشر والدردشة الفورية (شات بوت)
                </h3>
                <div className="w-5 h-5 flex items-center justify-center rounded-full bg-[#DAF4E8] mt-3">
                <TiTick size={15} style={{ fill: 'green' }}/>
                </div>
                

                </div>
              </div>
            </div>
            <div className="justify-end items-center flex content-center w-full transition duration-[100ms] gap-1 pt-5">
              <span className="text-[18px] text-[#081F2F] font-bold">سنويا</span>
              <span className="text-[18px] text-[#667085] font-black">SAR</span>
              <span className="text-[23px] text-[#081F2F] font-black">1200</span>
            </div>
            <button className="pt-4">
            <p className="border border-[#F04438] text-[#F04438] font-bold text-[18 px] rounded-[8px] px-[45px] py-[16px]">حذف</p>
            </button>
          </div>
    )
}

export default CartCard