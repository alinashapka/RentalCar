export function formatMileage(mileage, locale = "fr-FR") {
  return new Intl.NumberFormat(locale).format(mileage);
}
