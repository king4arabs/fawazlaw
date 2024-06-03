import React, {useEffect} from "react";
import { useTranslation } from 'react-i18next';
import WhatWedoHero from "../components/WhatWedoHero";
import WhatweDoSection2 from "../components/WhatweDoSection2";
import { Helmet } from 'react-helmet';

const WhatWeDo = () => {
  const { t, i18n } = useTranslation();
  const activeLanguage = i18n.language; // 'en' or 'ar'

  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    } 
  }, []);
  return (
    <>
      <Helmet>
        <title>{t('about us')}
        </title>
      </Helmet>
      <WhatWedoHero />
      <WhatweDoSection2 />
    </>
  );
};

export default WhatWeDo;
