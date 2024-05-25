import React, { useEffect, useMemo, useState } from "react";
import { TiTick } from "react-icons/ti";



const CartItems = () => {
    const [cartData, setCartData] = useState([]);
    useEffect(() => {
        const existCart = JSON.parse(localStorage.getItem("cartItems"));
        const filteredData = consolidateObjects(existCart ?? []);
        setCartData(filteredData);
      });

      const onRemove = (service) => {
        const tmp = [...cartData];
        const elementIdx = tmp.findIndex((itm) => itm.service_id === service.service_id);
        tmp.splice(elementIdx, 1);
        localStorage.setItem("cartItems", JSON.stringify(tmp));
        setCartData(tmp);
      };
    
      const TotalAmount = useMemo(() => {
        const amtArr = cartData.map((itm) => itm.price);
        return amtArr.reduce((a, b) => a + b, 0);
      }, [cartData]);
    
      const ServiceCount = cartData.length;
    
    
    return (
        <div className="flex flex-col gap-[20px] h-full overflow-y-auto pt-8 pb-10">
          <h1 className="pl-[40px] text-[24px]">Total: SAR {TotalAmount} </h1>
            {cartData.map((itm) => (
                <ul
                key={itm.service_id}
                className="relative w-full flex items-center flex-col-reverse sm:flex-row gap-[20px] px-[40px] sm:px-[50px] "
              >
                <CartCard title={itm.title} price={itm.price} content={itm.content} onRemove={onRemove} itm={itm}/>
              </ul>
            ))}
        </div>
    )
}

export default CartItems

const CartCard = ({ title, content, price, onRemove, itm }) => {
    return (
        <div className=" w-[90%] shadow-top-darkRed py-8 pr-10 border-2 rounded-lg flex flex-col items-end justify-end">
            <div className=" flex flex-col items-end gap-5 pt-4">
              <div className=" justify-end items-end flex flex-col gap-3 w-[full]">
                <h1 className=" text-[20px] font-black text-end text-[#003E6F]">
                  {title}
                </h1>
                <div className="w-full subsection flex gap-2">
                  <h3 className="text-[18px] text-end max-w-sm mx-auto break-words text-[#667085] font-medium pr-3">
                  {content}
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
              <span className="text-[23px] text-[#081F2F] font-black">{price}</span>
            </div>
            <button className="pt-4" onClick={() => onRemove(itm)}>
            <p className="border border-[#F04438] text-[#F04438] font-bold text-[18 px] rounded-[8px] px-[45px] py-[16px]">حذف</p>
            </button>
          </div>
    )
}

function consolidateObjects(objects) {
    const consolidated = {};
  
    objects.forEach((obj) => {
      if (consolidated[obj.service_id]) {
        consolidated[obj.service_id].quantity += obj.quantity;
      } else {
        consolidated[obj.service_id] = { ...obj };
      }
    });
  
    return Object.values(consolidated);
  }
  