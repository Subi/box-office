import next from "next/types"

export interface IOptions {
    method: string
    headers: {
        accept:string
        authorization:string 
    },
    next: NextFetchRequestConfig | undefined
}

export const createOpts = (method:string , nextConfig?: NextFetchRequestConfig):IOptions => {
    return {
        "method": method,
        "headers": {
            "accept": 'application/json',
            "authorization": `Bearer ${process.env.ACCESS_TOKEN}`
        },
        next: nextConfig
    }
}

