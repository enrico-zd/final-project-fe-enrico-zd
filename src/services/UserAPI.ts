import { IUser, IUserCompanyDetail } from "@/types/interface";

export const fetchUser = async (userId: number | undefined): Promise<IUser> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL!}/users/${userId}`
  );

  if (!response.ok) {
    throw new Error("failed to fetch data user");
  }

  return response.json();
};

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
