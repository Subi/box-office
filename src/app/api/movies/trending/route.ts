import { createOpts } from "@/app/util/helper";
import { trendingUrl } from "@/constants";
import { NextRequest, NextResponse } from "next/server";
import { IResults, Movie } from "../search/route";


export async function GET(req:NextRequest , res:NextResponse) {
    const response = await fetch(trendingUrl , createOpts("get"))
    if(response.status != 200) {
        console.error(`Error fetching trending movies ${response.status} : ${response.statusText}`)
        return NextResponse.json({"status": response.status , "code": response.statusText})
    }
    const {results}: {results:Movie[]} =  await response.json()
    return NextResponse.json(results)
}

