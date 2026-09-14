import { CTA, EditorialSection } from "@/components/editorial/primitives";
import { ProductImage } from "@/components/store/product-image";
import { getPublicStoreProducts } from "@/lib/supabase/store";
import type { PublicStoreProduct } from "@/lib/supabase/types";

export const metadata = { title: "The store", description: "A key to the private world." };

function formatProductType(productType: string) {
  return productType.replaceAll("_", " ");
}

function formatPrice(product: PublicStoreProduct) {
  try {
    return new Intl.NumberFormat("en-ZA", {
      style: "currency",
      currency: product.currency,
      currencyDisplay: "symbol",
    }).format(product.price_amount);
  } catch {
    return `${product.currency} ${new Intl.NumberFormat("en-ZA", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(product.price_amount)}`;
  }
}

function StoreMessage({ unavailable = false }: { unavailable?: boolean }) {
  return (
    <section className="px-5 pb-24 sm:px-8">
      <div className="mx-auto max-w-7xl border-y border-white/15 py-16 sm:py-24">
        <p className="eyebrow text-white/45">Behind the curtain</p>
        <p className="display mt-5 max-w-xl text-3xl leading-tight sm:text-5xl">
          {unavailable ? "The store is temporarily unavailable." : "There is nothing on the table just now."}
        </p>
      </div>
    </section>
  );
}

function Product({ product, index }: { product: PublicStoreProduct; index: number }) {
  const productNumber = String(index + 1).padStart(2, "0");
  const reverse = index % 2 === 1;

  return (
    <article className="border-t border-white/15 py-8 last:border-b sm:py-12">
      <div className="grid gap-8 sm:grid-cols-2 sm:items-center sm:gap-12">
        <div className={reverse ? "sm:order-2" : undefined}>
          <ProductImage imagePath={product.image_path} productName={product.name} />
        </div>
        <div className={`py-2 sm:p-8 ${reverse ? "sm:order-1" : ""}`}>
          <p className="eyebrow">
            {productNumber} / {formatProductType(product.product_type)}
          </p>
          <h2 className="display mt-4 text-4xl leading-none sm:text-5xl">{product.name}</h2>
          <p className="mt-5 max-w-md text-xl leading-8 text-white/78">{product.short_description}</p>
          <p className="mt-5 max-w-md text-base leading-7 text-white/55">{product.description}</p>
          <div className="mt-8 flex flex-wrap items-center gap-7">
            <span className="display text-3xl">{formatPrice(product)}</span>
            {product.product_type === "membership" && <CTA href="/inner-sanctum">Discover the key</CTA>}
          </div>
        </div>
      </div>
    </article>
  );
}

export default async function StorePage() {
  const products = await getPublicStoreProducts();

  return (
    <main className="pt-28">
      <EditorialSection eyebrow="The store" title="Some doors are worth having a key for." className="pb-10">
        <p className="mt-6 max-w-md text-lg leading-8 text-white/65">
          Begin with the one thing that changes what you can see.
        </p>
      </EditorialSection>
      {products.status === "unavailable" ? (
        <StoreMessage unavailable />
      ) : products.data.length === 0 ? (
        <StoreMessage />
      ) : (
        <section className="px-5 pb-24 sm:px-8">
          <div className="mx-auto max-w-7xl">
            {products.data.map((product, index) => (
              <Product key={product.id} product={product} index={index} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
