import React from "react";
import SEO from "../components/SEO";

const terms = [
  ["نطاق المعلومات", "محتوى الموقع للتعريف بالخدمات القانونية والرقمية ولا يمثل استشارة قانونية مخصصة إلا بعد قبول الطلب وتحديد نطاق الخدمة."],
  ["طلبات الخدمة", "قد يتطلب بدء الخدمة تقديم مستندات ومعلومات صحيحة وكاملة، وتحديد نطاق العمل والرسوم وآلية التواصل."],
  ["حدود المساعد الذكي", "المخرجات الذكية أدوات دعم أولية لتنظيم المعلومات، ولا تغني عن مراجعة محامٍ مرخص أو إصدار رأي قانوني مهني."],
  ["الروابط الخارجية", "قد يحتوي الموقع على روابط دفع أو تواصل أو منصة عميل خارج النطاق الرئيسي، ويجب على المستخدم التحقق من الرابط قبل إدخال البيانات."],
  ["السرية والامتثال", "يلتزم المستخدم بعدم إرسال بيانات لا تخصه أو مستندات لا يملك حق مشاركتها، وتتعامل الشركة مع الملفات وفق واجبات السرية المهنية."],
];

const TermsAndConditions = () => (
  <main className="bg-[#FFFCF6] px-5 py-14 md:px-12 lg:px-20" dir="rtl">
    <SEO title="الشروط والأحكام | شركة فواز للمحاماة" description="الشروط والأحكام العامة لاستخدام موقع فواز للمحاماة وخدماته الرقمية وحدود استخدام المساعد القانوني الذكي." path="/contacts/tandc" />
    <div className="mx-auto max-w-5xl text-right">
      <header className="mb-8 rounded-[2rem] bg-[#001F3F] p-8 text-white md:p-12">
        <h1 className="mb-4 text-4xl font-black md:text-5xl">الشروط والأحكام</h1>
        <p className="leading-9 text-[#E8EEF5]">بنود عامة لتنظيم استخدام الموقع والمنصة، مع الفصل بين المعلومات التعريفية والخدمات القانونية المتفق عليها.</p>
      </header>
      <div className="space-y-5">
        {terms.map(([title, text]) => <section className="rounded-3xl bg-white p-6 shadow-sm" key={title}><h2 className="mb-3 text-2xl font-black text-[#003E6F]">{title}</h2><p className="leading-9 text-[#526070]">{text}</p></section>)}
      </div>
    </div>
  </main>
);

export default TermsAndConditions;
