export const TimeFormat = (dateTime: string) => {
  const date = new Date(dateTime)
  const hh = String(date.getUTCHours()).padStart(2, "0");
  const mm = String(date.getUTCMinutes()).padStart(2, "0");

  const result = `${hh}:${mm}`
  return result
};
