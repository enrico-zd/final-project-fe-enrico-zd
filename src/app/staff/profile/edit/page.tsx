"use client";

import { IUser } from "@/types/interface";
import { ArrowLeft, Calendar, MapPin, Phone, User } from "lucide-react";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";

const gendercoise = "female";

const EditProfile = () => {
  const { register, handleSubmit, watch } = useForm<IUser>({
    defaultValues: { gender: `${gendercoise}` }, // nilai awal
  });
  const selectedGender = watch("gender");

  const onSubmit: SubmitHandler<IUser> = (data) => console.log(data);

  return (
    <div>
      <div className="flex flex-row gap-2 m-2 items-center">
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
                defaultValue={"jimin"}
                {...register("name", { required: true })}
                type="text"
                id="name"
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
                defaultValue={"Jl. Mawar"}
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
                defaultValue={"081728271627"}
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
                defaultValue={"2002-07-25"}
                {...register("date_of_birth", { required: true })}
                type="text"
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
                    selectedGender === "male" ? "bg-amber-100" : "bg-amber-400"
                  }`}
                >
                  <input
                    type="radio"
                    value="male"
                    {...register("gender")}
                    className="hidden"
                  />
                  Male
                </label>

                <label
                  className={`w-[70px] text-center py-2 cursor-pointer ${
                    selectedGender === "female" ? "bg-amber-100" : "bg-amber-400"
                  }`}
                >
                  <input
                    type="radio"
                    value="female"
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
  );
};

export default EditProfile;
