import NavBread from "@/components/nav-bread";
import ShiftList from "@/components/admin-page/shiftList";
import Link from "next/link";

export default function Shift() {
  return (
    <div>
      <div>
        <NavBread currentPage="Shifts List" />
      </div>
      <div>
        <div>
          <Link href="./shift/create">Create</Link>
        </div>
        <div>
          <Link href="./shift/update">Update</Link>
        </div>
        <ShiftList />
      </div>
    </div>
  );
}
