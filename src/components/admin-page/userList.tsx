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

const UserList = () => {
  const userList = [
    {
      id: 1,
      name: "Jamal Suemal",
      address: "Jl. menteng No. 12",
      email: "jamalsul12@gmail.com",
      phone_number: "081927189900",
      is_active: "Active",
    },
    {
      id: 2,
      name: "Siti Rahmawati",
      address: "Jl. Melati No. 45",
      email: "sitirahmawati@gmail.com",
      phone_number: "082134567890",
      is_active: "Active",
    },
    {
      id: 3,
      name: "Andi Prasetyo",
      address: "Jl. Diponegoro No. 78",
      email: "andiprasetyo88@gmail.com",
      phone_number: "081345678912",
      is_active: "Inactive",
    },
    {
      id: 4,
      name: "Bunga Lestari",
      address: "Jl. Kenanga No. 5",
      email: "bunga.lestari@gmail.com",
      phone_number: "085612345678",
      is_active: "Active",
    },
  ];

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
        {userList.map((user, index: number) => (
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
        ))}
      </TableBody>
    </Table>
  );
};

export default UserList;
