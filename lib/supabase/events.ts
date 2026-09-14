import "server-only";

import { cache } from "react";
import { unstable_cache } from "next/cache";
import { getPublicSupabaseClient } from "@/lib/supabase/public";
import type { PublicDataResult, PublicInvitableEvent } from "@/lib/supabase/types";

const BUSINESS_TIME_ZONE = "Africa/Johannesburg";

export function getJohannesburgBusinessDate(date = new Date()): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: BUSINESS_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);

  const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
  return `${values.year}-${values.month}-${values.day}`;
}

const readPublicInvitableEvents = unstable_cache(
  async (businessDate: string): Promise<PublicInvitableEvent[]> => {
    const { data, error } = await getPublicSupabaseClient()
      .from("retreat_events")
      .select("id,slug,title,start_date,end_date,capacity,available_places,description,invitation_only,interest_enabled")
      .eq("status", "published")
      .eq("invitation_only", true)
      .eq("interest_enabled", true)
      .gt("available_places", 0)
      .gte("end_date", businessDate)
      .order("start_date", { ascending: true })
      .order("end_date", { ascending: true })
      .order("id", { ascending: true });

    if (error) throw error;
    return (data ?? []) as PublicInvitableEvent[];
  },
  ["public-invitable-events"],
  { revalidate: 180, tags: ["public-invitable-events"] },
);

export const getPublicInvitableEvents = cache(
  async (): Promise<PublicDataResult<PublicInvitableEvent[]>> => {
    try {
      const data = await readPublicInvitableEvents(getJohannesburgBusinessDate());
      return { status: "success", data };
    } catch {
      console.error("Public Events data is unavailable.");
      return { status: "unavailable", data: [] };
    }
  },
);
