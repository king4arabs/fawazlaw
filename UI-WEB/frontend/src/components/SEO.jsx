import React from "react";
import { Helmet } from "react-helmet";
import { siteUrl } from "../data/legalContent";

const SEO = ({ title, description, path = "/", keywords, schema }) => {
  const canonical = `${siteUrl}${path}`;
  const fullTitle = title || "شركة فواز للمحاماة والاستشارات القانونية";
  const metaDescription = description || "حلول قانونية سعودية متكاملة للأفراد والشركات تجمع بين الخبرة، السرية، والابتكار الرقمي.";

  return (
    <Helmet>
      <html lang="ar" dir="rtl" />
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonical} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="ar_SA" />
      <meta property="og:site_name" content="Fawazlaw.sa" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={`${siteUrl}/Logo%20(2).png`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={`${siteUrl}/Logo%20(2).png`} />
      {schema && <script type="application/ld+json">{JSON.stringify(schema)}</script>}
    </Helmet>
  );
};

export default SEO;
