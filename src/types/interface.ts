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
    full_name: string;
    company_name: string;
    email: string;
    phone_number: string;
}


// holiday
export enum Holiday {
    Sunday = "sunday",
    Monday = "monday",
    Tuesday = "tuesday",
    Wednesday = "wednesday",
    Thursday = "thursday",
    Friday = "friday",
    Saturday = "saturday"
}

// status active
export enum StatusActive {
    Active = 'active',
    Inactive = 'inactive'
};

export enum Role {
    Admin = "admin",
    Staff = "staff",
    Internship = "internship"
}

export enum EmployeeType {
    Contract = "contract",
    Permanent = "permanent",
    Temporary = "temporary"
}

export enum UserType {
    Field = "field",
    NonField = "nonfield"
}

export enum WorkSpace {
    Home = "home",
    Office = "office"
}

export enum PaidLeave {
    Yes = "yes",
    No = "no"
}

// company interface
export interface ICompany {
    company_name: string;
    company_owner: string;
    company_address: string;
    company_email: string;
    company_phone: string;
    web_url: string;
    npwp: string;
    payroll_date: number;
    status: StatusActive;
    general_holiday: Holiday;
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
    gender: string;
    username: string;
    role: Role;
}

// percobaan
export interface IUser2 {
    id: number;
    email: string;
    name: string;
}



// user company detail interface
export interface IUserCompanyDetail {
    user_company_id: number;
    company_id: number;
    user_id: number;
    employee_type: EmployeeType;
    user_type: UserType;
    joining_date: Date;
    leaving_date: Date;
    shift_id: number;
    workspace: WorkSpace;
    user_status: StatusActive;
    user: IUser;
    company: ICompany;
}

// user list interface
export interface IUserList {
    name: string;
    address: string;
    email: string;
    phone_number: string;
    is_active: StatusActive;
}

// shift interface
export interface IShift {
    company: string;
    title: string;
    opening_time: string;
    closing_time: string;
    total_employee: number;
    status: StatusActive;
}

// leave type interface
export interface ILeavetype {
    leave_type_name: string;
    paid_leave: PaidLeave;
    leave_allocated_day: number;
}

export interface ITimeAndDate {
    locale?: string;
    timeZone?: string;
    hour12?: boolean
}