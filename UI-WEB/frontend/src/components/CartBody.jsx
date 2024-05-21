import React from "react";
import CartForm from "./CartForm";
import CartItems from "./CartItems";

const CartBody = () => {
    return (
        <div className="w-full pt-5 mx-[20px] flex">
            <div className="left w-[50%]"><CartForm /></div>
            <div className="right w-[50%]"><CartItems /></div>

        </div>
    )
}





export default CartBody