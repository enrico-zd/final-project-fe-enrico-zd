import { ICompany } from "@/types/interface";

export const fetchCompany = async (accessToken: string | undefined): Promise<ICompany> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL!}/company`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        }
    })

    if(!response.ok) {
        throw new Error('Failed to fetch data company')
    }

    return response.json();
}

export const fetchCompanyById = async (companyId: number): Promise<ICompany> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL!}/company/${companyId}`)

    if(!response.ok) {
        throw new Error('Failed to fetch data company')
    }

    return response.json();
}
