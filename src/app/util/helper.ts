import { movieUrl } from "@/constants"

export interface IOptions {
    method: string
    headers: {
        accept:string
        authorization:string 
    }
}


export const createOpts = (method:string):IOptions => {
    return {
        "method": method,
        "headers": {
            "accept": 'application/json',
            "authorization": `Bearer ${process.env.ACCESS_TOKEN}`
        }
    }
}


export const getMovieData = async (id:string | null):Promise<Response> => {
    return await fetch(`${movieUrl}/${id}?append_to_response=credits,release_dates,videos` , createOpts("GET"))
}


