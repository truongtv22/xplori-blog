export default function parseNumber(value) {
  const num = value * 1;
  return Number.isFinite(num) ? num : 0;
}
