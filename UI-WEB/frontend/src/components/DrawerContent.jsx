import React, { useEffect, useMemo, useState } from "react";
import { CounterComp } from "./CounterComp";
import { IoCloseCircleOutline } from "react-icons/io5";

const DrawerContent = ({ isOpen, onClose }) => {
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const existCart = JSON.parse(localStorage.getItem("cartItems"));
    const filteredData = consolidateObjects(existCart ?? []);
    setCartData(filteredData);
  }, [isOpen]);

  const onIncrease = (service) => {
    const tmp = [...cartData];
    const elementIdx = tmp.findIndex((itm) => itm.id === service.id);
    tmp[elementIdx].quantity = tmp[elementIdx].quantity + 1;
    localStorage.setItem("cartItems", JSON.stringify(tmp));
    setCartData(tmp);
  };

  const onDecrease = (service) => {
    if (service.quantity === 1) return;
    const tmp = [...cartData];
    const elementIdx = tmp.findIndex((itm) => itm.id === service.id);
    tmp[elementIdx].quantity = tmp[elementIdx].quantity - 1;
    localStorage.setItem("cartItems", JSON.stringify(tmp));
    setCartData(tmp);
  };

  const onRemove = (service) => {
    const tmp = [...cartData];
    const elementIdx = tmp.findIndex((itm) => itm.id === service.id);
    tmp.splice(elementIdx, 1);
    localStorage.setItem("cartItems", JSON.stringify(tmp));
    setCartData(tmp);
  };

  const TotalAmount = useMemo(() => {
    const amtArr = cartData.map((itm) => itm.price * itm.quantity);
    return amtArr.reduce((a, b) => a + b, 0);
  }, [cartData]);

  const ServiceCount = cartData.length;

  return (
    <div className="flex flex-col h-screen">
      <div className="h-[80px] text-white font-semibold bg-[#1f436a] flex items-center justify-between px-[50px]">
        <button onClick={onClose}>Close</button>
        <p>
          Services {"("} {ServiceCount} {")"}
        </p>
      </div>
      <div className="grow">
        <TableComp
          list={cartData}
          onRemove={onRemove}
          onIncrease={onIncrease}
          onDecrease={onDecrease}
        />
      </div>
      <div
        className="h-[100px] flex justify-around sm:justify-between px-[50px] items-center flex-col-reverse sm:flex-row"
        style={{ boxShadow: "0 0 15px 0 rgba(0, 0, 0, 0.09)" }}
      >
        <button className="px-6 w-fit rounded-[4px] py-3 text-white bg-[#1f436a] hover:bg-[#1c3c60] active:bg-[#1c3c60]">
          Complete Purchase
        </button>
        <p className="text-[#1f436a] text-[20px] font-semibold">
          Total: {TotalAmount ?? 0} SAR
        </p>
      </div>
    </div>
  );
};

export default DrawerContent;

const TableComp = ({ list, onIncrease, onDecrease, onRemove }) => {
  return (
    <>
      <ul className="hidden sm:flex w-full items-center gap-[20px] h-[40px] px-[40px] sm:px-[50px] ">
        <li className="w-full sm:w-[20%] text-right">the price</li>
        <li className="w-full sm:w-[20%] text-right">Quantity</li>
        <li className="w-full sm:w-[60%] text-right">the product</li>
      </ul>
      <div className="my-[30px] flex flex-col gap-[20px] h-full max-h-[calc(100vh-280px)] overflow-y-auto">
        {list.map((itm, idx) => (
          <ul
            key={idx}
            className="relative w-full flex items-center flex-col-reverse sm:flex-row gap-[20px] px-[40px] sm:px-[50px] "
          >
            <button onClick={() => onRemove(itm)}>
              <IoCloseCircleOutline
                size={25}
                className="absolute top-[50%] -translate-y-[50%] right-[8px] sm:right-[13px]"
              />
            </button>

            <li className="w-full flex justify-end sm:w-[20%] text-[#1f436a] text-[16px] font-semibold">
              {itm.currency} {Number(itm.price).toFixed(2)}
            </li>
            <li className="w-full sm:w-[20%] flex justify-end">
              <CounterComp
                width={"120px"}
                height={"40px"}
                count={itm.quantity}
                onIncrease={() => onIncrease(itm)}
                onDecrease={() => onDecrease(itm)}
              />
            </li>
            <li className="w-full sm:w-[60%] flex items-center text-right justify-end">
              <p className="text-[#484848] font-semibold mr-[20px]">
                {itm.name}
              </p>
              <img
                className="rounded-[6px] w-[60px]"
                src="https://media.zid.store/cdn-cgi/image/f=auto/https://media.zid.store/87169eec-3185-48ff-9e73-59f161d4649c/eb8f104c-77a7-4434-86e8-d5afe42f32bf.png"
                alt="IMG"
              />
            </li>
          </ul>
        ))}
      </div>
    </>
  );
};

export function consolidateObjects(objects) {
  const consolidated = {};

  objects.forEach((obj) => {
    if (consolidated[obj.id]) {
      consolidated[obj.id].quantity += obj.quantity;
    } else {
      consolidated[obj.id] = { ...obj };
    }
  });

  return Object.values(consolidated);
}
