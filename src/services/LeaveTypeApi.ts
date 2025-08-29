import { ICreateUpdateLeaveType, ILeaveType } from "@/types/interface";

export const fetchLeaveType = async (
  accessToken: string | undefined
): Promise<ILeaveType[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL!}/leave-type`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("failed to fetch data leave type");
  }

  return response.json();
};

export const fetchLeaveTypeById = async (
  leaveType: number | undefined,
  accessToken: string | undefined
): Promise<ILeaveType> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL!}/leave-type/${leaveType}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("failed to fetch data leave type");
  }

  return response.json();
};

export const fetchCreateLeaveType = async (
  accessToken: string | undefined,
  data: ICreateUpdateLeaveType
): Promise<ILeaveType> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL!}/leave-type/create`,
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

export const fetchUpdateLeaveType = async (
  leaveTypeId: number | undefined,
  accessToken: string | undefined,
  data: ICreateUpdateLeaveType
): Promise<ILeaveType> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL!}/leave-type/${leaveTypeId}`,
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

export const fetchDeleteLeaveType = async (
  leaveTypeId: number | undefined,
  accessToken: string | undefined
): Promise<ILeaveType> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL!}/leave-type/${leaveTypeId}`,
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
