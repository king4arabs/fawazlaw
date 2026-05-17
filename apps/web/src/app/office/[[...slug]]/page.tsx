import { notFound } from "next/navigation";
import { getOfficePageData } from "@/features/office/lib/office-api";
import { OfficePageRenderer } from "@/features/office/components/office-page-renderer";

type OfficeRouteProps = {
  params: Promise<{
    slug?: string[];
  }>;
};

export const dynamic = "force-dynamic";

export default async function OfficeRoutePage({ params }: OfficeRouteProps) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug ?? [];
  const path = slug.length === 0 ? "/office" : `/office/${slug.join("/")}`;
  const result = await getOfficePageData(path);

  if (result.kind === "not_found") {
    notFound();
  }

  if (result.kind === "unavailable") {
    return (
      <section className="rounded-[1.6rem] border border-[#d2deec] bg-white p-8 text-right shadow-[0_10px_24px_rgba(94,124,168,0.08)] dark:border-[#1d2d46] dark:bg-[#0f1b2d]">
        <h1 className="text-2xl font-semibold text-[#0e1c33] dark:text-[#eef4ff]">
          تعذر تحميل بيانات لوحة التحكم
        </h1>
        <p className="mt-3 text-sm leading-7 text-[#6d84a1] dark:text-[#8da0bd]">
          لم يتم الوصول إلى Laravel API على
          {" "}
          <span className="font-mono">http://127.0.0.1:8000</span>
          .
          شغّل الباكند أو حدّد
          {" "}
          <span className="font-mono">LARAVEL_API_URL</span>
          {" "}
          الصحيح ثم أعد المحاولة.
        </p>
      </section>
    );
  }

  return <OfficePageRenderer page={result.page} />;
}
