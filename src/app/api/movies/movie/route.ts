import { useSearchParams } from "next/navigation";
import { NextRequest , NextResponse } from "next/server";
import { getMovieData } from "@/app/util/helper";
import { Movie } from "../search/route";


export async function GET(req:NextRequest , res:NextResponse ) {
    const {searchParams} = new URL(req.url)
    const id = searchParams.get('id')

    const response  = await getMovieData(id)

    if(response.status != 200) {
        console.error(`Error fetching movie details ${id} : ${response.status} : ${response.statusText}`)
        return NextResponse.json({"status": response.statusText , "code" : response.status})
    }
    const data:Movie  = await response.json()
    return NextResponse.json({success: 200 , data})
}