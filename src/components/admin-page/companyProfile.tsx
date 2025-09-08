"use client";
import NavBread from "@/components/nav-bread";
import { fetchUpdateCompany } from "@/services/CompanyApi";
import { ICompany, IError, StatusActive } from "@/types/interface";
import { UploadButton } from "@/utils/uploadthing";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

export default function CompanyProfile({
  companyData,
  accessToken,
}: {
  companyData: ICompany | null;
  accessToken: string | undefined;
}) {
  const [error, setError] = useState<IError | null>(null);
  const [success, setSuccess] = useState<string>("");

  const { register, handleSubmit, reset, setValue } = useForm<ICompany>();

  useEffect(() => {
    if (companyData) {
      reset({
        company_name: companyData.company_name,
        company_owner: companyData.company_owner,
        company_address: companyData.company_address,
        company_email: companyData.company_email,
        company_phone: companyData.company_phone,
        web_url: companyData.web_url,
        npwp: companyData.npwp,
        payroll_date: companyData.payroll_date,
        status: companyData.status,
        image_company: companyData.image_company,
      });
    }
  }, [companyData, reset]);

  const onSubmit: SubmitHandler<ICompany> = async (data) => {
    setError(null);

    try {
      setSuccess("");
      await fetchUpdateCompany(accessToken, data);
    } catch (err) {
      setError({
        message: err instanceof Error ? err.message : "Unknown error occured",
        name: err instanceof Error ? err.name : undefined,
        code: err instanceof Error ? 500 : undefined,
      });
    } finally {
      setSuccess("Update Berhasil");
    }
  };

  // set alert success dan error
  useEffect(() => {
    if (error) {
      toast.error(error.message)
    } else if (success) {
      toast.success(success)
    }
  })

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="self-start">
        <NavBread currentPage="Company Profile" />
      </div>
      <div className="bg-amber-200 w-[98%] px-6 py-4 h-full rounded-sm">
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
              className="bg-amber-50 p-1 rounded-sm"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="status" className="text-amber-800 text-xl">
              Status
            </label>
            <select
              {...register("status", { required: true })}
              name="status"
              id="status"
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
            <label htmlFor="image_company" className="text-amber-800 text-xl">
              Upload Logo
            </label>
            <UploadButton
              appearance={{
                button:
                  "ut-ready:bg-amber-500 ut-uploading:cursor-not-allowed rounded-r-none bg-red-500 bg-none after:bg-orange-400 w-24",
                container:
                  "w-max flex-row rounded-md border-cyan-300 bg-slate-800",
                allowedContent:
                  "flex h-8 flex-col items-center justify-center px-2 text-white",
              }}
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                setValue("image_company", res[0].ufsUrl);
                toast.success("Upload Completed");
              }}
              onUploadError={(error: Error) => {
                toast.error(`ERROR! ${error.message}`);
              }}
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
