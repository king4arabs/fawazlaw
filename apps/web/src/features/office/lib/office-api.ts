import type { OfficePageData } from "@/features/office/types";

const apiUrl = process.env.LARAVEL_API_URL ?? "http://127.0.0.1:8000";

export type OfficePageDataResult =
  | {
      kind: "ok";
      page: OfficePageData;
    }
  | {
      kind: "not_found";
    }
  | {
      kind: "unavailable";
    };

export async function getOfficePageData(
  path: string,
): Promise<OfficePageDataResult> {
  const url = new URL("/api/office/page-data", apiUrl);
  url.searchParams.set("path", path);

  try {
    const response = await fetch(url.toString(), {
      cache: "no-store",
    });

    if (response.status === 404) {
      return { kind: "not_found" };
    }

    if (!response.ok) {
      throw new Error(`Failed to fetch page data for ${path}`);
    }

    return {
      kind: "ok",
      page: (await response.json()) as OfficePageData,
    };
  } catch {
    return { kind: "unavailable" };
  }
}
