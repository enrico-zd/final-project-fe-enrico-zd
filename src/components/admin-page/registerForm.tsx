"use client"
import { IRegisterInput } from "@/types/interface"
import { SubmitHandler, useForm } from "react-hook-form"

export default function RegisterForm() {
    const {register,formState: { errors }, handleSubmit} = useForm<IRegisterInput>()
    const onSubmit: SubmitHandler<IRegisterInput> = (data) => console.log(data)

    return (
        <div className="rounded-lg shadow-2xl shadow-amber-800 ring-1 ring-amber-700/50 bg-black items-center p-10">
            <div className="w-[320px] text-lg">
                <h1 className="text-center mb-4 text-2xl font-semibold text-amber-600">Form Registration</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
                    <div className="flex flex-col">
                        <label className="text-white font-semibold" htmlFor="full_name">Full Name</label>
                        <input 
                        {...register("full_name", { required: true })} 
                        type="text" 
                        id="full_name" 
                        className="bg-zinc-800 text-white p-1 rounded-sm"
                        placeholder="Enter Full Name"
                        aria-invalid={errors.full_name ? "true" : "false"}
                        />
                        {errors.full_name?.type === "required" && (
                            <p className="text-red-300" role="alert">Full name is required</p>
                        )}
                    </div>

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
                        <label className="text-white font-semibold" htmlFor="email">Email</label>
                        <input 
                        {...register("email", { required: true })} 
                        type="text" 
                        id="email" 
                        className="bg-zinc-800 text-white p-1 rounded-sm"
                        placeholder="Enter Email"
                        aria-invalid={errors.email ? "true" : "false"}
                        />
                        {errors.email?.type === "required" && (
                            <p className="text-red-300" role="alert">Email is required</p>
                        )}
                    </div>
                        
                    <div className="flex flex-col">
                        <label className="text-white font-semibold" htmlFor="phone_number">Phone Number</label>
                        <input 
                        {...register("phone_number", { required: true })} 
                        type="phone_number" 
                        id="phone_number" 
                        className="bg-zinc-800 text-white p-1 rounded-sm"
                        placeholder="Enter Phone Number"
                        aria-invalid={errors.phone_number ? "true" : "false"}
                        />
                        {errors.phone_number?.type === "required" && (
                            <p className="text-red-300" role="alert">Phone number is required</p>
                        )}
                    </div>
                    
                    <div className="mt-2 py-2 flex justify-center w-full rounded-sm text-white bg-amber-400 hover:bg-amber-500">
                        <input type="submit" value="Register"/>
                    </div>
                </form>
            </div>
        </div>
    )
}