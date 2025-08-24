export function toISOStringNoMs(date: Date): string {
  return date.toISOString().split(".")[0] + "Z";
}
