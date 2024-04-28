import React from "react";
import ContactHero from "../components/ContactHero";
import ContactForm from "../components/ContactForm";
import { Helmet } from "react-helmet";

const Contacts = () => {
  return (
    <div>
      <Helmet>
        <title>تواصل معنا
        </title>
      </Helmet>
      <ContactHero />
      <ContactForm />
    </div>
  );
};

export default Contacts;
