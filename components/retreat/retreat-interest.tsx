"use client";

import { useActionState, useEffect, useMemo, useState, useTransition, type ReactNode } from "react";
import { getRetreatPrice, submitRetreatInterest, type PublicRetreatPrice } from "@/app/actions/retreat";
import type { PublicRetreatFormat, PublicRetreatProduct } from "@/lib/supabase/types";

const formatLabels: Partial<Record<PublicRetreatFormat, string>> = {
  solo: "Just Me",
  couples: "Couple",
  private_group: "Private Group",
};

const privateFormats = ["solo", "couples", "private_group"] as const;
type PrivateFormat = (typeof privateFormats)[number];

function isPrivateFormat(format: PublicRetreatFormat): format is PrivateFormat {
  return privateFormats.includes(format as PrivateFormat);
}

function formatMoney(price: PublicRetreatPrice) {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: price.currency,
      currencyDisplay: "code",
      maximumFractionDigits: 0,
    }).format(price.total);
  } catch {
    return `${price.currency} ${new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(price.total)}`;
  }
}

export function RetreatInterest({ products, continuation }: { products: PublicRetreatProduct[]; continuation?: ReactNode }) {
  const [productId, setProductId] = useState(products[0]?.id ?? "");
  const product = products.find((item) => item.id === productId) ?? products[0];
  const formats = useMemo(() => product?.allowed_formats.filter(isPrivateFormat) ?? [], [product]);
  const [format, setFormat] = useState<PrivateFormat>(formats[0] ?? "solo");
  const [groupGuests, setGroupGuests] = useState(3);
  const [price, setPrice] = useState<PublicRetreatPrice | null>(null);
  const [priceError, setPriceError] = useState(false);
  const [pricing, startPricing] = useTransition();
  const [enquiryState, enquiryAction, submitting] = useActionState(submitRetreatInterest, {});
  const [modalDismissed, setModalDismissed] = useState(false);
  const guestCount = format === "solo" ? 1 : format === "couples" ? 2 : groupGuests;

  useEffect(() => {
    if (!product || !formats.includes(format) || !Number.isInteger(guestCount) || guestCount < 1 || guestCount > 50) {
      return;
    }
    let current = true;
    startPricing(async () => {
      const result = await getRetreatPrice({ productId: product.id, format, guestCount });
      if (!current) return;
      setPrice(result.price ?? null);
      setPriceError(!result.price);
    });
    return () => { current = false; };
  }, [format, guestCount, formats, product]);

  if (!products.length) {
    return <><p className="mx-auto max-w-xl text-center text-lg text-white/65">Retreat details are temporarily unavailable. Please come back soon.</p>{continuation}</>;
  }

  return (
    <>
      <div className="mx-auto max-w-3xl">
        <p className="eyebrow text-(--fp-hot-pink)">Choose your retreat</p>
        <h2 className="display mt-5 text-5xl leading-[0.95] sm:text-7xl">MAKE IT YOURS.</h2>

        <fieldset className="mt-12">
          <legend className="display text-2xl">Choose your experience</legend>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {products.map((item) => (
              <button key={item.id} type="button" aria-pressed={product?.id === item.id} onClick={() => { setProductId(item.id); setFormat(item.allowed_formats.filter(isPrivateFormat)[0] ?? "solo"); setPrice(null); setPriceError(false); }} className={`min-h-24 border p-5 text-left transition ${product?.id === item.id ? "border-(--fp-hot-pink) bg-white/8" : "border-white/20 hover:border-white/55"}`}>
                <span className="display text-xl leading-tight">{item.name}</span>
              </button>
            ))}
          </div>
          {product && <p className="mt-5 max-w-2xl leading-7 text-white/60">{product.positioning}</p>}
        </fieldset>

        <fieldset className="mt-12">
          <legend className="display text-2xl">Who is this for?</legend>
          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {formats.map((item) => (
              <button key={item} type="button" aria-pressed={format === item} onClick={() => { setFormat(item); setPrice(null); setPriceError(false); }} className={`min-h-14 border px-4 py-3 text-sm uppercase tracking-[0.13em] transition ${format === item ? "border-(--fp-hot-pink) bg-white/8" : "border-white/20 hover:border-white/55"}`}>
                {formatLabels[item]}
              </button>
            ))}
          </div>
        </fieldset>

        {format === "private_group" && (
          <label className="mt-8 block max-w-48 text-sm uppercase tracking-[0.13em] text-white/70">
            Number of guests
            <input className="mt-3 min-h-12 w-full border border-white/25 bg-transparent px-4 text-base text-white outline-none focus:border-(--fp-hot-pink)" type="number" min={1} max={50} value={groupGuests} onChange={(event) => { setGroupGuests(Number(event.target.value)); setPrice(null); setPriceError(false); }} />
          </label>
        )}

        <section className="mt-12 border-y border-white/15 py-8" aria-live="polite">
          <p className="eyebrow text-white/45">Your experience</p>
          <h3 className="display mt-3 text-3xl">{product?.name}</h3>
          <p className="mt-2 text-white/60">{formatLabels[format]} · {price?.guestCount ?? guestCount} guest{(price?.guestCount ?? guestCount) === 1 ? "" : "s"} · {price?.nights ?? 3} nights</p>
          {price ? <p className="display mt-7 text-4xl text-(--fp-blush)">Approximately {formatMoney(price)}</p> : pricing ? <p className="mt-7 text-white/55">Finding your approximate price…</p> : priceError ? <p className="mt-7 text-white/55">Price currently unavailable. Cally can confirm it with you.</p> : null}
          <p className="mt-3 text-sm text-white/45">Final pricing and availability are confirmed personally.</p>
        </section>

        {price && (
          <form action={enquiryAction} className="mt-12 space-y-5">
            <input type="hidden" name="product_id" value={product.id} />
            <input type="hidden" name="retreat_format" value={format} />
            <input type="hidden" name="guest_count" value={price.guestCount} />
            <label className="block text-sm uppercase tracking-[0.13em] text-white/70">Name<input className="mt-2 min-h-12 w-full border border-white/25 bg-transparent px-4 text-base normal-case tracking-normal text-white outline-none focus:border-(--fp-hot-pink)" name="full_name" autoComplete="name" minLength={2} maxLength={200} required /></label>
            <label className="block text-sm uppercase tracking-[0.13em] text-white/70">Email<input className="mt-2 min-h-12 w-full border border-white/25 bg-transparent px-4 text-base normal-case tracking-normal text-white outline-none focus:border-(--fp-hot-pink)" name="email" type="email" autoComplete="email" maxLength={320} required /></label>
            <label className="block text-sm uppercase tracking-[0.13em] text-white/70">Anything you&rsquo;d like Cally to know? <span className="normal-case tracking-normal text-white/40">Optional</span><textarea className="mt-2 min-h-28 w-full border border-white/25 bg-transparent p-4 text-base normal-case tracking-normal text-white outline-none focus:border-(--fp-hot-pink)" name="message" maxLength={2000} /></label>
            {enquiryState.error && <p className="text-sm text-(--fp-blush)" role="alert">{enquiryState.error}</p>}
            <button className="min-h-14 border border-(--fp-hot-pink) px-6 py-3 text-sm uppercase tracking-[0.15em] transition hover:bg-(--fp-hot-pink) hover:text-(--fp-black) disabled:cursor-wait disabled:opacity-55" disabled={submitting}>{submitting ? "Sending…" : "Let Cally know I'm interested"}</button>
          </form>
        )}
      </div>

      {enquiryState.success && !modalDismissed && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/80 p-5" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setModalDismissed(true); }}>
          <section className="relative w-full max-w-xl border border-white/20 bg-(--fp-charcoal) p-7 shadow-2xl sm:p-10" role="dialog" aria-modal="true" aria-labelledby="retreat-success-title">
            <button type="button" onClick={() => setModalDismissed(true)} className="absolute right-4 top-3 p-2 text-2xl text-white/55 hover:text-white" aria-label="Close">×</button>
            <p className="eyebrow text-(--fp-hot-pink)">Enquiry received</p>
            <h2 id="retreat-success-title" className="display mt-4 text-5xl">Cally&rsquo;s got it.</h2>
            <p className="mt-6 leading-7 text-white/70">Your interest has been received. I&rsquo;ll be in touch about availability and the details.</p>
          </section>
        </div>
      )}
      {!enquiryState.success && continuation}
    </>
  );
}
