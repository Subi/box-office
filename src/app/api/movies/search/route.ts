import { NextRequest , NextResponse } from "next/server";
import {searchUrl , movieUrl} from '@/constants'
import { createOpts} from "@/app/util/helper";
import { Movie } from "@/types";

export interface SearchResponse {
    results: Movie[]
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
    const searchedMovieResults:Movie[] = await getSearchMovieData(results)
    return NextResponse.json({success: 200 , searchedMovieResults})
}

const getSearchMovieData = async(movies:Movie[]):Promise<Movie[]> => {
    let movieArr:Movie[] = []

    for(const movie of movies) {
        const response = await fetch(`${movieUrl}/${movie.id}?append_to_response=credits,release_dates` , createOpts("GET"))
        if(!response.ok) {
            console.error(`Error occrured fetching ${movie.title} data` , response.status)
        }
        const data:Movie =  await response.json()
        movieArr.push(data)
    }
    return sortMoviesResults(movieArr)
}


const sortMoviesResults = (movies:Movie[]):Movie[] => {
    return movies.sort((a:Movie , b:Movie) => {
        return b.popularity -  a.popularity
    })
}

