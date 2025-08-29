import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import Link from "next/link";
import { Delete, Eye, SquarePen } from "lucide-react";
import { fetchAllUserCompany, fetchDeleteUser } from "@/services/UserAPI";
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
  const [success, setSuccess] = useState<string>("");
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

  const handleDelete = async (userId: number) => {
    setIsLoading(false);
    setError(null);
    setSuccess("");
    try {
      await fetchDeleteUser(userId, token);
      const data = await fetchAllUserCompany(token);
      setDataUsers(data);
      setSuccess("Berhasil Hapus User");
    } catch (err) {
      setError({
        message: err instanceof Error ? err.message : "Unknown error occured",
        name: err instanceof Error ? err.name : undefined,
        code: err instanceof Error ? 500 : undefined,
      });
    } finally {
      setTimeout(() => {
        setSuccess("");
      }, 1000);
    }
  };

  return (
    <div className="px-2">
      {success && <h1>{success}</h1>}
      {error && <h1>{error.message}</h1>}
      {isLoading ? (
        <h1>loading</h1>
      ) : (
        <Table className="[&_th]:text-center [&_th]:text-white text-center rounded-xl overflow-hidden">
          <TableHeader className="bg-amber-400">
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
          <TableBody className="bg-amber-100">
            {dataUsers.map((user, index: number) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell className="flex justify-center">
                  <Link href={`./users/${user.user_company_id}`}>
                    <Eye />
                  </Link>
                </TableCell>
                <TableCell>{user.user.name}</TableCell>
                <TableCell>{user.user.address}</TableCell>
                <TableCell>{user.user.email}</TableCell>
                <TableCell>{user.user.phone_number}</TableCell>
                <TableCell>{user.user_status}</TableCell>
                <TableCell className="flex justify-center gap-2 items-center">
                  <Link href={`./users/update/${user.user_company_id}`}>
                    <SquarePen />
                  </Link>
                  <div>
                    <button
                      onClick={() => {
                        if (confirm("Yakin untuk hapus user ini?")) {
                          handleDelete(user.user_id);
                        }
                      }}
                    >
                      <Delete className="text-red-500" />
                    </button>
                  </div>
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
