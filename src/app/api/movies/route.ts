import { NextRequest, NextResponse } from "next/server";
import { Movie } from "./search/route";
import { createOpts } from "@/app/util/helper";
import { movieUrl } from "@/constants";
export async function GET(req:NextRequest , res:NextResponse ) {}


export const getMovieData = async (movies:Movie[]) => {
    let moviesArr:Movie[] = []

    for(const movie of movies) {
        const response = await fetch(`${movieUrl}/${movie.id}?append_to_response=credits` , createOpts("get"))
        const data:Movie =  await response.json()
        moviesArr.push(data)
    }
    return moviesArr
}