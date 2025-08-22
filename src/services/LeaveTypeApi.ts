import { ILeaveType } from "@/types/interface";

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