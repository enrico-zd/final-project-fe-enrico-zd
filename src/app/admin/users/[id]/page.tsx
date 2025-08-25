import NavBread from "@/components/nav-bread";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { authOptions } from "@/lib/auth";
import { fetchUserCompanyById } from "@/services/UserAPI";
import { parseISO, format } from "date-fns";
import { getServerSession } from "next-auth";

export default async function UserDetail({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const prevPath = {
    path: "./",
    name: "User Section",
  };

  const { id } = await params;
  const session = await getServerSession(authOptions)
  const data = await fetchUserCompanyById(id, session?.user.accessToken);

  const dateBirth = format(parseISO(data.user.date_of_birth), "yyyy-MM-dd");

  return (
    <div>
      <div>
        <NavBread currentPage="Users Detail" prevPath={prevPath} />
      </div>
      <div className="flex flex-row w-full justify-center gap-8 mt-4">
        <div>
          <Card className="bg-amber-200 ring-1 ring-amber-400 text-amber-800">
            <CardHeader>
              <CardTitle>User Detail</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-row w-[400px] p-2 m-2 pl-0 ml-0 mt-0">
                <h2 className="w-50 font-semibold text-l">NIK:</h2>
                <p>{data.user.nik}</p>
              </div>
              <div className="flex flex-row w-[400px] p-2 m-2 pl-0 ml-0">
                <h2 className="w-50 font-semibold text-l">
                  Family Card Number:
                </h2>
                <p>{data.user.family_card_number}</p>
              </div>
              <div className="flex flex-row w-[400px] p-2 m-2 pl-0 ml-0">
                <h2 className="w-50 font-semibold text-l">Employee Number:</h2>
                <p>{data.user.employment_number}</p>
              </div>
              <div className="flex flex-row w-[400px] p-2 m-2 pl-0 ml-0">
                <h2 className="w-50 font-semibold text-l">Passport Number:</h2>
                <p>{data.user.passport_number}</p>
              </div>
              <div className="flex flex-row w-[400px] p-2 m-2 pl-0 ml-0">
                <h2 className="w-50 font-semibold text-l">Username:</h2>
                <p>{data.user.username}</p>
              </div>
              <div className="flex flex-row w-[400px] p-2 m-2 pl-0 ml-0">
                <h2 className="w-50 font-semibold text-l">Gender:</h2>
                <p>{data.user.gender}</p>
              </div>
              <div className="flex flex-row w-[400px] p-2 m-2 pl-0 ml-0">
                <h2 className="w-50 font-semibold text-l">Address:</h2>
                <p>{data.user.address}</p>
              </div>
              <div className="flex flex-row w-[400px] p-2 m-2 pl-0 ml-0">
                <h2 className="w-50 font-semibold text-l">Phone Number:</h2>
                <p>{data.user.phone_number}</p>
              </div>
              <div className="flex flex-row w-[400px] p-2 m-2 pl-0 ml-0">
                <h2 className="w-50 font-semibold text-l">Date Of Birth:</h2>
                <p>{dateBirth}</p>
              </div>
              <div className="flex flex-row w-[400px] p-2 m-2 pl-0 ml-0">
                <h2 className="w-50 font-semibold text-l">Role:</h2>
                <p>{data.user.role}</p>
              </div>
              <div className="flex flex-row w-[400px] p-2 m-2 pl-0 ml-0">
                <h2 className="w-50 font-semibold text-l">Is Active:</h2>
                <p>{data.user_status}</p>
              </div>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card className="bg-amber-200 ring-1 ring-amber-400 text-amber-800">
            <CardHeader>
              <CardTitle>Office Detail</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-row w-[400px] p-2 m-2 pl-0 ml-0 mt-0">
                <h2 className="w-50 font-semibold text-l">Employee Type:</h2>
                <p>{data.employee_type}</p>
              </div>
              <div className="flex flex-row w-[400px] p-2 m-2 pl-0 ml-0">
                <h2 className="w-50 font-semibold text-l">User Type:</h2>
                <p>{data.user_type}</p>
              </div>
              <div className="flex flex-row w-[400px] p-2 m-2 pl-0 ml-0">
                <h2 className="w-50 font-semibold text-l">Work Space:</h2>
                <p>{data.workspace}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
