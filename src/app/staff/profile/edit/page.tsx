"use client";

import { fetchUser } from "@/services/UserAPI";
import { IError, IUser } from "@/types/interface";
import { format, parseISO } from "date-fns";
import { ArrowLeft, Calendar, MapPin, Phone, User } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const EditProfile = () => {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<IUser>();
  const [error, setError] = useState<IError | null>(null);

  // fetch User
  useEffect(() => {
    if (status !== "authenticated" || !session?.user.accessToken) return;

    let cancelled = false;
    (async () => {
      try {
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
      } 
    })();

    return () => {
      cancelled = true; // mencegah setState setelah unmount
    };
  }, [status, session?.user.accessToken, session?.user.user_id]);

  // useForm
  const { register, handleSubmit, watch, reset } = useForm<IUser>();

  useEffect(() => {
    if (user) {
      reset({
        username: user.username,
        address: user.address,
        phone_number: user.phone_number,
        date_of_birth: format(parseISO(user.date_of_birth), "yyyy-MM-dd"),
        gender: user.gender,
      });
    }
  }, [user, reset]);
  const selectedGender = watch("gender");

  const onSubmit: SubmitHandler<IUser> = (data) => console.log(data);

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
      <div className="w-[375px] h-screen shadow shadow-amber-200 bg-amber-100">
        <div className="flex flex-row gap-2 p-2 items-center">
          <div>
            <Link href={"./"}>
              <ArrowLeft />
            </Link>
          </div>
          <div>
            <h1 className="text-xl font-semibold">Edit Profile</h1>
          </div>
        </div>
        <div className="flex flex-col items-center gap-4">
          <div className="bg-amber-200 w-[96%] px-6 py-4 h-full rounded-sm">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="relative py-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 opacity-80">
                  <User />
                </span>
                <input
                  {...register("username", { required: true })}
                  type="text"
                  id="username"
                  className="
                w-full pl-12 pr-3 py-2 rounded-md rounded-bl-none rounded-tr-none bg-amber-50
                outline-none ring-0 focus:ring-2 focus:ring-amber-400
                border border-amber-600
                "
                />
              </div>
              <div className="relative py-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 opacity-80">
                  <MapPin />
                </span>
                <input
                  {...register("address", { required: true })}
                  type="text"
                  id="address"
                  className="
                w-full pl-12 pr-3 py-2 rounded-md rounded-bl-none rounded-tr-none bg-amber-50
                outline-none ring-0 focus:ring-2 focus:ring-amber-400
                border border-amber-600
                "
                />
              </div>
              <div className="relative py-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 opacity-80">
                  <Phone />
                </span>
                <input
                  {...register("phone_number", { required: true })}
                  type="text"
                  id="phone_number"
                  className="
                w-full pl-12 pr-3 py-2 rounded-md rounded-bl-none rounded-tr-none bg-amber-50
                outline-none ring-0 focus:ring-2 focus:ring-amber-400
                border border-amber-600
                "
                />
              </div>
              <div className="relative py-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 opacity-80">
                  <Calendar />
                </span>
                <input
                  {...register("date_of_birth", { required: true })}
                  type="date"
                  id="date_of_birth"
                  className="
                w-full pl-12 pr-3 py-2 rounded-md rounded-bl-none rounded-tr-none bg-amber-50
                outline-none ring-0 focus:ring-2 focus:ring-amber-400
                border border-amber-600
                "
                />
              </div>

              <div className="mt-2">
                <label className="mb-2 font-semibold">Gender</label>
                <div className="flex border ring-0 ring-amber-200 border-amber-100 rounded overflow-hidden w-max">
                  <label
                    className={`w-[70px] text-center py-2 cursor-pointer ${
                      selectedGender === "MALE"
                        ? "bg-amber-100"
                        : "bg-amber-400"
                    }`}
                  >
                    <input
                      type="radio"
                      value="MALE"
                      {...register("gender")}
                      className="hidden"
                    />
                    Male
                  </label>

                  <label
                    className={`w-[70px] text-center py-2 cursor-pointer ${
                      selectedGender === "FEMALE"
                        ? "bg-amber-100"
                        : "bg-amber-400"
                    }`}
                  >
                    <input
                      type="radio"
                      value="FEMALE"
                      {...register("gender")}
                      className="hidden"
                    />
                    Female
                  </label>
                </div>
              </div>

              <div className="mt-6 py-2 col-span-2 justify-self-center flex justify-center w-[200px] rounded-sm text-white bg-amber-400 hover:bg-amber-500">
                <input type="submit" value={`Update Profile`} />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
