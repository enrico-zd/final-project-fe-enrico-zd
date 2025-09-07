"use client";
import { TimeFormat } from "@/lib/timeFormating";
import { fetchShift } from "@/services/ShiftAPI";
import {
  fetchCreateUserDetail,
  fetchUpdateUserDetail,
  fetchUserCompanyById,
} from "@/services/UserAPI";
import {
  EmployeeType,
  IError,
  IShift,
  IUser,
  IUserCompanyDetail,
  Role,
  StatusActive,
  UserType,
  WorkSpace,
} from "@/types/interface";
import { UploadButton } from "@/utils/uploadthing";
import { format, parseISO } from "date-fns";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { toast } from "sonner";
import EmployeeFormSkeleton from "../skeletons/EmployeeFormSkeleton";

export type FormDataUserDetail = {
  user: {
    nik: string;
    family_card_number: string;
    employment_number: string;
    passport_number: string;
    name: string;
    address: string;
    email: string;
    phone_number: string;
    date_of_birth: Date;
    avatar: string;
    username: string;
    password: string;
    role: "Admin" | "staff" | "internship";
  };
  employee: {
    company_id: number;
    employee_type: "Permanent" | "Contract" | "Temporary";
    user_type: "Field" | "Nonfiled";
    workspace: "Office" | "Home";
    shift_id?: number | null;
    joining_date: Date;
    leaving_date?: Date | null;
    user_status: "Active" | "Inactive";
  };
};

type CompanyDetailsProps = {
  userCompanyDetail?: IUserCompanyDetail | undefined;
  shiftData?: IShift[] | undefined;
  modes?: string;
};

const UserForm = ({
  id,
  modes,
}: {
  id?: number | undefined;
  modes: string;
}) => {
  const { data: session, status } = useSession();
  const [dataUsers, setDataUsers] = useState<IUserCompanyDetail>();
  const [shiftData, setShiftData] = useState<IShift[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<string>("");
  const [error, setError] = useState<IError | null>(null);
  useEffect(() => {
    const resolvedUserId =
      id === session?.user.user_id || !id ? session?.user.user_id : id;
    const accessToken = session?.user.accessToken;

    if (status !== "authenticated" || !resolvedUserId || !accessToken) return;

    let cancelled = false;

    (async () => {
      try {
        setIsLoading(true);
        setError(null);

        const user = await fetchUserCompanyById(resolvedUserId, accessToken);
        const shift = await fetchShift(accessToken);

        if (!cancelled) {
          setDataUsers(user);
          setShiftData(shift);
        }
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
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [status, id, session?.user.user_id, session?.user.accessToken]);

  const methods = useForm<FormDataUserDetail>();
  const onSubmit = methods.handleSubmit(async (data) => {
    setError(null);

    try {
      setSuccess("");
      if (modes === "edit") {
        await fetchUpdateUserDetail(
          dataUsers?.user_company_id,
          session?.user.accessToken,
          data
        );
        setSuccess("Berhasil Update");
      } else if (modes === "create") {
        await fetchCreateUserDetail(session?.user.accessToken, data);
        setSuccess("Berhasil Create");
      }
    } catch (err) {
      setError({
        message: err instanceof Error ? err.message : "Unknown error occured",
        name: err instanceof Error ? err.name : undefined,
        code: err instanceof Error ? 500 : undefined,
      });
    }
  });
  const action =
    modes === "create" ? "Create" : modes === "edit" ? "Update" : "";

  // set alert for success and error
  useEffect(() => {
    if (error) {
      toast.error(error.message);
    } else if (success) {
      toast.success(success);
    }
  });

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="bg-amber-200 w-[96%] px-6 py-4 h-full rounded-sm">
        {isLoading ? (
          <EmployeeFormSkeleton />
        ) : (
          <FormProvider {...methods}>
            <form onSubmit={onSubmit} className="grid grid-cols-1 gap-3 mt-4">
              <PersonalDetails userData={dataUsers?.user} modes={modes} />
              <CompanyDetails
                userCompanyDetail={dataUsers}
                shiftData={shiftData}
                modes={modes}
              />
              <button
                type="submit"
                className="mt-2 py-2 sm:col-span-0 xl:col-span-2 justify-self-center flex justify-center w-[200px] rounded-sm text-white bg-amber-400 hover:bg-amber-500"
              >
                {action} User
              </button>
            </form>
          </FormProvider>
        )}
      </div>
    </div>
  );
};

/* ---------------- Personal Details ---------------- */
function PersonalDetails({
  userData,
  modes,
}: {
  userData?: IUser | undefined;
  modes?: string;
}) {
  const { register, setValue } = useFormContext<FormDataUserDetail>();
  if (!userData) return;

  return (
    <section className="rounded-md bg-amber-100 p-4">
      <h2 className="mb-3 text-xl font-semibold text-amber-800">
        Personal Details
      </h2>

      <div className="grid grid-cols-2 gap-3">
        <Field label="NIK">
          <input
            defaultValue={modes === "edit" ? userData.nik : ""}
            className="bg-amber-50 p-1 rounded-sm"
          />
        </Field>
        <Field label="Family Card Number">
          <input
            defaultValue={modes === "edit" ? userData.family_card_number : ""}
            className="bg-amber-50 p-1 rounded-sm"
          />
        </Field>

        <Field label="Employment Number">
          <input
            defaultValue={modes === "edit" ? userData.employment_number : ""}
            className="bg-amber-50 p-1 rounded-sm"
          />
        </Field>
        <Field label="Passport Number">
          <input
            defaultValue={modes === "edit" ? userData.passport_number : ""}
            className="bg-amber-50 p-1 rounded-sm"
          />
        </Field>

        <Field label="Name">
          <input
            defaultValue={modes === "edit" ? userData.name : ""}
            className="bg-amber-50 p-1 rounded-sm"
            {...register("user.name", { required: true })}
          />
        </Field>
        <Field label="Address">
          <input
            defaultValue={modes === "edit" ? userData.address : ""}
            className="bg-amber-50 p-1 rounded-sm"
            {...register("user.address")}
          />
        </Field>

        <Field label="Email">
          <input
            defaultValue={modes === "edit" ? userData.email : ""}
            className="bg-amber-50 p-1 rounded-sm"
            type="email"
            {...register("user.email", { required: true })}
          />
        </Field>
        <Field label="Phone Number">
          <input
            defaultValue={modes === "edit" ? userData.phone_number : ""}
            className="bg-amber-50 p-1 rounded-sm"
            {...register("user.phone_number")}
          />
        </Field>

        <Field label="Date of Birth">
          <input
            defaultValue={
              modes === "edit"
                ? format(parseISO(userData.date_of_birth), "yyyy-MM-dd")
                : ""
            }
            className="bg-amber-50 p-1 rounded-sm"
            type="date"
            {...register("user.date_of_birth", { valueAsDate: true })}
          />
        </Field>

        <Field label="Username">
          <input
            defaultValue={modes === "edit" ? userData.username : ""}
            className="bg-amber-50 p-1 rounded-sm"
            {...register("user.username", { required: true })}
          />
        </Field>

        <Field label="Role">
          <select
            defaultValue={modes === "edit" ? userData.role : ""}
            className="bg-amber-50 p-1 rounded-sm"
            {...register("user.role", { required: true })}
          >
            <option value="" disabled>
              — Select Role —
            </option>
            <option value={Role.Admin}>Admin</option>
            <option value={Role.Staff}>staff</option>
            <option value={Role.Internship}>internship</option>
          </select>
        </Field>

        {modes === "create" && (
          <Field label="Password">
            <input
              className="bg-amber-50 p-1 rounded-sm"
              {...register("user.password", { required: true })}
            />
          </Field>
        )}
        <Field label="Avatar (file name only)">
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
              setValue("user.avatar", res[0].ufsUrl);
              toast.success("Upload Completed");
            }}
            onUploadError={(error: Error) => {
              toast.success(`ERROR! ${error.message}`);
            }}
          />
        </Field>
      </div>
    </section>
  );
}

/* ---------------- Company Details ---------------- */
function CompanyDetails({
  userCompanyDetail,
  shiftData,
  modes,
}: CompanyDetailsProps) {
  const { register } = useFormContext<FormDataUserDetail>();
  if (!userCompanyDetail) return;

  return (
    <section className="rounded-md bg-amber-100 p-4">
      <h2 className="mb-3 text-xl font-semibold text-amber-800">
        Company Details
      </h2>

      <div className="grid grid-cols-2 gap-3">
        <Field label="Company">
          <select
            className="bg-amber-50 p-1 rounded-sm"
            defaultValue={userCompanyDetail.company_id}
            {...register("employee.company_id", {
              required: true,
              valueAsNumber: true,
            })}
          >
            <option value="" disabled>
              — Select Company —
            </option>
            <option value={userCompanyDetail.company_id}>
              {userCompanyDetail.company.company_name}
            </option>
          </select>
        </Field>

        <Field label="Employee Type">
          <select
            defaultValue={
              modes === "edit" ? userCompanyDetail.employee_type : ""
            }
            className="bg-amber-50 p-1 rounded-sm"
            {...register("employee.employee_type", { required: true })}
          >
            <option value={EmployeeType.Permanent}>Permanent</option>
            <option value={EmployeeType.Contract}>Contract</option>
            <option value={EmployeeType.Temporary}>Temporary</option>
          </select>
        </Field>

        <Field label="User Type">
          <select
            defaultValue={modes === "edit" ? userCompanyDetail.user_type : ""}
            className="bg-amber-50 p-1 rounded-sm"
            {...register("employee.user_type", { required: true })}
          >
            <option value={UserType.Field}>Field</option>
            <option value={UserType.NonField}>Nonfiled</option>
          </select>
        </Field>

        <Field label="Workspace">
          <select
            defaultValue={modes === "edit" ? userCompanyDetail.workspace : ""}
            className="bg-amber-50 p-1 rounded-sm"
            {...register("employee.workspace", { required: true })}
          >
            <option value={WorkSpace.Office}>Office</option>
            <option value={WorkSpace.Home}>Home</option>
          </select>
        </Field>

        <Field label="Joining Date">
          <input
            defaultValue={
              modes === "edit" && userCompanyDetail.joining_date !== null
                ? format(
                    parseISO(userCompanyDetail?.joining_date),
                    "yyyy-MM-dd"
                  )
                : ""
            }
            className="bg-amber-50 p-1 rounded-sm"
            type="date"
            {...register("employee.joining_date", {
              required: true,
              setValueAs: (v) => (v ? new Date(v).toISOString() : null),
            })}
          />
        </Field>

        <Field label="Leaving Date (optional)">
          <input
            defaultValue={
              modes === "edit" && userCompanyDetail.leaving_date !== null
                ? format(
                    parseISO(userCompanyDetail?.leaving_date),
                    "yyyy-MM-dd"
                  )
                : ""
            }
            className="bg-amber-50 p-1 rounded-sm"
            type="date"
            {...register("employee.leaving_date", {
              setValueAs: (v) => (v ? new Date(v).toISOString() : null),
            })}
          />
        </Field>

        <Field label="Shift">
          <select
            className="bg-amber-50 p-1 rounded-sm"
            defaultValue={
              !userCompanyDetail.shift_id ? "" : userCompanyDetail.shift_id
            }
            {...register("employee.shift_id", {
              required: true,
              valueAsNumber: true,
            })}
          >
            <option value="" disabled>
              — Select shift —
            </option>
            {shiftData?.map((shift: IShift) => (
              <option key={shift.shift_id} value={shift.shift_id}>
                {`${shift.title} ${TimeFormat(
                  shift.opening_time
                )} - ${TimeFormat(shift.closing_time)}`}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Status">
          <select
            className="bg-amber-50 p-1 rounded-sm"
            {...register("employee.user_status", { required: true })}
          >
            <option value={StatusActive.Active}>Active</option>
            <option value={StatusActive.Inactive}>Inactive</option>
          </select>
        </Field>
      </div>
    </section>
  );
}

/* -------- small helper components/styles -------- */
function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-sm font-medium text-amber-800">{label}</span>
      {children}
    </label>
  );
}

export default UserForm;
