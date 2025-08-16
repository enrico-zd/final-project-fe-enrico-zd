"use client"
import { ILoginInput } from "@/types/interface"
import { SubmitHandler, useForm } from "react-hook-form"

export default function LoginForm() {
    const {register,formState: { errors }, handleSubmit} = useForm<ILoginInput>()
    const onSubmit: SubmitHandler<ILoginInput> = (data) => console.log(data)

    return (
        <div className="rounded-lg shadow-2xl shadow-amber-800 ring-1 ring-amber-700/50 bg-black items-center p-10">
            <div className="w-[320px] text-lg">
                <h1 className="text-center mb-4 text-2xl font-semibold text-amber-600">Login</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
                    <div className="flex flex-col">
                        <label className="text-white font-semibold" htmlFor="company_name">Company Name</label>
                        <input 
                        {...register("company_name", { required: true })} 
                        type="text" 
                        id="company_name" 
                        className="bg-zinc-800 text-white p-1 rounded-sm"
                        placeholder="Enter Company Name"
                        aria-invalid={errors.company_name ? "true" : "false"}
                        />
                        {errors.company_name?.type === "required" && (
                            <p className="text-red-300" role="alert">Company name is required</p>
                        )}
                    </div>
                    
                    <div className="flex flex-col">
                        <label className="text-white font-semibold" htmlFor="username">Username</label>
                        <input 
                        {...register("username", { required: true })} 
                        type="text" 
                        id="username" 
                        className="bg-zinc-800 text-white p-1 rounded-sm"
                        placeholder="Enter Username"
                        aria-invalid={errors.username ? "true" : "false"}
                        />
                        {errors.username?.type === "required" && (
                            <p className="text-red-300" role="alert">Username is required</p>
                        )}
                    </div>
                        
                    <div className="flex flex-col">
                        <label className="text-white font-semibold" htmlFor="password">Password</label>
                        <input 
                        {...register("password", { required: true })} 
                        type="password" 
                        id="password" 
                        className="bg-zinc-800 text-white p-1 rounded-sm"
                        placeholder="Enter Password"
                        aria-invalid={errors.password ? "true" : "false"}
                        />
                        {errors.password?.type === "required" && (
                            <p className="text-red-300" role="alert">Password is required</p>
                        )}
                    </div>
                    
                    <div className="mt-2 py-2 flex justify-center w-full rounded-sm text-white bg-amber-400 hover:bg-amber-500">
                        <input type="submit" value="Login"/>
                    </div>
                </form>
            </div>
        </div>
    )
}