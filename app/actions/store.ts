"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { isReferralCode, REFERRAL_COOKIE_NAME } from "@/lib/referral";

export type StoreHandoffActionState = { error?: string };

function isUuid(value: unknown): value is string {
  return typeof value === "string" && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

function privateStoreOrigin() {
  const configured = process.env.FILTHY_PRINCESS_RETREAT_APP_URL?.trim();
  if (!configured) throw new Error("FILTHY_PRINCESS_RETREAT_APP_URL is not configured.");

  const url = new URL(configured);
  if (url.protocol !== "http:" && url.protocol !== "https:") throw new Error("FILTHY_PRINCESS_RETREAT_APP_URL must use HTTP or HTTPS.");
  return url.origin;
}

export async function startStoreCheckout(
  _previousState: StoreHandoffActionState,
  formData: FormData,
): Promise<StoreHandoffActionState> {
  const productId = formData.get("product_id");
  if (!isUuid(productId)) {
    return { error: "That product could not be selected. Please reload and try again." };
  }

  let retreatAppUrl: string;
  try {
    retreatAppUrl = privateStoreOrigin();
  } catch (error) {
    console.error(error instanceof Error ? error.message : "Private Store handoff is not configured.");
    return { error: "Purchasing is temporarily unavailable. Please try again later." };
  }

  const destination = new URL("/checkout/start", retreatAppUrl);
  destination.searchParams.set("product", productId);
  const referral = (await cookies()).get(REFERRAL_COOKIE_NAME)?.value;
  // Forward only a candidate: the private app independently validates attribution.
  if (isReferralCode(referral)) destination.searchParams.set("ref", referral);
  redirect(destination.toString());
}
