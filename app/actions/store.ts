"use server";

import { redirect } from "next/navigation";
import { getPublicSupabaseClient } from "@/lib/supabase/public";
import type { PublicStoreOrderResult } from "@/lib/supabase/types";

export type StoreOrderActionState = { error?: string };

function isUuid(value: unknown): value is string {
  return typeof value === "string" && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

function privateStoreOrigin() {
  const configured = process.env.FILTHY_PRINCESS_RETREAT_APP_URL?.trim();
  if (!configured) throw new Error("FILTHY_PRINCESS_RETREAT_APP_URL is not configured.");

  const url = new URL(configured);
  if (url.protocol !== "http:" && url.protocol !== "https:") throw new Error("FILTHY_PRINCESS_RETREAT_APP_URL must use HTTP or HTTPS.");
  url.search = "";
  url.hash = "";
  return url.toString().replace(/\/+$/, "");
}

export async function createStoreOrder(
  _previousState: StoreOrderActionState,
  formData: FormData,
): Promise<StoreOrderActionState> {
  const productId = formData.get("product_id");
  const requestKey = formData.get("request_key");
  const buyerEmail = String(formData.get("buyer_email") ?? "").trim().toLowerCase();

  if (!isUuid(productId) || !isUuid(requestKey) || buyerEmail.length > 320 || !/^\S+@\S+\.\S+$/.test(buyerEmail)) {
    return { error: "Enter a valid email address to continue." };
  }

  let retreatAppUrl: string;
  try {
    retreatAppUrl = privateStoreOrigin();
  } catch (error) {
    console.error(error instanceof Error ? error.message : "Private Store handoff is not configured.");
    return { error: "Purchasing is temporarily unavailable. Please try again later." };
  }

  const { data: rawData, error } = await getPublicSupabaseClient().rpc(
    "create_public_store_order" as never,
    {
      p_product_id: productId,
      p_buyer_email: buyerEmail,
      p_request_key: requestKey,
      p_referral_code: null,
    } as never,
  );
  const order = (rawData as unknown as PublicStoreOrderResult[] | null)?.[0];

  if (error || !order) return { error: "That order could not be prepared. Please try again." };
  redirect(`${retreatAppUrl}/store/order/${encodeURIComponent(order.order_reference)}`);
}
