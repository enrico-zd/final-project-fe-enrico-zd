import {
  IApprovedLeaveRequest,
  ICreateLeaveRequest,
  ILeaveRequest,
} from "@/types/interface";

export const fetchLeaveRequest = async (
  accessToken: string | undefined
): Promise<ILeaveRequest[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL!}/leave-request`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("failed to fetch data leave request");
  }

  return response.json();
};

export const fetchAllLeaveRequestByUserId = async (
  accessToken: string | undefined
): Promise<ILeaveRequest[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL!}/leave-request/employee`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("failed to fetch data leave request");
  }

  return response.json();
};

export const fetchFilterLeaveRequestByType = async (
  typeId: number | null,
  accessToken: string | undefined
): Promise<ILeaveRequest[]> => {
  const response = await fetch(
    `${process.env
      .NEXT_PUBLIC_API_URL!}/leave-request/filter?leave_type_id=${typeId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("failed to fetch data leave request");
  }

  return response.json();
};

export const fetchCreateLeaveRequest = async (
  accessToken: string | undefined,
  data: ICreateLeaveRequest
): Promise<ILeaveRequest> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL!}/leave-request`,
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

export const fetchApprovedLeaveRequest = async (
  leaveId: number,
  accessToken: string | undefined,
  data: IApprovedLeaveRequest
): Promise<ILeaveRequest> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL!}/leave-request/${leaveId}`,
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
