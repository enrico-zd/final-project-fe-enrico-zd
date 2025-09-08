"use client";
import ChartEmployeeSumarry from "@/components/chart-employee-sumarry";
import NavBread from "@/components/nav-bread";
import SectionCard from "@/components/section-card";
import { ageInYears, parseDobDF } from "@/lib/birthCount";
import { fetchAllUserCompany } from "@/services/UserAPI";
import { IError, IUserCompanyDetail } from "@/types/interface";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function DashboardAdmin() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [userData, setUserData] = useState<IUserCompanyDetail[]>();
  const [error, setError] = useState<IError | null>(null);

  useEffect(() => {
    if (status === "authenticated" && session?.user?.role === "STAFF") {
      router.replace("/staff/dashboard");
      return;
    }
  }, [session, status, router]);

  useEffect(() => {
    if (status !== "authenticated" || !session?.user.accessToken) return;

    let cancelled = false;
    (async () => {
      try {
        setError(null);
        const user = await fetchAllUserCompany(session.user.accessToken);
        if (!cancelled) setUserData(user);
      } catch (err) {
        if (!cancelled) {
          setError({
            message:
              err instanceof Error ? err.message : "Unknown error occured",
            name: err instanceof Error ? err.name : undefined,
            code: err instanceof Error ? 500 : undefined,
          });
        }
      } 
    })();

    return () => {
      cancelled = true; // mencegah setState setelah unmount
    };
  }, [status, session?.user.accessToken]);

  // count gender
  const male = userData?.filter((u) => u.user.gender === "MALE").length;
  const female = userData?.filter((u) => u.user.gender === "FEMALE").length;

  // count employee type
  const contract = userData?.filter(
    (u) => u.employee_type === "CONTRACT"
  ).length;
  const permanent = userData?.filter(
    (u) => u.employee_type === "PERMANENT"
  ).length;
  const temporary = userData?.filter(
    (u) => u.employee_type === "TEMPORARY"
  ).length;

  // count employee age
  const ages = userData?.map((u) => ({
    user_id: u.user_id,
    age: ageInYears(parseDobDF(u.user.date_of_birth)),
  }));

  const ageCounts = ages?.reduce<Record<number, number>>((acc, { age }) => {
    acc[age] = (acc[age] ?? 0) + 1;
    return acc;
  }, {});

  // set alert for error
  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  });

  if (!ageCounts) return;

  const dataAgeArr = Object.entries(ageCounts)
    .map(([age, count]) => ({ age: Number(age), count }))
    .sort((a, b) => a.age - b.age);

  return (
    <div className="flex flex-col items-center gap-4 justify-center">
      <div className="self-start">
        <NavBread currentPage="#" />
        <h1 className="text-4xl text-amber-700 ml-6">Dashboard</h1>
      </div>
      <div>
        <SectionCard
          totalUser={userData?.length}
          userId={session?.user.user_id}
          token={session?.user.accessToken}
          statusAuth={status}
        />
      </div>
      <div>
        <ChartEmployeeSumarry
          totalMale={male}
          totalFemale={female}
          totalContract={contract}
          totalPermanent={permanent}
          totalTemporary={temporary}
          totalAges={dataAgeArr}
        />
      </div>
    </div>
  );
}
