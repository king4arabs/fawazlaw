import React from "react";
import CartForm from "./CartForm";
import CartCard from "./CartItems";

const CartBody = () => {
    return (
        <div className="w-full pt-5 mx-[20px] flex">
            <div className="left w-[50%]"><CartForm /></div>
            <div className="right w-[50%]"><CartCard /></div>

        </div>
    )
}





export default CartBody