import { IAttendance } from "@/types/interface";

export const fetchAttendanceCompany = async (companyId: number | undefined, accessToken: string | undefined): Promise<IAttendance[]> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL!}/attendance?company_id=${companyId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        }
    })

    if(!response.ok) {
        throw new Error('Failed to fetch data Attendance')
    }

    return response.json();
}

export const fetchAllUserAttendanceById = async (userId: number | undefined, accessToken: string | undefined): Promise<IAttendance[]> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL!}/attendance/employee/?user_id=${userId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        }
    })

    if(!response.ok) {
        throw new Error('Failed to fetch data Attendance')
    }

    return response.json();
}

export const fetchAllUserAttendanceHistory = async (accessToken: string | undefined): Promise<IAttendance[]> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL!}/attendance/history`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        }
    })

    if(!response.ok) {
        throw new Error('Failed to fetch data Attendance')
    }

    return response.json();
}