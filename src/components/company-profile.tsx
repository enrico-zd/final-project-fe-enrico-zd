import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { ICompany, IError } from "@/types/interface";
import { fetchCompany } from "@/services/CompanyApi";
export default function CompanyProfile() {
  const { data: session, status } = useSession();

  const [dataCompany, setDataCompany] = useState<ICompany>();
  const [error, setError] = useState<IError | null>(null);

  const loadCompany = async (): Promise<void> => {
    try {
      const token = session?.user.accessToken;
      const data = await fetchCompany(token);
      setDataCompany(data);
    } catch (err) {
      setError({
        message: err instanceof Error ? err.message : "Unknown error occured",
        name: err instanceof Error ? err.name : undefined,
        code: err instanceof Error ? 500 : undefined,
      });
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      loadCompany();
    }
  }, [status]);

  console.log(error);

  return (
    <div className="ml-2">
      <Link href="/admin/dashboard">
        <div className="flex items-center gap-2 px-1 py-1.5 text-left text-xl">
          <Avatar className="h-8 w-8 rounded-lg">
            <AvatarImage src={dataCompany?.image_company} alt="jimin" />
            <AvatarFallback className="rounded-lg">KJ</AvatarFallback>
          </Avatar>
          <p className="font-medium">{dataCompany?.company_name}</p>
        </div>
      </Link>
    </div>
  );
}
