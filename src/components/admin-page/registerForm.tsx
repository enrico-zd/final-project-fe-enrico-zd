"use client";
import { RegisterCompany } from "@/services/RegisterApi";
import { IError, IRegisterInput } from "@/types/interface";
import Link from "next/link";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export default function RegisterForm() {
  const [error, setError] = useState<IError | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IRegisterInput>();

  const onSubmit: SubmitHandler<IRegisterInput> = async (data) => {
    console.log(data);
    setIsLoading(true);
    setError(null);

    try {
      await RegisterCompany(data);
    } catch (err) {
      setError({
        message: err instanceof Error ? err.message : "Unknown error occured",
        name: err instanceof Error ? err.name : undefined,
        code: err instanceof Error ? 500 : undefined,
      });
    } finally {
      setIsLoading(false);
      setSuccess(true)
    }
  };

  return (
    <div className="rounded-lg shadow-2xl shadow-amber-800 ring-1 ring-amber-700/50 bg-black items-center p-10">
      <div className="w-[320px] text-lg">
        <h1 className="text-center mb-4 text-2xl font-semibold text-amber-600">
          Form Registration
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
          {error && (
            <div className="bg-red-900/50 p-4 rounded-md border border-red-500">
              <p className="text-sm text-red-200">{error.message}</p>
              <p className="text-sm text-red-200">{error.name}</p>
              <p className="text-sm text-red-200">{error.code}</p>
            </div>
          )}
          {success && (
            <div className="bg-green-900/80 p-4 rounded-md border border-green-500">
              <p className="text-md text-green-300">
                Successfuly Register Company
              </p>
              <p className="text-sm text-green-300">Username: admin123</p>
              <p className="text-sm text-green-300">Password: admin2025</p>
              <p className="text-sm mt-1 text-red-300">
                *Credentials above are your default login details
              </p>
            </div>
          )}

          <div className="flex flex-col">
            <label className="text-white font-semibold" htmlFor="company_name">
              Company Name
            </label>
            <input
              {...register("company_name", { required: true })}
              type="text"
              id="company_name"
              className="bg-zinc-800 text-white p-1 rounded-sm"
              placeholder="Enter Company Name"
              aria-invalid={errors.company_name ? "true" : "false"}
            />
            {errors.company_name?.type === "required" && (
              <p className="text-red-300" role="alert">
                Company name is required
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="text-white font-semibold" htmlFor="full_name">
              Full Name
            </label>
            <input
              {...register("full_name", { required: true })}
              type="text"
              id="full_name"
              className="bg-zinc-800 text-white p-1 rounded-sm"
              placeholder="Enter Full Name"
              aria-invalid={errors.full_name ? "true" : "false"}
            />
            {errors.full_name?.type === "required" && (
              <p className="text-red-300" role="alert">
                Full name is required
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="text-white font-semibold" htmlFor="address">
              Address
            </label>
            <input
              {...register("address", { required: true })}
              type="text"
              id="address"
              className="bg-zinc-800 text-white p-1 rounded-sm"
              placeholder="Enter Address"
              aria-invalid={errors.address ? "true" : "false"}
            />
            {errors.address?.type === "required" && (
              <p className="text-red-300" role="alert">
                Full name is required
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="text-white font-semibold" htmlFor="email">
              Email
            </label>
            <input
              {...register("email", {
                required: true,
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email",
                },
              })}
              type="text"
              id="email"
              className="bg-zinc-800 text-white p-1 rounded-sm"
              placeholder="Enter Email"
              aria-invalid={errors.email ? "true" : "false"}
            />
            {errors.email?.type === "required" && (
              <p className="text-red-300" role="alert">
                Email is required
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="text-white font-semibold" htmlFor="phone_number">
              Phone Number
            </label>
            <input
              {...register("phone_number", {
                required: true,
                minLength: { value: 8, message: "Min 8 digits" },
              })}
              type="tel"
              id="phone_number"
              className="bg-zinc-800 text-white p-1 rounded-sm"
              placeholder="Enter Phone Number"
              aria-invalid={errors.phone_number ? "true" : "false"}
            />
            {errors.phone_number?.type === "required" && (
              <p className="text-red-300" role="alert">
                Phone number is required
              </p>
            )}
          </div>

          <div className="mt-2 py-2 flex justify-center w-full rounded-sm text-white bg-amber-400 hover:bg-amber-500">
            {isLoading ? (
              "Loading..."
            ) : (
              <input type="submit" value="Register" />
            )}
          </div>

          <div className="text-white text-md flex flex-row justify-center gap-2">
            <p>Have registered company? </p>
            <Link className="text-blue-400" href={"./login"}>Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
