import "server-only";

export const REFERRAL_COOKIE_NAME = "inner_sanctum_referral";

export function isReferralCode(value: unknown): value is string {
  return typeof value === "string" && /^[A-Za-z0-9_-]{16,100}$/.test(value);
}
