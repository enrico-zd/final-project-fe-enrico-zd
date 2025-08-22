import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import Link from "next/link";
import { Eye, SquarePen } from "lucide-react";
import { fetchAllUserCompany } from "@/services/UserAPI";
import { IError, IUserCompanyDetail } from "@/types/interface";
import { useEffect, useState } from "react";

const UserList = ({
  token,
  statusAuth,
}: {
  token: string | undefined;
  statusAuth: string;
}) => {
  const [dataUsers, setDataUsers] = useState<IUserCompanyDetail[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<IError | null>(null);

  useEffect(() => {
    if (statusAuth !== "authenticated" || !token) return;

    let cancelled = false;

    (async () => {
      try {
        setIsLoading(true);
        setError(null);

        const data = await fetchAllUserCompany(token);

        if (!cancelled) {
          setDataUsers(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError({
            message:
              err instanceof Error ? err.message : "Unknown error occured",
            name: err instanceof Error ? err.name : undefined,
            code: err instanceof Error ? 500 : undefined,
          });
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [statusAuth, token]);

  console.log(error);

  return (
    <div>
      {isLoading ? (
        <h1>loading</h1>
      ) : (
        <Table className="[&_th]:text-center text-center">
          <TableHeader>
            <TableRow>
              <TableHead>No</TableHead>
              <TableHead>#</TableHead>
              <TableHead>Full Name</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone Number</TableHead>
              <TableHead>Is Active</TableHead>
              <TableHead>Edit</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dataUsers.map((user, index: number) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell className="flex justify-center">
                  <Link href={`./users/${user.user_id}`}>
                    <Eye />
                  </Link>
                </TableCell>
                <TableCell>{user.user.name}</TableCell>
                <TableCell>{user.user.address}</TableCell>
                <TableCell>{user.user.email}</TableCell>
                <TableCell>{user.user.phone_number}</TableCell>
                <TableCell>{user.user_status}</TableCell>
                <TableCell className="flex justify-center">
                  <Link href={`./users/update/${user.user_id}`}>
                    <SquarePen />
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default UserList;
