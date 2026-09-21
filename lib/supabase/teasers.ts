import "server-only";

import { cache } from "react";
import { getPublicSupabaseClient } from "@/lib/supabase/public";

export type PublishedTeaser = {
  id: string;
  slug: string;
  eyebrow: string | null;
  title: string;
  body: string | null;
  graffiti_lines: string[] | null;
  image_1_path: string | null;
  image_2_path: string | null;
  image_3_path: string | null;
  visibility: "private" | "public";
  store_product_id: string | null;
  store_product_active: boolean;
  published_at: string;
};

// Request-local deduplication only: publication decisions always belong to the RPC.
export const getPublishedTeaser = cache(async (slug: string): Promise<PublishedTeaser | null> => {
  const { data, error } = await getPublicSupabaseClient().rpc(
    "get_published_teaser_by_slug" as never,
    { p_slug: slug } as never,
  );
  if (error) throw new Error("The invitation is temporarily unavailable.");
  return (data as PublishedTeaser[] | null)?.[0] ?? null;
});

export function teaserMediaUrl(path: string): string {
  return getPublicSupabaseClient().storage.from("teaser-media").getPublicUrl(path).data.publicUrl;
}
