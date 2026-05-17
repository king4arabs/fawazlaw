import React from "react";
import SEO from "../components/SEO";
import { coreServices, homepageFaq, organizationSchema, siteUrl } from "../data/legalContent";

const Section = ({ eyebrow, title, children, className = "" }) => (
  <section className={`px-5 py-16 md:px-12 lg:px-20 ${className}`} dir="rtl">
    <div className="mx-auto max-w-7xl">
      {eyebrow && <p className="mb-3 text-sm font-bold tracking-wide text-[#B9975B]">{eyebrow}</p>}
      <h2 className="mb-8 max-w-4xl text-3xl font-black leading-tight text-[#001F3F] md:text-5xl">{title}</h2>
      {children}
    </div>
  </section>
);

const PremiumHome = () => {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: homepageFaq.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };

  const schema = [organizationSchema, faqSchema, {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ "@type": "ListItem", position: 1, name: "الرئيسية", item: siteUrl }],
  }];

  return (
    <main className="bg-[#FFFCF6] text-[#1F2937]" dir="rtl">
      <SEO
        title="شركة فواز للمحاماة والاستشارات القانونية | منصة قانونية سعودية"
        description="حلول قانونية سعودية متكاملة تجمع بين الخبرة، السرية، والابتكار الرقمي لحماية حقوق الأفراد والشركات في الرياض وجدة."
        path="/"
        keywords="شركة محاماة سعودية, محامي الرياض, محامي جدة, استشارات قانونية, منصة قانونية سعودية"
        schema={schema}
      />

      <section className="relative overflow-hidden bg-[#001F3F] px-5 py-20 text-white md:px-12 lg:px-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(185,151,91,0.28),_transparent_35%)]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="text-right">
            <p className="mb-4 inline-flex rounded-full border border-[#B9975B]/50 bg-white/10 px-4 py-2 text-sm font-bold text-[#F6D99B]">سعودي أولاً، جاهز للتوسع خليجياً</p>
            <h1 className="mb-6 text-4xl font-black leading-tight md:text-6xl">شركة فواز للمحاماة والاستشارات القانونية</h1>
            <p className="mb-8 max-w-3xl text-xl leading-10 text-[#E8EEF5]">حلول قانونية سعودية متكاملة تجمع بين الخبرة، السرية، والابتكار الرقمي لحماية حقوق الأفراد والشركات.</p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-start md:justify-end">
              <a className="rounded-xl bg-[#B9975B] px-6 py-3 text-center font-bold text-[#001F3F] shadow-lg" href="/contacts">احجز استشارة الآن</a>
              <a className="rounded-xl border border-white/30 px-6 py-3 text-center font-bold text-white" href="/services">استعرض خدماتنا</a>
              <a className="rounded-xl bg-white px-6 py-3 text-center font-bold text-[#001F3F]" href="https://app.fawazlaw.sa" target="_blank" rel="noreferrer">دخول منصة العميل</a>
            </div>
          </div>
          <div className="rounded-[2rem] border border-white/15 bg-white/10 p-6 shadow-2xl backdrop-blur">
            <img className="mx-auto max-h-[420px] object-contain" src="/Images/herolawer.png" alt="محامٍ سعودي يمثل خدمات شركة فواز للمحاماة" loading="eager" />
          </div>
        </div>
      </section>

      <Section title="مؤشرات ثقة واضحة قبل بدء أي تعامل" className="bg-white">
        <div className="grid gap-4 md:grid-cols-4">
          {["سرية مهنية في التعامل مع المستندات", "حضور في الرياض وجدة", "خدمات للأفراد والشركات", "مساعد ذكي كأداة دعم لا بديل للمحامي"].map((item) => (
            <div className="rounded-2xl border border-[#E8D9BD] bg-[#FFFCF6] p-5 text-right shadow-sm" key={item}>{item}</div>
          ))}
        </div>
        <p className="mt-6 rounded-2xl bg-[#F8EEDC] p-4 text-right text-sm text-[#5B4421]">تعرض المنصة أي تراخيص أو صفات مهنية فقط عندما تكون موجودة في محتوى الشركة أو مستنداتها، ولا تضيف ادعاءات تنظيمية غير مثبتة.</p>
      </Section>

      <Section eyebrow="الخدمات" title="خدمات قانونية سعودية متكاملة للأفراد والشركات">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {coreServices.map((service) => (
            <a className="group rounded-3xl border border-[#E7EAF0] bg-white p-6 text-right shadow-sm transition hover:-translate-y-1 hover:border-[#B9975B] hover:shadow-xl" href={`/services/${service.slug}`} key={service.slug}>
              <h3 className="mb-3 text-2xl font-black text-[#003E6F]">{service.title}</h3>
              <p className="leading-8 text-[#526070]">{service.description}</p>
              <span className="mt-5 inline-flex font-bold text-[#B9975B]">اعرف تفاصيل الخدمة ←</span>
            </a>
          ))}
        </div>
      </Section>

      <Section eyebrow="رحلة العميل" title="من الطلب إلى المتابعة بمنهجية واضحة" className="bg-white">
        <div className="grid gap-5 md:grid-cols-4">
          {["تحديد الاحتياج", "رفع المستندات", "تقييم قانوني", "تنفيذ ومتابعة"].map((step, index) => (
            <div className="rounded-3xl bg-[#001F3F] p-6 text-right text-white" key={step}>
              <span className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#B9975B] font-black text-[#001F3F]">{index + 1}</span>
              <h3 className="text-2xl font-bold">{step}</h3>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="المنصة الرقمية" title="منصة فواز القانونية الرقمية لإدارة الاستشارات والطلبات">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div className="rounded-3xl bg-white p-8 text-right shadow-lg">
            <p className="mb-6 text-lg leading-9">تدعم المنصة بوابة العميل، إدارة الاستشارات، متابعة الطلبات والقضايا، رفع المستندات، الفواتير والاشتراكات، التنبيهات، والمساعد القانوني الذكي ضمن تجربة آمنة ومنظمة.</p>
            <a className="rounded-xl bg-[#003E6F] px-6 py-3 font-bold text-white" href="/platform">استكشف المنصة الرقمية</a>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {["بوابة العميل", "متابعة الطلبات", "رفع المستندات", "الفواتير والاشتراكات", "التنبيهات", "حماية البيانات"].map((item) => <div className="rounded-2xl border border-[#E8D9BD] bg-white p-5 text-right font-bold" key={item}>{item}</div>)}
          </div>
        </div>
      </Section>

      <Section eyebrow="الذكاء الاصطناعي" title="مساعد قانوني ذكي لتنظيم المعلومات وليس بديلاً عن المحامي" className="bg-[#001F3F] text-white">
        <div className="grid gap-6 md:grid-cols-3">
          {["تلخيص المستندات والأسئلة الأولية", "اقتراح نقاط متابعة للعميل والفريق", "تنبيه واضح بأن المخرجات لا تغني عن مراجعة محامٍ مرخص"].map((item) => <div className="rounded-3xl border border-white/15 bg-white/10 p-6 text-right leading-8" key={item}>{item}</div>)}
        </div>
      </Section>

      <Section eyebrow="الباقات" title="باقات قانونية مرنة للأفراد والشركات">
        <div className="grid gap-6 md:grid-cols-2">
          {["باقة الأفراد", "باقة الشركات"].map((pkg) => (
            <div className="rounded-3xl border border-[#E7EAF0] bg-white p-8 text-right shadow-sm" key={pkg}>
              <h3 className="mb-4 text-3xl font-black text-[#003E6F]">{pkg}</h3>
              <p className="mb-6 leading-8 text-[#526070]">مصممة لتوفير مسار واضح للاستشارات والمتابعة القانونية حسب الاحتياج ونطاق العمل.</p>
              <a className="font-bold text-[#B9975B]" href="/contacts">اطلب عرضاً مناسباً</a>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="الفريق" title="خبرة قانونية يقودها مؤسس الشركة وفريق متخصص" className="bg-white">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl bg-[#FFFCF6] p-8 text-right"><h3 className="mb-3 text-2xl font-black text-[#003E6F]">رسالة المؤسس</h3><p className="leading-9">نعمل على تقديم خدمات قانونية مهنية تجمع بين وضوح الرأي، جودة الصياغة، وسرية التعامل، مع تطوير تجربة رقمية تخدم العميل دون المساس بدور المحامي المرخص.</p></div>
          <div className="rounded-3xl bg-[#FFFCF6] p-8 text-right"><h3 className="mb-3 text-2xl font-black text-[#003E6F]">لماذا تختار شركة فواز للمحاماة؟</h3><ul className="space-y-3 leading-8"><li>• لغة قانونية واضحة ومباشرة.</li><li>• متابعة منظمة للطلبات والمستندات.</li><li>• أولوية للسرية والامتثال والخصوصية.</li></ul></div>
        </div>
      </Section>

      <Section eyebrow="مستجدات" title="مستجدات قانونية سعودية تهم الأفراد والشركات">
        <div className="rounded-3xl bg-white p-8 text-right shadow-sm">
          <p className="mb-4 leading-8">يتم ربط المقالات القانونية بخدمات الشركة لمساعدة الزائر على فهم السياق النظامي والوصول السريع إلى الاستشارة المناسبة.</p>
          <a className="font-bold text-[#B9975B]" href="/blog">زيارة المدونة القانونية</a>
        </div>
      </Section>

      <Section eyebrow="أسئلة شائعة" title="إجابات مختصرة قبل التواصل" className="bg-white">
        <div className="grid gap-4 md:grid-cols-2">
          {homepageFaq.map(([q, a]) => <details className="rounded-2xl border border-[#E7EAF0] p-5 text-right" key={q}><summary className="cursor-pointer font-bold text-[#003E6F]">{q}</summary><p className="mt-3 leading-8 text-[#526070]">{a}</p></details>)}
        </div>
      </Section>

      <Section title="ابدأ بخطوة قانونية واضحة اليوم" className="bg-[#001F3F] text-white">
        <p className="mb-8 max-w-3xl text-right text-lg leading-9 text-[#E8EEF5]">أرسل ملخص احتياجك القانوني، وسنساعدك على تحديد المسار الأنسب للخدمة أو الاستشارة.</p>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <a className="rounded-xl bg-[#B9975B] px-6 py-3 text-center font-bold text-[#001F3F]" href="/contacts">احجز استشارة الآن</a>
          <a className="rounded-xl border border-white/30 px-6 py-3 text-center font-bold text-white" href="/services">استعرض الخدمات</a>
        </div>
      </Section>
    </main>
  );
};

export default PremiumHome;
