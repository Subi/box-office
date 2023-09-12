import { MovieData } from "@/types"
import { configDotenv } from "dotenv"
import next from "next/types"
import { toast } from "react-hot-toast"

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


export const addToList = async (list:string , username:string ,  movie:MovieData) => {
    const response =  await fetch('api/lists',{
        method: "PATCH",
        body: JSON.stringify({"list":list,"username":username,"data":movie})
    })
}

export const notify = {
    success(list:string){
        return toast.success(`Added to ${list}` , {position: "top-right" , "icon": "🍿"})
    },
    promise(list:string , promise:Promise<unknown>){
        return toast.promise(promise , {loading: "Adding" , success: `🍿 Added to ${list}` , error: `Error`} , {position: "top-right"})
    }
}