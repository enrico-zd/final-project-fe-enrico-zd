
import NavBread from "@/components/nav-bread";
import UserForm from "@/components/admin-page/UserForm";

export default async function UpdateUser({
  params,
}: {
  params: { id: number };
}) {
  const prevPath = {
    path: "/admin/users",
    name: "User Section",
  };

  const { id } = await params;
  return (
    <div>
      <div>
        <NavBread currentPage="Update User" prevPath={prevPath} />
      </div>
      <div>
        <UserForm id={id} modes="edit" />
      </div>
    </div>
  );
}
