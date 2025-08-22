import { ILeaveRequest } from "@/types/interface";

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