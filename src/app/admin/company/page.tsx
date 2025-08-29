import CompanyProfile from "@/components/admin-page/companyProfile";
import { authOptions } from "@/lib/auth";
import { fetchCompany } from "@/services/CompanyApi";
import { getServerSession } from "next-auth";

export default async function CompanyAdmin() {
  const session = await getServerSession(authOptions);
  const dataCompany = await fetchCompany(session?.user.accessToken);

  return (
    <div>
      <CompanyProfile
        companyData={dataCompany}
        accessToken={session?.user.accessToken}
      />
    </div>
  );
}
