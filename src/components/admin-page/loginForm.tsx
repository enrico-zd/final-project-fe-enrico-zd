"use client";
import { ILoginInput } from "@/types/interface";
import { getSession, signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ILoginInput>();

  const onSubmit: SubmitHandler<ILoginInput> = async (data) => {
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const result = await signIn("credentials", {
        redirect: false,
        company_name: data.company_name,
        username: data.username,
        password: data.password,
      });

      if (result?.error) {
        setError(result.error);
        setIsLoading(false);
      } else if (result?.ok) {
        setSuccess(`Berhasil Login!`);
        setTimeout(async () => {
          router.refresh();

          const session = await getSession();
          const role = session?.user.role;

          if (role === "ADMIN") {
            router.push("/admin/dashboard");
          } else if (role === "STAFF") {
            router.push("/staff/dashboard");
          } else {
            router.push("/");
          }
        }, 500);
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An error occurred. Please try again.");
      }
      setIsLoading(false);
    }
  };

  return (
    <div className="rounded-lg shadow-2xl shadow-amber-800 ring-1 ring-amber-700/50 bg-black items-center p-10">
      <div className="w-[320px] text-lg">
        <h1 className="text-center mb-4 text-2xl font-semibold text-amber-600">
          Login
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
          {error && (
            <div className="bg-red-900/50 p-4 rounded-md border border-red-500">
              <p className="text-sm text-red-200">{error}</p>
            </div>
          )}

          {success && (
            <div className="bg-green-900/50 p-4 rounded-md border border-green-500">
              <p className="text-sm text-green-200">{success}</p>
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
            <label className="text-white font-semibold" htmlFor="username">
              Username
            </label>
            <input
              {...register("username", { required: true })}
              type="text"
              id="username"
              className="bg-zinc-800 text-white p-1 rounded-sm"
              placeholder="Enter Username"
              aria-invalid={errors.username ? "true" : "false"}
            />
            {errors.username?.type === "required" && (
              <p className="text-red-300" role="alert">
                Username is required
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="text-white font-semibold" htmlFor="password">
              Password
            </label>
            <input
              {...register("password", { required: true })}
              type="password"
              id="password"
              className="bg-zinc-800 text-white p-1 rounded-sm"
              placeholder="Enter Password"
              aria-invalid={errors.password ? "true" : "false"}
            />
            {errors.password?.type === "required" && (
              <p className="text-red-300" role="alert">
                Password is required
              </p>
            )}
          </div>

          <div className="mt-2 py-2 flex justify-center w-full rounded-sm text-white bg-amber-400 hover:bg-amber-500">
            {isLoading ? "Loading..." : <input type="submit" value="Login" />}
          </div>
          <div className="text-white text-md flex flex-col items-center">
            <p>Don&apos;t have register company?</p>
            <Link className="text-blue-400" href={"./register"}>
              register here.
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
