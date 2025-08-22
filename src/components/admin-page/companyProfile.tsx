"use client";
import NavBread from "@/components/nav-bread"
import { ICompany, StatusActive } from "@/types/interface"
import { SubmitHandler, useForm } from "react-hook-form"

export default function CompanyProfile({
  companyData
}: {
  companyData: ICompany | null;
}) {
  const { register, handleSubmit } = useForm<ICompany>();
  const onSubmit: SubmitHandler<ICompany> = (data) => console.log(data);

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  console.log(companyData?.company_name)
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="self-start">
        <NavBread currentPage="Company Profile" />
      </div>
      <div className="bg-amber-200 w-[96%] px-6 py-4 h-full rounded-sm">
        <h1 className="text-4xl text-amber-800">Company Profile</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-3 mt-4"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="company_name" className="text-amber-800 text-xl">
              Company Name
            </label>
            <input
              {...register("company_name", { required: true })}
              type="text"
              id="company_name"
              defaultValue={companyData?.company_name}
              className="bg-amber-50 p-1 rounded-sm"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="company_owner" className="text-amber-800 text-xl">
              Company Owner
            </label>
            <input
              {...register("company_owner", { required: true })}
              type="text"
              id="company_owner"
              defaultValue={companyData?.company_owner}
              className="bg-amber-50 p-1 rounded-sm"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="address" className="text-amber-800 text-xl">
              Address
            </label>
            <input
              {...register("company_address", { required: true })}
              type="text"
              id="address"
              defaultValue={companyData?.company_address}
              className="bg-amber-50 p-1 rounded-sm"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-amber-800 text-xl">
              Email Address
            </label>
            <input
              {...register("company_email", { required: true })}
              type="email"
              id="email"
              defaultValue={companyData?.company_email}
              className="bg-amber-50 p-1 rounded-sm"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="phone_number" className="text-amber-800 text-xl">
              Phone Number
            </label>
            <input
              {...register("company_phone", { required: true })}
              type="text"
              id="phone_number"
              defaultValue={companyData?.company_phone}
              className="bg-amber-50 p-1 rounded-sm"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="web_url" className="text-amber-800 text-xl">
              Web URL
            </label>
            <input
              {...register("web_url", { required: false })}
              type="text"
              id="web_url"
              defaultValue={companyData?.web_url}
              className="bg-amber-50 p-1 rounded-sm"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="npwp" className="text-amber-800 text-xl">
              Tax ID / NPWP
            </label>
            <input
              {...register("npwp", { required: false })}
              type="text"
              id="npwp"
              defaultValue={companyData?.npwp}
              className="bg-amber-50 p-1 rounded-sm"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="payroll_date" className="text-amber-800 text-xl">
              Cut Off Payroll Date
            </label>
            <input
              {...register("payroll_date", { required: true, min: 1, max: 31 })}
              type="number"
              id="payroll_date"
              defaultValue={companyData?.payroll_date}
              className="bg-amber-50 p-1 rounded-sm"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-amber-800 text-xl">General Holiday</label>
            {days.map((day) => (
              <label key={day} className="flex items-center gap-1">
                <input
                  {...register("general_holiday", { required: false })}
                  type="checkbox"
                  value={day}
                  className="accent-amber-500"
                />
                {day}
              </label>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="status" className="text-amber-800 text-xl">
              Status
            </label>
            <select
              {...register("status", { required: true })}
              name="status"
              id="status"
              defaultValue={companyData?.status}
              className="bg-amber-50 p-1 rounded-sm"
            >
              <option value="" disabled>
                Select Status
              </option>
              <option value={StatusActive.Active}>Active</option>
              <option value={StatusActive.Inactive}>Inactive</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-amber-800 text-xl">
              Upload Logo
            </label>
            <input
              {...register("image_company")}
              type="file"
              className="bg-amber-50 p-1 rounded-sm"
            />
          </div>
          <div className="mt-2 py-2 col-span-2 justify-self-center flex justify-center w-[200px] rounded-sm text-white bg-amber-400 hover:bg-amber-500">
            <input type="submit" value="Update Company" />
          </div>
        </form>
      </div>
    </div>
  );
}
