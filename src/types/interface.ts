// holiday
export enum Holiday {
  Sunday = "sunday",
  Monday = "monday",
  Tuesday = "tuesday",
  Wednesday = "wednesday",
  Thursday = "thursday",
  Friday = "friday",
  Saturday = "saturday",
}

// status active
export enum StatusActive {
  Active = "ACTIVE",
  Inactive = "INACTIVE",
}

export enum Role {
  Admin = "ADMIN",
  Staff = "STAFF",
  Internship = "INTERNSHIP",
}

export enum EmployeeType {
  Contract = "CONTRACT",
  Permanent = "PERMANENT",
  Temporary = "TEMPORARY",
}

export enum UserType {
  Field = "FIELD",
  NonField = "NONFIELD",
}

export enum WorkSpace {
  Home = "HOME",
  Office = "OFFICE",
}

export enum PaidLeave {
  Yes = "YES",
  No = "NO",
}

export enum AttendanceStatus {
  Present = "PRESENT",
  Late = "LATE",
  Absent = "ABSENT",
  Leave = "LEAVE",
}

export enum StatusApproval {
  Pending = "PENDING",
  Approved = "APPROVED",
  Rejected = "REJECTED",
}

export enum AttendanceBy {
  Admin = "ADMIN",
  Self = "SELF",
}
export enum Gender {
  Male = "MALE",
  Female = "FEMALE",
}

export interface IError {
  message: string;
  name?: string;
  code?: number;
}

// login interface
export interface ILoginInput {
  company_name: string;
  username: string;
  password: string;
}

// register interface
export interface IRegisterInput {
  company_name: string;
  full_name: string;
  address: string;
  email: string;
  phone_number: string;
}

export interface IRegisterResponse {
  access_token: string;
  user: IUser;
}

// company interface
export interface ICompany {
  company_id: number;
  company_name: string;
  company_owner: string;
  company_address: string;
  company_email: string;
  company_phone: string;
  web_url: string;
  npwp: string;
  payroll_date: number;
  status: StatusActive;
  image_company: string;
}

// user interface
export interface IUser {
  user_id: number;
  nik: string;
  family_card_number: string;
  employment_number: string;
  passport_number: string;
  name: string;
  address: string;
  email: string;
  phone_number: string;
  date_of_birth: string;
  avatar: string;
  gender: Gender;
  username: string;
  password: string;
  role: Role;
}

export interface IUpdateUser {
  username: string;
  address: string;
  phone_number: string;
  date_of_birth: string;
  gender: Gender;
}

// user company detail interface
export interface IUserCompanyDetail {
  user_company_id: number;
  company_id: number;
  user_id: number;
  employee_type: EmployeeType;
  user_type: UserType;
  joining_date: string;
  leaving_date: string;
  shift_id: number;
  workspace: WorkSpace;
  user_status: StatusActive;
  user: IUser;
  company: ICompany;
}

// shift interface
export interface IShift {
  shift_id: number;
  company_id: number;
  title: string;
  opening_time: string;
  closing_time: string;
  status: StatusActive;
}

export interface ICreateUpdateShift {
  title: string;
  opening_time: string;
  closing_time: string;
  status: StatusActive;
}

// leave type interface
export interface ILeaveType {
  leave_type_id: number;
  leave_type_name: string;
  paid_leave: PaidLeave;
  leave_allocated_day: number;
}

export interface ICreateUpdateLeaveType {
  leave_type_name: string;
  paid_leave: PaidLeave;
  leave_allocated_day: number | null;
}

export interface ILeaveRequest {
  leave_request_id: number;
  leave_type_id: number;
  type: ILeaveType;
  from: string;
  to: string;
  request_date: string;
  user: IUser;
  requested_days: number;
  reason: string;
  proof_image: string;
  approver: IUser;
  approved_at: string;
  admin_remark: string;
  status: StatusApproval;
}

export interface ICreateLeaveRequest {
  leave_type_id: number;
  from: string;
  to: string;
  reason: string;
  proof_image: string;
}
export interface IApprovedLeaveRequest {
  status: StatusApproval;
  admin_remark: string;
}

export interface ITimeAndDate {
  locale?: string;
  timeZone?: string;
  hour12?: boolean;
}

export interface IAttendance {
  attendance_id: number;
  attendance_date: string;
  user: IUser;
  check_in_at: string;
  check_out_at: string;
  attendance_status: AttendanceStatus;
  attendance_by: AttendanceBy;
  hours_work_min: number;
  late_minute: number;
  overtime_min: number;
  status: StatusApproval;
}
export interface ICheckIn {
  check_in_at: string;
}

export interface ICheckOut {
  check_out_at: string;
}
