import "server-only";

import { cache } from "react";
import { unstable_cache } from "next/cache";
import { getPublicSupabaseClient } from "@/lib/supabase/public";
import type { PublicDataResult, PublicRetreatProduct } from "@/lib/supabase/types";

const readPublishedRetreatProducts = unstable_cache(
  async (): Promise<PublicRetreatProduct[]> => {
    const { data, error } = await getPublicSupabaseClient()
      .from("retreat_products")
      .select("id,slug,name,positioning,allowed_formats,sort_order")
      .eq("is_published", true)
      .order("sort_order", { ascending: true })
      .order("name", { ascending: true })
      .order("id", { ascending: true });

    if (error) throw error;
    return (data ?? []) as PublicRetreatProduct[];
  },
  ["public-retreat-products"],
  { revalidate: 180, tags: ["public-retreat-products"] },
);

export const getPublicRetreatProducts = cache(
  async (): Promise<PublicDataResult<PublicRetreatProduct[]>> => {
    try {
      return { status: "success", data: await readPublishedRetreatProducts() };
    } catch {
      console.error("Public Retreat data is unavailable.");
      return { status: "unavailable", data: [] };
    }
  },
);
