"use client";
import CompanyProfile from "@/components/admin-page/companyProfile";
import { fetchCompany } from "@/services/CompanyApi";
import { ICompany, IError } from "@/types/interface";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function CompanyAdmin() {
  const { data: session, status } = useSession();
  const [dataCompany, setDataCompany] = useState<ICompany | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<IError | null>(null);

  const loadCompany = async (): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await fetchCompany(session?.user.accessToken);
      setDataCompany(data);
    } catch (err) {
      setError({
        message: err instanceof Error ? err.message : "Unknown error occured",
        name: err instanceof Error ? err.name : undefined,
        code: err instanceof Error ? 500 : undefined,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      loadCompany();
    }
  }, [status]);

  return (
    <div>
      <CompanyProfile companyData={dataCompany} />
    </div>
  );
}
