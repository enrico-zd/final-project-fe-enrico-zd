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
          <div>
            <h2>Other Detail</h2>
            <div className="flex flex-row justify-between p-3 m-1">
              <div>
                <p>Phone Number</p>
                <p>Date of Birth</p>
                <p>Gender</p>
                <p>Address</p>
              </div>
              <div>
                <p>{user.phone_number}</p>
                <p>{format(parseISO(user.date_of_birth), "yyyy-MM-dd")}</p>
                <p>{user.gender}</p>
                <p>{user.address}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDetail;
