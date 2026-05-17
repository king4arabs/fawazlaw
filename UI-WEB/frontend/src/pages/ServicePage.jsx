import React from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import SEO from "../components/SEO";
import { coreServices, organizationSchema, siteUrl } from "../data/legalContent";

const ListBlock = ({ title, items }) => (
  <section className="rounded-3xl border border-[#E7EAF0] bg-white p-6 text-right shadow-sm">
    <h2 className="mb-4 text-2xl font-black text-[#003E6F]">{title}</h2>
    <ul className="space-y-3 leading-8 text-[#4B5563]">
      {items.map((item) => <li key={item}>• {item}</li>)}
    </ul>
  </section>
);

const ServicePage = () => {
  const { slug } = useParams();
  const service = coreServices.find((item) => item.slug === slug);
  if (!service) return <Navigate to="/services" replace />;

  const path = `/services/${service.slug}`;
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    provider: organizationSchema,
    areaServed: "Saudi Arabia",
    serviceType: "Legal service",
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faq.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "الرئيسية", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "الخدمات", item: `${siteUrl}/services` },
      { "@type": "ListItem", position: 3, name: service.title, item: `${siteUrl}${path}` },
    ],
  };

  return (
    <main className="bg-[#FFFCF6] px-5 py-14 md:px-12 lg:px-20" dir="rtl">
      <SEO title={service.seoTitle} description={service.description} keywords={service.keywords} path={path} schema={[serviceSchema, faqSchema, breadcrumbSchema]} />
      <div className="mx-auto max-w-7xl">
        <nav className="mb-8 text-right text-sm text-[#667085]" aria-label="Breadcrumb">
          <Link to="/">الرئيسية</Link> / <Link to="/services">الخدمات</Link> / <span>{service.title}</span>
        </nav>
        <header className="mb-10 rounded-[2rem] bg-[#001F3F] p-8 text-right text-white md:p-12">
          <p className="mb-3 text-[#F6D99B]">خدمة قانونية سعودية</p>
          <h1 className="mb-5 text-4xl font-black md:text-6xl">{service.title}</h1>
          <p className="max-w-4xl text-xl leading-10 text-[#E8EEF5]">{service.description}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
            <Link className="rounded-xl bg-[#B9975B] px-6 py-3 text-center font-bold text-[#001F3F]" to="/contacts">احجز استشارة</Link>
            <Link className="rounded-xl border border-white/30 px-6 py-3 text-center font-bold text-white" to="/services">كل الخدمات</Link>
          </div>
        </header>
        <div className="grid gap-6 lg:grid-cols-2">
          <ListBlock title="لمن تناسب هذه الخدمة؟" items={service.audience} />
          <ListBlock title="المشكلات التي تعالجها" items={service.problems} />
          <ListBlock title="نطاق الخدمة" items={service.scope} />
          <ListBlock title="خطوات العمل" items={service.process} />
          <ListBlock title="المستندات المطلوبة" items={service.documents} />
          <section className="rounded-3xl border border-[#E7EAF0] bg-white p-6 text-right shadow-sm">
            <h2 className="mb-4 text-2xl font-black text-[#003E6F]">المدة المتوقعة</h2>
            <p className="leading-8 text-[#4B5563]">{service.timeline}</p>
          </section>
        </div>
        <section className="mt-8 rounded-3xl bg-white p-6 text-right shadow-sm">
          <h2 className="mb-5 text-2xl font-black text-[#003E6F]">أسئلة شائعة عن {service.title}</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {service.faq.map(([question, answer]) => <details className="rounded-2xl border border-[#E7EAF0] p-5" key={question}><summary className="cursor-pointer font-bold">{question}</summary><p className="mt-3 leading-8 text-[#526070]">{answer}</p></details>)}
          </div>
        </section>
        <section className="mt-8 rounded-3xl bg-[#001F3F] p-8 text-right text-white">
          <h2 className="mb-4 text-3xl font-black">مقالات وخطوات ذات صلة</h2>
          <p className="mb-6 leading-8 text-[#E8EEF5]">راجع المدونة القانونية أو تواصل معنا لربط موضوعك بالخدمة المناسبة.</p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <Link className="rounded-xl border border-white/30 px-6 py-3 text-center font-bold" to="/blog">المستجدات القانونية</Link>
            <Link className="rounded-xl bg-[#B9975B] px-6 py-3 text-center font-bold text-[#001F3F]" to="/contacts">اطلب الخدمة</Link>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ServicePage;
