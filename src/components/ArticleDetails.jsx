import React from 'react';
import parse from 'html-react-parser';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { blogsData } from '../blogsData';
import { useTranslation } from 'react-i18next';

const ArticleDetails = () => {
  const { t, i18n } = useTranslation();
  const activeLanguage = i18n.language; // 'en' or 'ar'

  const location = useLocation();
  const params = useParams();
  // const { data } = location.state;

  const selectedBlog = blogsData.find((item) => item.id === params.id);
  console.log({ location, params, selectedBlog });
  const getMultiContent = (ar = [], en = [], ur = []) => {
    if (activeLanguage === 'en') return en;
    else if (activeLanguage === 'ar') return ar;
    return ur;
  };
  return (
    <>
      <Helmet>
        <title>المدونة</title>
      </Helmet>
      <div className="my-5 w-[80%] flex flex-col mx-auto ">
        <div
          className="w-[100%] h-[400px] bg-no-repeat bg-cover bg-top"
          style={{
            backgroundImage: `url(${selectedBlog.image})`,
          }}
        ></div>
        <p
          className={`my-3 text-[30px] ${
            activeLanguage === 'en' ? 'text-left' : 'text-right'
          }`}
        >
          {activeLanguage === 'en'
            ? selectedBlog.title_en
            : activeLanguage === 'ur'
            ? selectedBlog.title_ur
            : selectedBlog.title_ar}
        </p>
        <div>
          {selectedBlog.content.map((cont, i) => (
            <div key={i}>
              <p
                className={`my-3 text-[20px] ${
                  activeLanguage === 'en' ? 'text-left' : 'text-right'
                }`}
              >
                {activeLanguage === 'en'
                  ? cont.title_en
                  : activeLanguage === 'ur'
                  ? cont.title_ur
                  : cont.title_ar}
              </p>
              <p
                className={`my-3 font-light ${
                  activeLanguage === 'en' ? 'text-left' : 'text-right'
                }`}
              >
                {activeLanguage === 'en'
                  ? cont.content_en
                  : activeLanguage === 'ur'
                  ? cont.content_ur
                  : cont.content_ar}
              </p>
              {cont.isMultilayerContent &&
                cont.multilayerContent.map((multiCont, j) => (
                  <div
                    className={`${activeLanguage === 'en' ? 'ml-5' : 'mr-5'}`}
                    key={j}
                  >
                    <p
                      className={`my-3 text-[20px] ${
                        activeLanguage === 'en' ? 'text-left' : 'text-right'
                      }`}
                    >
                      {activeLanguage === 'en'
                        ? multiCont.title_en
                        : activeLanguage === 'ur'
                        ? multiCont.title_ur
                        : multiCont.title_ar}
                    </p>
                    {getMultiContent(
                      multiCont.content_ar,
                      multiCont.content_en,
                      multiCont.content_ur
                    ).map((item, k) => (
                      <p
                        className={`my-3 font-light ${
                          activeLanguage === 'en' ? 'text-left' : 'text-right'
                        }`}
                        key={k}
                      >
                        {item}
                      </p>
                    ))}
                  </div>
                ))}
            </div>
          ))}
        </div>
        {/* <h1>{data.title}</h1>
        <p>{parse(data.content)}</p> */}
      </div>
    </>
  );
};

export default ArticleDetails;
