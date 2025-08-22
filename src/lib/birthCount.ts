import { parseISO, parse } from "date-fns";

export function parseDobDF(d: string) {
  return d.includes("T")
    ? parseISO(d) // ISO / punya Z
    : parse(d, "yyyy-MM-dd", new Date()); // tanggal polos
}

export function ageInYears(dob: Date, now = new Date()) {
  let age = now.getFullYear() - dob.getFullYear();
  const hasHadBirthdayThisYear =
    now.getMonth() > dob.getMonth() ||
    (now.getMonth() === dob.getMonth() && now.getDate() >= dob.getDate());
  if (!hasHadBirthdayThisYear) age--;
  return age;
}