import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";



// Accept new user data sent from clerk and add to database
export async function POST(req:NextRequest , res:NextResponse){
    const {data} = await req.json()
    const {username , email_addresses}: {username:string , email_addresses: [{email_address:string}] } =  data
    const email = email_addresses[0].email_address
    registerUser(username , email)
    // need to return json response to stop header error 
    return NextResponse.json({"success": 200})
}



const registerUser = async (username:string , email:string) => {
    const createdUser =  await prisma.user.create({
        data: {
            username: username,
            email: email,
            profile: {create:{avatar: ""  , bio: "" ,  banner: ""}},
            lists: {create:{title:"Watchlist", description:"" }},
        },include:{lists:  {include : {entries: true}}}
    })
}

