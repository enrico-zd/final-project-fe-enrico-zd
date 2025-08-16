"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
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

type CompanyData = {
  company_id: number;
  company_name: string;
};

type CompanyDetailsProps = {
  companyData: CompanyData;
  shiftData: ShiftData[];
};

type ShiftData = {
  shift_id: number;
  company_id: number;
  title: string;
  opening_time: string;
  closing_time: string;
  status: string;
};

const UserForm = () => {
  const methods = useForm<FormData>();
  const onSubmit = methods.handleSubmit((data) => console.log(data));
  const pathName = usePathname();
  const action =
    pathName === "/admin/users/create"
      ? "Create"
      : pathName === "/admin/users/update"
      ? "Update"
      : "";

  const companyData: CompanyData = {
    company_id: 1,
    company_name: "Salut Company",
  };

  const shiftData: ShiftData[] = [
    {
      shift_id: 2,
      company_id: 1,
      title: "Shift Pagi",
      opening_time: "08:00:00",
      closing_time: "16:00:00",
      status: "ACTIVE",
    },
    {
      shift_id: 3,
      company_id: 2,
      title: "Shift Malam",
      opening_time: "16:00:00",
      closing_time: "21:00:00",
      status: "ACTIVE",
    },
    {
      shift_id: 4,
      company_id: 1,
      title: "Shift Begadang",
      opening_time: "21:00:00",
      closing_time: "06:00:00",
      status: "ACTIVE",
    },
  ];

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="bg-amber-200 w-[96%] px-6 py-4 h-full rounded-sm">
        <FormProvider {...methods}>
          <form onSubmit={onSubmit} className="grid grid-cols-1 gap-3 mt-4">
            <PersonalDetails />
            <CompanyDetails companyData={companyData} shiftData={shiftData} />
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
function PersonalDetails() {
  const { register, setValue } = useFormContext<FormData>();

  return (
    <section className="rounded-md bg-amber-100 p-4">
      <h2 className="mb-3 text-xl font-semibold text-amber-800">
        Personal Details
      </h2>

      <div className="grid grid-cols-2 gap-3">
        <Field label="NIK">
          <input
            className="input"
            {...register("user.nik", { required: true })}
          />
        </Field>
        <Field label="Family Card Number">
          <input className="input" {...register("user.family_card_number")} />
        </Field>

        <Field label="Employment Number">
          <input className="input" {...register("user.employment_number")} />
        </Field>
        <Field label="Passport Number">
          <input className="input" {...register("user.passport_number")} />
        </Field>

        <Field label="Name">
          <input
            className="input"
            {...register("user.name", { required: true })}
          />
        </Field>
        <Field label="Address">
          <input className="input" {...register("user.address")} />
        </Field>

        <Field label="Email">
          <input
            className="input"
            type="email"
            {...register("user.email", { required: true })}
          />
        </Field>
        <Field label="Phone Number">
          <input className="input" {...register("user.phone_number")} />
        </Field>

        <Field label="Date of Birth">
          <input
            className="input"
            type="date"
            {...register("user.date_of_birth", { valueAsDate: true })}
          />
        </Field>

        <Field label="Avatar (file name only)">
          <input
            className="input"
            type="file"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) setValue("user.avatar", file.name);
            }}
          />
        </Field>

        <Field label="Username">
          <input
            className="input"
            {...register("user.username", { required: true })}
          />
        </Field>
        <Field label="Password">
          <input
            className="input"
            type="password"
            {...register("user.password", { required: true })}
          />
        </Field>

        <Field label="Role">
          <select
            className="input"
            {...register("user.role", { required: true })}
          >
            <option value="Admin">Admin</option>
            <option value="staff">staff</option>
            <option value="internship">internship</option>
          </select>
        </Field>
      </div>
    </section>
  );
}

/* ---------------- Company Details ---------------- */
function CompanyDetails({ companyData, shiftData }: CompanyDetailsProps) {
  const { register } = useFormContext<FormData>();

  return (
    <section className="rounded-md bg-amber-100 p-4">
      <h2 className="mb-3 text-xl font-semibold text-amber-800">
        Company Details
      </h2>

      <div className="grid grid-cols-2 gap-3">
        <Field label="Company">
          <input
            className="input"
            type="number"
            {...register("employment.company_id", {
              required: true,
              valueAsNumber: true,
            })}
            placeholder={companyData.company_name}
          />
        </Field>

        <Field label="Employee Type">
          <select
            className="input"
            {...register("employment.employee_type", { required: true })}
          >
            <option value="Permanent">Permanent</option>
            <option value="Contract">Contract</option>
            <option value="Temporary">Temporary</option>
          </select>
        </Field>

        <Field label="User Type">
          <select
            className="input"
            {...register("employment.user_type", { required: true })}
          >
            <option value="Field">Field</option>
            <option value="Nonfiled">Nonfiled</option>
          </select>
        </Field>

        <Field label="Workspace">
          <select
            className="input"
            {...register("employment.workspace", { required: true })}
          >
            <option value="Office">Office</option>
            <option value="Home">Home</option>
          </select>
        </Field>

        <Field label="Shift">
          <select
            className="input"
            defaultValue=""
            {...register("employment.shift_id", { valueAsNumber: true })}
          >
            <option value="" disabled>— Pilih shift —</option>
            {shiftData.map((shift: ShiftData) => (
              <option key={shift.shift_id} value={shift.shift_id}>
                {`${shift.title} ${shift.opening_time} - ${shift.closing_time} ${shift.shift_id}`}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Joining Date">
          <input
            className="input"
            type="date"
            {...register("employment.joining_date", { required: true })}
          />
        </Field>

        <Field label="Leaving Date (optional)">
          <input
            className="input"
            type="date"
            {...register("employment.leaving_date")}
          />
        </Field>

        <Field label="Status">
          <select
            className="input"
            {...register("employment.user_status", { required: true })}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
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
