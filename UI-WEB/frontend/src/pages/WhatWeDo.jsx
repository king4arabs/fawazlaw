import React from "react";
import WhatWedoHero from "../components/WhatWedoHero";
import WhatweDoSection2 from "../components/WhatweDoSection2";
import { Helmet } from 'react-helmet';

const WhatWeDo = () => {
  return (
    <>
      <Helmet>
        <title>من نحن
        </title>
      </Helmet>
      <WhatWedoHero />
      <WhatweDoSection2 />
    </>
  );
};

export default WhatWeDo;
