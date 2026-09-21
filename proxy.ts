import { NextResponse, type NextRequest } from "next/server";
import { isReferralCode, REFERRAL_COOKIE_NAME } from "@/lib/referral";
import { getPublicSupabaseClient } from "@/lib/supabase/public";

export async function proxy(request: NextRequest) {
  const response = NextResponse.next();
  const code = request.nextUrl.searchParams.get("ref");
  if (request.method !== "GET" || !isReferralCode(code)) return response;

  try {
    const { data, error } = await getPublicSupabaseClient().rpc(
      "is_valid_inner_sanctum_referral_code" as never,
      { p_code: code } as never,
    );
    if (!error && data === true) {
      response.cookies.set(REFERRAL_COOKIE_NAME, code, {
        path: "/",
        maxAge: 7_776_000,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      });
    }
  } catch {
    // Validation failure must not interrupt browsing or erase a valid referral.
  }
  return response;
}

export const config = {
  matcher: [{
    source: "/((?!api|_next|.*\\..*).*)",
    has: [{ type: "query", key: "ref" }],
    missing: [
      { type: "header", key: "next-router-prefetch" },
      { type: "header", key: "purpose", value: "prefetch" },
    ],
  }],
};
