"use server";

import { getPublicSupabaseClient } from "@/lib/supabase/public";
import type { PublicRetreatFormat } from "@/lib/supabase/types";

const PRIVATE_FORMATS = ["solo", "couples", "private_group"] as const;
type PrivateRetreatFormat = (typeof PRIVATE_FORMATS)[number];

export type PublicRetreatPrice = {
  currency: string;
  nights: number;
  guestCount: number;
  total: number;
};

export type RetreatEnquiryState = { success?: boolean; error?: string };

function isPrivateFormat(value: unknown): value is PrivateRetreatFormat {
  return typeof value === "string" && PRIVATE_FORMATS.includes(value as PrivateRetreatFormat);
}

function isUuid(value: unknown): value is string {
  return typeof value === "string" && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

function canonicalGuestCount(format: PrivateRetreatFormat, requested: number) {
  if (format === "solo") return 1;
  if (format === "couples") return 2;
  return requested;
}

export async function getRetreatPrice(input: {
  productId: string;
  format: PublicRetreatFormat;
  guestCount: number;
}): Promise<{ price?: PublicRetreatPrice; error?: string }> {
  if (!isUuid(input.productId) || !isPrivateFormat(input.format)) return { error: "Price currently unavailable." };
  const guestCount = canonicalGuestCount(input.format, input.guestCount);
  if (!Number.isInteger(guestCount) || guestCount < 1 || guestCount > 50) return { error: "Price currently unavailable." };

  try {
    const { data: rawData, error } = await getPublicSupabaseClient()
      .rpc("get_public_retreat_price" as never, {
        p_product_id: input.productId,
        p_format: input.format,
        p_guest_count: guestCount,
      } as never)
      .maybeSingle();
    const data = rawData as unknown as { currency: string; nights: number; guest_count: number; total_usd: number } | null;

    if (error || !data) return { error: "Price currently unavailable." };
    return {
      price: {
        currency: String(data.currency),
        nights: Number(data.nights),
        guestCount: Number(data.guest_count),
        total: Number(data.total_usd),
      },
    };
  } catch {
    return { error: "Price currently unavailable." };
  }
}

export async function submitRetreatInterest(
  _previousState: RetreatEnquiryState,
  formData: FormData,
): Promise<RetreatEnquiryState> {
  const productId = formData.get("product_id");
  const format = formData.get("retreat_format");
  const requestedGuestCount = Number(formData.get("guest_count"));
  const fullName = String(formData.get("full_name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!isUuid(productId) || !isPrivateFormat(format)) return { error: "Please choose an experience and format." };
  const guestCount = canonicalGuestCount(format, requestedGuestCount);
  if (!Number.isInteger(guestCount) || guestCount < 1 || guestCount > 50) return { error: "Please choose a valid guest count." };
  if (fullName.length < 2 || fullName.length > 200 || email.length > 320 || !/^\S+@\S+\.\S+$/.test(email)) {
    return { error: "Please check your name and email address." };
  }
  if (message.length > 2000) return { error: "Your message is a little too long." };

  try {
    const { error } = await getPublicSupabaseClient().rpc("submit_public_retreat_interest" as never, {
      p_full_name: fullName,
      p_email: email,
      p_retreat_product_id: productId,
      p_retreat_format: format,
      p_guest_count: guestCount,
      p_message: message || null,
    } as never);
    if (error) return { error: "We couldn't send your enquiry. Please try again." };
    return { success: true };
  } catch {
    return { error: "We couldn't send your enquiry. Please try again." };
  }
}
