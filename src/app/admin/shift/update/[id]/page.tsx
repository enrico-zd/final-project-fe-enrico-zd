import NavBread from "@/components/nav-bread";
import ShiftFormUpdate from "@/components/admin-page/shiftFormUpdate";

export default async function UpdateShift({ params }: { params: { id: number } }) {
  const prevPath = {
    path: "/admin/shift",
    name: "Shift Section",
  };
  

  const shiftId = await params
  return (
    <div>
      <div>
        <NavBread currentPage="Update Shift" prevPath={prevPath} />
      </div>
      <div>
        <ShiftFormUpdate id={shiftId.id} modes="update"/>
      </div>
    </div>
  );
}
