"use client";

import { useActionState } from "react";
import { startStoreCheckout, type StoreHandoffActionState } from "@/app/actions/store";

export function StorePurchaseForm({ productId, label = "Buy Now", buttonClassName }: {
  productId: string;
  label?: string;
  buttonClassName?: string;
}) {
  const [state, action, pending] = useActionState<StoreHandoffActionState, FormData>(startStoreCheckout, {});

  return (
    <form action={action}>
      <input name="product_id" type="hidden" value={productId} />
      <button type="submit" disabled={pending} className={buttonClassName ?? "min-h-11 border-b border-(--fp-hot-pink) pb-2 text-sm uppercase tracking-[0.16em] transition hover:border-(--fp-chrome) disabled:cursor-wait disabled:opacity-55"}>
        {label}
      </button>
      {state.error && <p className="text-sm text-(--fp-blush)" role="alert">{state.error}</p>}
    </form>
  );
}
