import React from "react";
import { Helmet } from 'react-helmet';
import CartHero from "../components/CartHero";
import CartBody from "../components/CartBody";

const Cart = () => {
  return (
    <>
      <Helmet>
        <title>سلة الطلبات
        </title>
      </Helmet>
      <CartHero />
      <CartBody />
      </>
  );
};

export default Cart;
