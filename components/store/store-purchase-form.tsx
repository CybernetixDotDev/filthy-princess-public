"use client";

import { useActionState, useState } from "react";
import { createStoreOrder, type StoreOrderActionState } from "@/app/actions/store";

export function StorePurchaseForm({ productId }: { productId: string }) {
  const [open, setOpen] = useState(false);
  const [requestKey, setRequestKey] = useState("");
  const [state, action, pending] = useActionState<StoreOrderActionState, FormData>(createStoreOrder, {});

  function revealForm() {
    if (!requestKey) setRequestKey(crypto.randomUUID());
    setOpen(true);
  }

  if (!open) {
    return (
      <button type="button" onClick={revealForm} className="min-h-11 border-b border-(--fp-hot-pink) pb-2 text-sm uppercase tracking-[0.16em] transition hover:border-(--fp-chrome)">
        Buy Now
      </button>
    );
  }

  return (
    <form action={action} className="w-full max-w-sm space-y-4 sm:min-w-80">
      <input name="product_id" type="hidden" value={productId} />
      <input name="request_key" type="hidden" value={requestKey} />
      <label className="block text-sm uppercase tracking-[0.13em] text-white/70">
        Where should I send your key?
        <input
          name="buyer_email"
          type="email"
          autoComplete="email"
          maxLength={320}
          required
          autoFocus
          className="mt-3 min-h-12 w-full border border-white/25 bg-transparent px-4 text-base normal-case tracking-normal text-white outline-none focus:border-(--fp-hot-pink)"
        />
      </label>
      {state.error && <p className="text-sm text-(--fp-blush)" role="alert">{state.error}</p>}
      <button type="submit" disabled={pending} className="min-h-12 border border-(--fp-hot-pink) px-5 py-3 text-sm uppercase tracking-[0.15em] transition hover:bg-(--fp-hot-pink) hover:text-(--fp-black) disabled:cursor-wait disabled:opacity-55">
        {pending ? "Preparing your order…" : "Buy Now"}
      </button>
    </form>
  );
}
