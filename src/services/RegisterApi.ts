import { IRegisterInput, IRegisterResponse } from "@/types/interface";

export const RegisterCompany = async (data: IRegisterInput): Promise<IRegisterResponse> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL!}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to register company");
  }

  return response.json();
};
