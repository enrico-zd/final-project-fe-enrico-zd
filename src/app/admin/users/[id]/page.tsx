import NavBread from "@/components/nav-bread";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function UserDetail({
  params,
}: {
  params: { id: number };
}) {
  const { id } = await params;
  console.log(id);

  const prevPath = {
    path: "./",
    name: "User Section",
  };
  return (
    <div>
      <div>
        <NavBread currentPage="Users Detail" prevPath={prevPath} />
      </div>
      <div className="flex flex-row w-full justify-center gap-8 mt-10">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>User Detail</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-row w-[400px] p-2 m-2 pl-0 ml-0 mt-0">
                <h2 className="w-50 font-semibold text-l">NIK:</h2>
                <p>81927182710</p>
              </div>
              <div className="flex flex-row w-[400px] p-2 m-2 pl-0 ml-0">
                <h2 className="w-50 font-semibold text-l">
                  Family Card Number:
                </h2>
                <p>81927182710</p>
              </div>
              <div className="flex flex-row w-[400px] p-2 m-2 pl-0 ml-0">
                <h2 className="w-50 font-semibold text-l">Employee Number:</h2>
                <p>81927182710</p>
              </div>
              <div className="flex flex-row w-[400px] p-2 m-2 pl-0 ml-0">
                <h2 className="w-50 font-semibold text-l">Passport Number:</h2>
                <p>81927182710</p>
              </div>
              <div className="flex flex-row w-[400px] p-2 m-2 pl-0 ml-0">
                <h2 className="w-50 font-semibold text-l">Username:</h2>
                <p>81927182710</p>
              </div>
              <div className="flex flex-row w-[400px] p-2 m-2 pl-0 ml-0">
                <h2 className="w-50 font-semibold text-l">Gender:</h2>
                <p>81927182710</p>
              </div>
              <div className="flex flex-row w-[400px] p-2 m-2 pl-0 ml-0">
                <h2 className="w-50 font-semibold text-l">Address:</h2>
                <p>81927182710</p>
              </div>
              <div className="flex flex-row w-[400px] p-2 m-2 pl-0 ml-0">
                <h2 className="w-50 font-semibold text-l">Phone Number:</h2>
                <p>81927182710</p>
              </div>
              <div className="flex flex-row w-[400px] p-2 m-2 pl-0 ml-0">
                <h2 className="w-50 font-semibold text-l">Date Of Birth:</h2>
                <p>81927182710</p>
              </div>
              <div className="flex flex-row w-[400px] p-2 m-2 pl-0 ml-0">
                <h2 className="w-50 font-semibold text-l">Role:</h2>
                <p>81927182710</p>
              </div>
              <div className="flex flex-row w-[400px] p-2 m-2 pl-0 ml-0">
                <h2 className="w-50 font-semibold text-l">Is Active:</h2>
                <p>81927182710</p>
              </div>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Office Detail</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-row w-[400px] p-2 m-2 pl-0 ml-0 mt-0">
                <h2 className="w-50 font-semibold text-l">Employee Type:</h2>
                <p>81927182710</p>
              </div>
              <div className="flex flex-row w-[400px] p-2 m-2 pl-0 ml-0">
                <h2 className="w-50 font-semibold text-l">User Type:</h2>
                <p>81927182710</p>
              </div>
              <div className="flex flex-row w-[400px] p-2 m-2 pl-0 ml-0">
                <h2 className="w-50 font-semibold text-l">Work Space:</h2>
                <p>81927182710</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
