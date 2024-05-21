import React from "react";
import { Helmet } from 'react-helmet';
import CartHero from "../components/CartHero";

const Cart = () => {
  return (
    <>
      <Helmet>
        <title>سلة الطلبات
        </title>
      </Helmet>
      <CartHero />
      </>
  );
};

export default Cart;
