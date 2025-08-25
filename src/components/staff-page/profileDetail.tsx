import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useEffect, useState } from "react";
import { IError, IUser } from "@/types/interface";
import { fetchUser } from "@/services/UserAPI";
import { format, parseISO } from "date-fns";

const ProfileDetail = () => {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<IUser>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<IError | null>(null);

  // fetch User
  useEffect(() => {
    if (status !== "authenticated" || !session?.user.accessToken) return;

    let cancelled = false;
    (async () => {
      try {
        setIsLoading(true);
        setError(null);
        const user = await fetchUser(session.user.user_id);
        if (!cancelled) setUser(user);
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
      cancelled = true; // mencegah setState setelah unmount
    };
  }, [status, session?.user.accessToken, session?.user.user_id]);

  if (!user) return;

  return (
    <div>
      {error && (
        <div>
          <p>{error.message}</p>
          <p>{error.name}</p>
          <p>{error.code}</p>
        </div>
      )}
      {isLoading ? (
        <div>
          <h1>Loading...</h1>
        </div>
      ) : (
        <div>
          <div className="flex flex-col items-center">
            <div>
              <Avatar className="h-20 w-20 rounded-lg">
                <AvatarImage src={user.avatar} />
                <AvatarFallback className="rounded-lg">KJ</AvatarFallback>
              </Avatar>
            </div>
            <p>{user.name}</p>
            <p>{user.username}</p>
            <p>{user.email}</p>
          </div>
          <div className="px-2 pt-4">
            <h2 className="pl-1 text-xl font-semibold">Other Detail</h2>
            <div className="flex flex-row justify-between p-3 m-1 bg-amber-200 shadow-lg rounded-lg font-semibold">
              <div>
                <p className="py-1">Phone Number</p>
                <p className="py-1">Date of Birth</p>
                <p className="py-1">Gender</p>
                <p className="py-1">Address</p>
              </div>
              <div>
                <p className="py-1">{user.phone_number}</p>
                <p className="py-1">
                  {format(parseISO(user.date_of_birth), "yyyy-MM-dd")}
                </p>
                <p className="py-1">{user.gender}</p>
                <p className="py-1">{user.address}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDetail;
