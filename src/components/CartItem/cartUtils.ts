export function defaultFormatPrice(amount: number): string {
  return `¥${amount.toLocaleString("ja-JP")}`;
}
