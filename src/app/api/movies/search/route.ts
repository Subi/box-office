import { NextRequest , NextResponse } from "next/server";
import {searchUrl , movieUrl} from '@/constants'
import { createOpts} from "@/app/util/helper";
import { MovieData } from "@/types";

export interface SearchResponse {
    results: MovieData[]
}

export async function GET(req:NextRequest , res:NextResponse ) {
    const {searchParams} = new URL(req.url);
    const title: string | null =  searchParams.get('title')

    const response = await fetch(`${searchUrl}?query=${title}&language=en-US` , createOpts("get"))
    if(response.status != 200) {
        console.error(`Error fetching user search query ${title} : ${response.status} : ${response.statusText}`)
        return NextResponse.json({"status": response.statusText , "code" : response.status})
    }
    const {results}:SearchResponse  = await response.json()
    const searchedMovieResults:MovieData[] = await getSearchMovieData(results)
    return NextResponse.json({success: 200 , searchedMovieResults})
}

const getSearchMovieData = async(movies:MovieData[]):Promise<MovieData[]> => {
    let movieArr:MovieData[] = []

    for(const movie of movies) {
        const response = await fetch(`${movieUrl}/${movie.id}?append_to_response=credits,release_dates` , createOpts("GET"))
        if(!response.ok) {
            console.error(`Error occrured fetching ${movie.title} data` , response.status)
        }
        const data:MovieData =  await response.json()
        movieArr.push(data)
    }
    return sortMoviesResults(movieArr)
}


const sortMoviesResults = (movies:MovieData[]):MovieData[] => {
    return movies.sort((a:MovieData , b:MovieData) => {
        return b.popularity -  a.popularity
    })
}

