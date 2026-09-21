// Resolve on the server using the existing public/private handoff configuration.
export function realmJoinHref(privateOrigin = process.env.FILTHY_PRINCESS_RETREAT_APP_URL) {
  if (!privateOrigin?.trim()) throw new Error("FILTHY_PRINCESS_RETREAT_APP_URL is not configured.");
  const origin = new URL(privateOrigin.trim());
  if (!["http:", "https:"].includes(origin.protocol) || origin.username || origin.password) throw new Error("Invalid private-app origin.");
  const destination = new URL("/signin", origin.origin);
  destination.searchParams.set("mode", "signup");
  destination.searchParams.set("returnTo", "/contribute");
  return destination.toString();
}
