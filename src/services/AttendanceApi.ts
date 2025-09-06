import { IAttendance, ICheckIn, ICheckOut } from "@/types/interface";

export const fetchAttendanceCompany = async (
  companyId: number | undefined,
  accessToken: string | undefined
): Promise<IAttendance[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL!}/attendance?company_id=${companyId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data Attendance");
  }

  return response.json();
};

export const fetchAllUserAttendanceById = async (
  userId: number | undefined,
  accessToken: string | undefined
): Promise<IAttendance[]> => {
  const response = await fetch(
    `${process.env
      .NEXT_PUBLIC_API_URL!}/attendance/employee/?user_id=${userId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data Attendance");
  }

  return response.json();
};

export const fetchAllUserAttendanceHistory = async (
  accessToken: string | undefined
): Promise<IAttendance[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL!}/attendance/history`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to get Attendance History");
  }

  return response.json();
};

export const fetchUserAttendanceToday = async (
  accessToken: string | undefined
): Promise<IAttendance> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL!}/attendance/employee/absent`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data Attendance");
  }

  return response.json();
};

export const fetchCheckIn = async (
  userId: number | undefined,
  data: ICheckIn,
  accessToken: string | undefined
): Promise<IAttendance> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL!}/attendance/checkin/${userId}`,
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
        : detail?.message || "Failed to Check In";
    throw new Error(`${response.status} ${response.statusText} - ${msg}`);
  }

  return response.json();
};

export const fetchCheckOut = async (
  userId: number | undefined,
  data: ICheckOut,
  accessToken: string | undefined
): Promise<IAttendance> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL!}/attendance/checkout/${userId}`,
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
        : detail?.message || "Failed to Check Out";
    throw new Error(`${response.status} ${response.statusText} - ${msg}`);
  }

  return response.json();
};

export const fetchResetAttendance = async (
  AttendanceId: number | undefined,
  accessToken: string | undefined
): Promise<IAttendance> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL!}/attendance/reset/${AttendanceId}`,
    {
      method: "PATCH",
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
        : detail?.message || "Failed to reset attendance";
    throw new Error(`${response.status} ${response.statusText} - ${msg}`);
  }

  return response.json();
};
