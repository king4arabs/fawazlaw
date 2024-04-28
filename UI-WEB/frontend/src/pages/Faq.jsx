import React from "react";
import FaqHero from "../components/FaqHero";
import FaqComonent from "../components/FaqComonent";
import { Helmet } from 'react-helmet';

const Faq = () => {
  return (
    <>
      <Helmet>
        <title>الاسئلة الشائعة
        </title>
      </Helmet>
      <FaqHero />
      <FaqComonent />
    </>
  );
};

export default Faq;
