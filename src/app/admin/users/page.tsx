"use client";

import NavBread from "@/components/nav-bread";
import UserList from "@/components/admin-page/userList";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { IError, IUserCompanyDetail } from "@/types/interface";
import { fetchAllUserCompany } from "@/services/UserAPI";

export default function Users() {
  const { data: session } = useSession();
  const accessToken = session?.user.accessToken;

  const [dataUser, setDataUser] = useState<IUserCompanyDetail[]>([]);
  const [error, setError] = useState<IError | null>(null);

  const loadProduct = async (): Promise<void> => {
    try {
      setError(null);
      const data = await fetchAllUserCompany(accessToken);
      setDataUser(data);
    } catch (err) {
      setError({
        message: err instanceof Error ? err.message : "Unknown error occured",
        name: err instanceof Error ? err.name : undefined,
        code: err instanceof Error ? 500 : undefined,
      });
    } 
  };

  useEffect(() => {
    loadProduct();
  }, []);

  console.log(error)
  console.log(dataUser)

  return (
    <div>
      <div>
        <NavBread currentPage="Users List" />
      </div>
      <div>
        <div>
          <Link href="./users/create">Create</Link>
        </div>
        <div>
          <Link href="./users/update">Update</Link>
        </div>
        {/* <UserList token={accessToken} /> */}
      </div>
    </div>
  );
}
