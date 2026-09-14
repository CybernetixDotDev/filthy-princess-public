import "server-only";

import { cache } from "react";
import { unstable_cache } from "next/cache";
import { getPublicSupabaseClient } from "@/lib/supabase/public";
import type { PublicDataResult, PublicStoreProduct } from "@/lib/supabase/types";

const readActiveProducts = unstable_cache(
  async (): Promise<PublicStoreProduct[]> => {
    const { data, error } = await getPublicSupabaseClient()
      .from("store_products")
      .select("id,slug,name,short_description,description,product_type,price_amount,currency,image_path,sort_order")
      .eq("status", "active")
      .order("sort_order", { ascending: true })
      .order("name", { ascending: true })
      .order("id", { ascending: true });

    if (error) throw error;
    return (data ?? []) as PublicStoreProduct[];
  },
  ["public-store-products"],
  { revalidate: 180, tags: ["public-store-products"] },
);

export const getPublicStoreProducts = cache(
  async (): Promise<PublicDataResult<PublicStoreProduct[]>> => {
    try {
      return { status: "success", data: await readActiveProducts() };
    } catch {
      console.error("Public Store data is unavailable.");
      return { status: "unavailable", data: [] };
    }
  },
);
