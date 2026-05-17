import React from "react";
import SEO from "../components/SEO";

const features = ["بوابة العميل", "إدارة الاستشارات", "متابعة الطلبات والقضايا", "رفع المستندات", "الفواتير والاشتراكات", "التنبيهات", "المساعد القانوني الذكي", "حماية البيانات والسرية"];

const Platform = () => (
  <main className="bg-[#FFFCF6] px-5 py-14 md:px-12 lg:px-20" dir="rtl">
    <SEO
      title="منصة فواز القانونية الرقمية | بوابة العميل وإدارة الاستشارات"
      description="تعرف على منصة فواز القانونية الرقمية لإدارة الاستشارات، متابعة الطلبات، رفع المستندات، الفواتير، التنبيهات، والمساعد القانوني الذكي كأداة دعم."
      path="/platform"
      keywords="منصة قانونية رقمية, بوابة العميل, إدارة الاستشارات, مساعد قانوني ذكي"
    />
    <div className="mx-auto max-w-7xl text-right">
      <header className="rounded-[2rem] bg-[#001F3F] p-8 text-white md:p-12">
        <p className="mb-3 text-[#F6D99B]">منصة رقمية داعمة للخدمة القانونية</p>
        <h1 className="mb-5 text-4xl font-black md:text-6xl">منصة فواز القانونية الرقمية</h1>
        <p className="max-w-4xl text-xl leading-10 text-[#E8EEF5]">تجربة رقمية لتنظيم الاستشارات والطلبات والمستندات، مع إبقاء الرأي القانوني المهني تحت إشراف المحامي المرخص.</p>
      </header>
      <section className="grid gap-5 py-12 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => <div className="rounded-3xl border border-[#E7EAF0] bg-white p-6 font-bold text-[#003E6F] shadow-sm" key={feature}>{feature}</div>)}
      </section>
      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl bg-white p-8 shadow-sm"><h2 className="mb-4 text-3xl font-black text-[#003E6F]">حماية البيانات والسرية</h2><p className="leading-9 text-[#526070]">توضح المنصة أن المستندات وبيانات العملاء تعامل بسرية، وأن الوصول يجب أن يكون محدوداً بحسب دور المستخدم ونطاق الخدمة.</p></div>
        <div className="rounded-3xl bg-white p-8 shadow-sm"><h2 className="mb-4 text-3xl font-black text-[#003E6F]">حدود استخدام الذكاء الاصطناعي</h2><p className="leading-9 text-[#526070]">المساعد الذكي يستخدم لتنظيم المعلومات وتسهيل المتابعة، ولا يقدم بديلاً عن الاستشارة القانونية أو مراجعة محامٍ مرخص.</p></div>
      </section>
    </div>
  </main>
);

export default Platform;
