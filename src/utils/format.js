// Shared money + WhatsApp helpers so every component formats the same way

export function formatPrice(price, currency = "NGN") {
  if (price === null || price === undefined || price === "") return null;

  const amount = Number(price);
  if (Number.isNaN(amount)) return null;

  try {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency,
      currencyDisplay: "narrowSymbol", // ₦18,500 instead of NGN 18,500
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return amount.toLocaleString();
  }
}

export function cleanPhone(number) {
  return String(number || "").replace(/\D/g, "");
}

export function buildWhatsAppLink(number, message) {
  const phone = cleanPhone(number);
  if (!phone) return null;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function getImages(item) {
  if (!item) return [];
  if (item.media_urls && item.media_urls.length > 0) return item.media_urls.slice(0, 4);
  if (item.media_url) return [item.media_url];
  return [];
}