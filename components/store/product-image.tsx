"use client";

import Image from "next/image";
import { useState } from "react";

function ProductImageFallback() {
  return (
    <div
      aria-hidden="true"
      className="noise relative aspect-square overflow-hidden bg-linear-to-br from-(--fp-silver) via-(--fp-charcoal) to-(--fp-black)"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_24%,rgba(245,210,187,.34),transparent_22%),linear-gradient(145deg,transparent_35%,rgba(0,0,0,.5))]" />
    </div>
  );
}

export function ProductImage({ imagePath, productName }: { imagePath: string | null; productName: string }) {
  const [failed, setFailed] = useState(false);
  const validPath = imagePath?.trim().startsWith("/assets/") ? imagePath.trim() : null;

  if (!validPath || failed) return <ProductImageFallback />;

  return (
    <div className="relative aspect-square overflow-hidden bg-(--fp-charcoal)">
      <Image
        src={validPath}
        alt={productName}
        fill
        sizes="(max-width: 640px) 100vw, 50vw"
        className="object-cover"
        onError={() => setFailed(true)}
      />
    </div>
  );
}
