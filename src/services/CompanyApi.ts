import { ICompany } from "@/types/interface";

export const fetchCompany = async (): Promise<ICompany> => {
    const response = await fetch(`${process.env.API_URL!}/company`)

    if(!response.ok) {
        throw new Error('Failed to fetch data company')
    }

    return response.json();
}