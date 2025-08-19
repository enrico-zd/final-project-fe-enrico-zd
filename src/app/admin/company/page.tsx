"use client";
import CompanyProfile from "@/components/admin-page/companyProfile";
import { fetchCompany } from "@/services/CompanyApi";
import { ICompany, IError } from "@/types/interface";
import { useEffect, useState } from "react";

export default function CompanyAdmin() {
  const [dataCompany, setDataCompany] = useState<ICompany | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<IError | null>(null);

  const loadCompany = async (): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await fetchCompany();
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
    loadCompany();
  }, []);

  return (
    <div>
      <CompanyProfile />
    </div>
  );
}
