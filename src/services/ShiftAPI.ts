import { ICreateUpdateShift, IShift } from "@/types/interface";

export const fetchShift = async (
  accessToken: string | undefined
): Promise<IShift[]> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL!}/shifts`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

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

export const fetchUpdateShift = async (
  shiftId: number | undefined,
  accessToken: string | undefined,
  data: ICreateUpdateShift
): Promise<IShift> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL!}/shifts/${shiftId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    let detail = null;
    try {
      detail = await response.json();
    } catch {}
    const msg =
      detail?.message && Array.isArray(detail.message)
        ? detail.message.join(", ")
        : detail?.message || "Failed to update user";
    throw new Error(`${response.status} ${response.statusText} - ${msg}`);
  }

  return response.json();
};

export const fetchCreateShift = async (
  accessToken: string | undefined,
  data: ICreateUpdateShift
): Promise<IShift> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL!}/shifts/create`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    let detail = null;
    try {
      detail = await response.json();
    } catch {}
    const msg =
      detail?.message && Array.isArray(detail.message)
        ? detail.message.join(", ")
        : detail?.message || "Failed to update user";
    throw new Error(`${response.status} ${response.statusText} - ${msg}`);
  }

  return response.json();
};

export const fetchDeleteShift = async (
  shiftId: number,
  accessToken: string | undefined
): Promise<IShift> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL!}/shifts/${shiftId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    let detail = null;
    try {
      detail = await response.json();
    } catch {}
    const msg =
      detail?.message && Array.isArray(detail.message)
        ? detail.message.join(", ")
        : detail?.message || "Failed to update user";
    throw new Error(`${response.status} ${response.statusText} - ${msg}`);
  }

  return response.json();
};
