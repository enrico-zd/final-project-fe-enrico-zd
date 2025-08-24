import { IUpdateUser, IUser, IUserCompanyDetail } from "@/types/interface";

// === user ===
export const fetchUser = async (userId: number | undefined): Promise<IUser> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL!}/users/${userId}`
  );

  if (!response.ok) {
    throw new Error("failed to fetch data user");
  }

  return response.json();
};

export const fetchUpdateUser = async (
  userId: number | undefined,
  data: IUpdateUser
): Promise<IUser> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL!}/users/${userId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
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

// === user company detail ===
export const fetchUserCompanyById = async (
  id: number | undefined,
  accessToken: string | undefined
): Promise<IUserCompanyDetail> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL!}/user-company-detail/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("failed to fetch data user");
  }

  return response.json();
};

export const fetchAllUserCompany = async (
  accessToken: string | undefined
): Promise<IUserCompanyDetail[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL!}/user-company-detail`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("failed to fetch data user");
  }

  return response.json();
};
