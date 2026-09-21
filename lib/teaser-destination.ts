type Destination = { destination_type?: "store" | "promo"; promo_destination?: "contribute" | null; store_product_id: string | null; store_product_active: boolean };
export function teaserEnterHref(teaser: Destination, privateOrigin = process.env.FILTHY_PRINCESS_RETREAT_APP_URL): string | null {
  if ((teaser.destination_type ?? "store") === "store") return teaser.store_product_active && teaser.store_product_id ? "/store" : null;
  if (teaser.promo_destination !== "contribute") return null;
  if (!privateOrigin?.trim()) throw new Error("FILTHY_PRINCESS_RETREAT_APP_URL is not configured.");
  const url = new URL(privateOrigin.trim());
  if (!["http:", "https:"].includes(url.protocol) || url.username || url.password) throw new Error("Invalid private-app origin.");
  return new URL("/contribute", url.origin).toString();
}
