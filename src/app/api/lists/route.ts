import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


type PatchData = {
    title:string
    poster:string
    id:number
} 


export async function PATCH(req:NextRequest , res:NextResponse){
    const {username,data}:{username:string , email:string , data:PatchData} =  await req.json()
    if(await updateList(username , data)){
        return NextResponse.json({success: 200})
    }
    return NextResponse.json({error: "Failed to update user list"})
}

export async function GET(req:NextRequest ,  res:NextResponse) {
    const {searchParams} = new URL(req.url)
    const username: string | null =  searchParams.get('username')
}

const updateList = async (username:string , data:PatchData):Promise<boolean> => {
    const user =  await prisma.user.findFirst({
        where: {
            username: username
        },
        include: {lists : { select : { id: true, title:true}}}
    })
    if(user) {
        const watchlistId =  user.lists.find(list => list.title === "Watchlist")?.id
        const updatedList =  await prisma.list.update({
            where: {id: watchlistId},
            data: { entries: {create: [{name:data.title , poster_image:data.poster , id:data.id}]}
        }
        })
        if(updatedList) {
            return true
        }
        //send notification on movie successfully being added
    }
    return false
}


