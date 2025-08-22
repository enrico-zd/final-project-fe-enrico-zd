import { IShift } from "@/types/interface";

export const fetchShift = async (
  accessToken: string | undefined
): Promise<IShift[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL!}/shifts`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("failed to fetch data shift");
  }

  return response.json();
};

export const fetchShiftById = async (
  shiftId: number | undefined,
  accessToken: string | undefined
): Promise<IShift> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL!}/shifts/${shiftId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("failed to fetch data shift");
  }

  return response.json();
};