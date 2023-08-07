export function capitalizeString(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function toUpperCaseString(str) {
  return str.toUpperCase();
}

export function formatCurrency(value) {
  const formatter = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return formatter.format(value);
}
