import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import Link from "next/link";
import { Eye } from 'lucide-react';
import { fetchAllUserCompany } from "@/services/UserAPI";

const UserList = async ({token}: {
  token: string
}): Promise<React.JSX.Element> => {
  const userList = await fetchAllUserCompany(token)

  console.log(userList)

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>No</TableHead>
          <TableHead>#</TableHead>
          <TableHead>Full Name</TableHead>
          <TableHead>Address</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Phone Number</TableHead>
          <TableHead>Is Active</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {/* {userList.map((user, index: number) => (
          <TableRow key={index}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>
              <Link href={`./users/${user.id}`}><Eye /></Link>
            </TableCell>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.address}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.phone_number}</TableCell>
            <TableCell>{user.is_active}</TableCell>
          </TableRow>
        ))} */}
      </TableBody>
    </Table>
  );
};

export default UserList;
