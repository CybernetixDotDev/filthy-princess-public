const defaultPrices = {
  membership: 1500,
  retreat: 12500,
} as const;

type PriceKey = keyof typeof defaultPrices;

function readPrice(key: PriceKey): number {
  const environmentKey = `FILTHY_PRINCESS_${key.toUpperCase()}_PRICE_ZAR`;
  const configuredValue = process.env[environmentKey];

  if (configuredValue === undefined || configuredValue.trim() === "") {
    return defaultPrices[key];
  }

  const price = Number(configuredValue);
  if (!Number.isFinite(price) || price < 0) {
    throw new Error(`${environmentKey} must be a non-negative number.`);
  }

  return price;
}

export const prices = {
  membership: readPrice("membership"),
  retreat: readPrice("retreat"),
};

export function formatPrice(price: number): string {
  return `R ${new Intl.NumberFormat("en-ZA", { maximumFractionDigits: 0 }).format(price)}`;
}
