"use client";
import { fetchShift } from "@/services/ShiftAPI";
import { fetchUserCompanyById } from "@/services/UserAPI";
import { EmployeeType, IError, IShift, IUser, IUserCompanyDetail, Role, StatusActive, UserType, WorkSpace } from "@/types/interface";
import { format, parseISO } from "date-fns";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";

type FormData = {
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
  employment: {
    company_id: number;
    employee_type: "Permanent" | "Contract" | "Temporary";
    user_type: "Field" | "Nonfiled";
    workspace: "Office" | "Home";
    shift_id?: number | null;
    joining_date: string;
    leaving_date?: string | null;
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
  const [shiftData, setShiftData] = useState<IShift[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<IError | null>(null);
  const userId = id === session?.user.user_id || !id ? session?.user.user_id : id
  
  const loadData = async (): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);
      const user = await fetchUserCompanyById(
        userId,
        session?.user.accessToken
      );
      const shift = await fetchShift(session?.user.accessToken)
      setDataUsers(user);
      setShiftData(shift)
    } catch (err) {
      setError({
        message: err instanceof Error ? err.message : "Unknown error occured",
        name: err instanceof Error ? err.name : undefined,
        code: err instanceof Error ? 500 : undefined,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const methods = useForm<FormData>();
  const onSubmit = methods.handleSubmit((data) => console.log(data));
  const action =
    modes === "create"
      ? "Create"
      : modes === "edit"
      ? "Update"
      : "";

  useEffect(() => {
    if (status === "authenticated") {
      loadData();
    }
  }, [status]);

  console.log(error);
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="bg-amber-200 w-[96%] px-6 py-4 h-full rounded-sm">
        <FormProvider {...methods}>
          <form onSubmit={onSubmit} className="grid grid-cols-1 gap-3 mt-4">
            <PersonalDetails userData={dataUsers?.user} modes={modes} />
            <CompanyDetails
              userCompanyDetail={dataUsers}
              shiftData={shiftData}
              modes={modes}
            />
            <button type="submit" className="btn">
              {action} User
            </button>
          </form>
        </FormProvider>
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
  const { register, setValue } = useFormContext<FormData>();
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
            className="input"
            {...register("user.nik")}
          />
        </Field>
        <Field label="Family Card Number">
          <input
            defaultValue={modes === "edit" ? userData.family_card_number : ""}
            className="input"
            {...register("user.family_card_number")}
          />
        </Field>

        <Field label="Employment Number">
          <input
            defaultValue={modes === "edit" ? userData.employment_number : ""}
            className="input"
            {...register("user.employment_number")}
          />
        </Field>
        <Field label="Passport Number">
          <input
            defaultValue={modes === "edit" ? userData.passport_number : ""}
            className="input"
            {...register("user.passport_number")}
          />
        </Field>

        <Field label="Name">
          <input
            defaultValue={modes === "edit" ? userData.name : ""}
            className="input"
            {...register("user.name", { required: true })}
          />
        </Field>
        <Field label="Address">
          <input
            defaultValue={modes === "edit" ? userData.address : ""}
            className="input"
            {...register("user.address")}
          />
        </Field>

        <Field label="Email">
          <input
            defaultValue={modes === "edit" ? userData.email : ""}
            className="input"
            type="email"
            {...register("user.email", { required: true })}
          />
        </Field>
        <Field label="Phone Number">
          <input
            defaultValue={modes === "edit" ? userData.phone_number : ""}
            className="input"
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
            className="input"
            type="date"
            {...register("user.date_of_birth", { valueAsDate: true })}
          />
        </Field>

        <Field label="Username">
          <input
            defaultValue={modes === "edit" ? userData.username : ""}
            className="input"
            {...register("user.username", { required: true })}
          />
        </Field>

        <Field label="Avatar (file name only)">
          <input
            className="input"
            // defaultValue={modes === "edit" ? userd : ""}
            type="file"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) setValue("user.avatar", file.name);
            }}
          />
          <img src={userData.avatar} className="w-50 h-auto" />
        </Field>

        <Field label="Role">
          <select
            defaultValue=""
            className="input"
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
  const { register } = useFormContext<FormData>();
  if (!userCompanyDetail) return;

  return (
    <section className="rounded-md bg-amber-100 p-4">
      <h2 className="mb-3 text-xl font-semibold text-amber-800">
        Company Details
      </h2>

      <div className="grid grid-cols-2 gap-3">
        <Field label="Company">
          <select
            className="input"
            defaultValue={""}
            {...register("employment.company_id", {
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
            className="input"
            {...register("employment.employee_type", { required: true })}
          >
            <option value={EmployeeType.Permanent}>Permanent</option>
            <option value={EmployeeType.Contract}>Contract</option>
            <option value={EmployeeType.Temporary}>Temporary</option>
          </select>
        </Field>

        <Field label="User Type">
          <select
            defaultValue={modes === "edit" ? userCompanyDetail.user_type : ""}
            className="input"
            {...register("employment.user_type", { required: true })}
          >
            <option value={UserType.Field}>Field</option>
            <option value={UserType.NonField}>Nonfiled</option>
          </select>
        </Field>

        <Field label="Workspace">
          <select
            defaultValue={modes === "edit" ? userCompanyDetail.workspace : ""}
            className="input"
            {...register("employment.workspace", { required: true })}
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
            className="input"
            type="date"
            {...register("employment.joining_date", { required: true })}
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
            className="input"
            type="date"
            {...register("employment.leaving_date")}
          />
        </Field>

        <Field label="Shift">
          <select
            className="input"
            defaultValue=""
            {...register("employment.shift_id", {
              required: true,
              valueAsNumber: true,
            })}
          >
            <option value="" disabled>
              — Select shift —
            </option>
            {shiftData?.map((shift: IShift) => (
              <option key={shift.shift_id} value={shift.shift_id}>
                {`${shift.title} ${format(
                  parseISO(shift.opening_time),
                  "HH:mm:ss"
                )} - ${format(
                  parseISO(shift.closing_time),
                  "HH:mm:ss"
                )}`}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Status">
          <select
            className="input"
            {...register("employment.user_status", { required: true })}
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
