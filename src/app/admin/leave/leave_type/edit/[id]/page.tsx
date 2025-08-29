import NavBread from "@/components/nav-bread";
import LeaveTypeForm from "@/components/admin-page/leaveTypeForm";

export default async function EditLeaveType({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const prevPath = {
    path: "/admin/leave/leave_type",
    name: "Leave Type Section",
  };
  const { id } = await params;
  return (
    <div>
      <div>
        <NavBread currentPage="Edit Leave Type" prevPath={prevPath} />
      </div>
      <div>
        <LeaveTypeForm id={id} />
      </div>
    </div>
  );
}
