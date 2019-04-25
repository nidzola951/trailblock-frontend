export function isMarketPlaceholder(isMarketPrice, placeholder) {
  if (isMarketPrice) {
    return 'Market';
  }
  return placeholder;
}

export function getValue(isMarketPrice, value) {
  if (isMarketPrice) {
    return '';
  }
  return value;
}
