import { NextRequest , NextResponse } from "next/server";
import { createOpts } from "@/app/util/helper";
import { movieUrl } from "@/constants";
import { Movie } from "@/types";


export async function GET(req:NextRequest , res:NextResponse ) {
    const {searchParams} = new URL(req.url)
    const id = searchParams.get('id')

    const response  = await fetch(`${movieUrl}/${id}?append_to_response=credits,release_dates,videos,images` , createOpts("GET"))
    if(response.status != 200) {
        console.error(`Error fetching movie details ${id} : ${response.status} : ${response.statusText}`)
        return NextResponse.json({"status": response.statusText , "code" : response.status})
    }
    const data:Movie  = await response.json()
    return NextResponse.json({success: 200 , data})
}