export type PublicDataResult<T> =
  | { status: "success"; data: T }
  | { status: "unavailable"; data: T };

export type PublicStoreProduct = {
  id: string;
  slug: string;
  name: string;
  short_description: string;
  description: string;
  product_type: string;
  price_amount: number;
  currency: string;
  image_path: string | null;
  sort_order: number;
};

export type PublicInvitableEvent = {
  id: string;
  slug: string;
  title: string;
  start_date: string;
  end_date: string;
  capacity: number;
  available_places: number;
  description: string | null;
  invitation_only: boolean;
  interest_enabled: boolean;
};

export type PublicRetreatFormat = "solo" | "couples" | "private_group" | "join_a_group";

export type PublicRetreatProduct = {
  id: string;
  slug: string;
  name: string;
  positioning: string;
  allowed_formats: PublicRetreatFormat[];
  sort_order: number;
};
