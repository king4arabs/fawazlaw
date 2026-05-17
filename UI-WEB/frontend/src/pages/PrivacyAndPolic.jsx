import React from "react";
import SEO from "../components/SEO";

const sections = [
  ["سرية البيانات", "تتعامل شركة فواز للمحاماة والاستشارات القانونية مع بيانات العملاء ومستنداتهم بسرية مهنية، ولا تستخدمها إلا لغرض دراسة الطلب أو تقديم الخدمة القانونية المتفق عليها."],
  ["حماية المستندات", "ينبغي مشاركة المستندات عبر القنوات المعتمدة فقط، مع تقليل البيانات غير اللازمة وتحديد صلاحيات الوصول داخل فريق العمل بحسب نطاق الخدمة."],
  ["خصوصية العملاء", "تُستخدم بيانات التواصل للرد على الاستفسارات، إدارة الطلبات، إرسال التحديثات المتعلقة بالخدمة، وتحسين تجربة العميل."],
  ["الذكاء الاصطناعي", "أي أدوات ذكية في المنصة مخصصة للتنظيم والمساندة وتلخيص المعلومات، ولا تعد رأياً قانونياً نهائياً ولا تغني عن مراجعة محامٍ مرخص."],
  ["الالتزام بالأنظمة السعودية", "تسعى الشركة إلى مواءمة تجربة الموقع والمنصة مع الأنظمة السعودية ذات العلاقة بحماية البيانات والسرية المهنية حسب نطاق التطبيق."],
];

const PrivacyAndPolic = () => (
  <main className="bg-[#FFFCF6] px-5 py-14 md:px-12 lg:px-20" dir="rtl">
    <SEO title="سياسة الخصوصية | شركة فواز للمحاماة" description="سياسة خصوصية شركة فواز للمحاماة بشأن سرية البيانات وحماية المستندات وحدود استخدام أدوات الذكاء الاصطناعي." path="/contacts/privacyPolicy" />
    <div className="mx-auto max-w-5xl text-right">
      <header className="mb-8 rounded-[2rem] bg-[#001F3F] p-8 text-white md:p-12">
        <h1 className="mb-4 text-4xl font-black md:text-5xl">سياسة الخصوصية</h1>
        <p className="leading-9 text-[#E8EEF5]">توضح هذه الصفحة المبادئ العامة للتعامل مع بيانات العملاء ومستنداتهم ضمن الموقع والمنصة الرقمية.</p>
      </header>
      <div className="space-y-5">
        {sections.map(([title, text]) => <section className="rounded-3xl bg-white p-6 shadow-sm" key={title}><h2 className="mb-3 text-2xl font-black text-[#003E6F]">{title}</h2><p className="leading-9 text-[#526070]">{text}</p></section>)}
      </div>
    </div>
  </main>
);

export default PrivacyAndPolic;
