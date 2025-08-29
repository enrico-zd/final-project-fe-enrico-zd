import { ICompany } from "@/types/interface";

export const fetchCompany = async (
  accessToken: string | undefined
): Promise<ICompany> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL!}/company`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch data company");
  }

  return response.json();
};

export const fetchCompanyById = async (
  companyId: number
): Promise<ICompany> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL!}/company/${companyId}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data company");
  }

  return response.json();
};

export const fetchUpdateCompany = async (
  accessToken: string | undefined,
  data: ICompany
): Promise<ICompany> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL!}/company/update`,
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
