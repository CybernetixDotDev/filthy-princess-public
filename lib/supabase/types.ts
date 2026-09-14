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
