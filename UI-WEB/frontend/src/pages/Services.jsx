import React from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import { coreServices, organizationSchema, siteUrl } from "../data/legalContent";

const Services = () => {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "الرئيسية", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "الخدمات", item: `${siteUrl}/services` },
    ],
  };

  return (
    <main className="bg-[#FFFCF6] px-5 py-14 md:px-12 lg:px-20" dir="rtl">
      <SEO
        title="خدمات قانونية سعودية متكاملة للأفراد والشركات | فواز للمحاماة"
        description="استعرض خدمات شركة فواز للمحاماة: الاستشارات، التوكيل، التحكيم، الإفلاس، الصلح، الشركات، القضايا العمالية، التنفيذ، الملكية الفكرية، والحوكمة."
        path="/services"
        keywords="خدمات قانونية, محامي السعودية, استشارات قانونية, محامي شركات, محامي عمالي"
        schema={[organizationSchema, breadcrumbSchema]}
      />
      <div className="mx-auto max-w-7xl text-right">
        <header className="mb-10 rounded-[2rem] bg-[#001F3F] p-8 text-white md:p-12">
          <p className="mb-3 text-[#F6D99B]">خدماتنا</p>
          <h1 className="mb-5 text-4xl font-black md:text-6xl">خدمات قانونية سعودية متكاملة للأفراد والشركات</h1>
          <p className="max-w-4xl text-xl leading-10 text-[#E8EEF5]">مسارات واضحة للاستشارة، التمثيل، التسوية، الامتثال، وحماية المصالح التجارية والشخصية داخل المملكة.</p>
        </header>
        <section className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {coreServices.map((service) => (
            <Link className="rounded-3xl border border-[#E7EAF0] bg-white p-6 text-right shadow-sm transition hover:-translate-y-1 hover:border-[#B9975B] hover:shadow-xl" to={`/services/${service.slug}`} key={service.slug}>
              <h2 className="mb-3 text-2xl font-black text-[#003E6F]">{service.title}</h2>
              <p className="leading-8 text-[#526070]">{service.description}</p>
              <span className="mt-5 inline-flex font-bold text-[#B9975B]">تفاصيل الخدمة ←</span>
            </Link>
          ))}
        </section>
        <section className="mt-12 rounded-3xl bg-white p-8 text-right shadow-sm">
          <h2 className="mb-4 text-3xl font-black text-[#003E6F]">كيف نحدد الخدمة المناسبة؟</h2>
          <p className="leading-9 text-[#526070]">نبدأ بفهم الوقائع والمستندات، ثم نحدد نطاق العمل، المخاطر، والخيارات النظامية المناسبة قبل بدء التنفيذ.</p>
          <Link className="mt-6 inline-flex rounded-xl bg-[#003E6F] px-6 py-3 font-bold text-white" to="/contacts">اطلب توجيهاً أولياً</Link>
        </section>
      </div>
    </main>
  );
};

export default Services;
