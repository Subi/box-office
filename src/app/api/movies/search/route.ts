import { NextRequest , NextResponse } from "next/server";
import {searchUrl , movieUrl} from '@/constants'
import { createOpts } from "@/app/util/helper";
import { get } from "http";
import { moveEmitHelpers } from "typescript";

export interface IResults {
    page: number
    results: Movie[]
}

export type Movie = {
    id: number
    adult: boolean
    backdropPath: string
    genreIds: number[]
    original_language: string
    original_title: string
    overview: string
    popularity: number
    poster_path: string
    release_date: string
    title: string
    vote_average: number
    vote_count: number
    credits : {
        cast: Cast[]
        crew: Crew[]
    }
}

type Cast = {
    adult: false
    gender: number;
    id: number
    known_for_department: string
    name: string
    original_name: string
    popularity: number
    profile_path: string
    cast_id: number
    charachter: string
    credit_id: string
    order: number
}



type Crew = {
    adult: false
    gender: number;
    id: number
    known_for_department: string
    name: string
    original_name: string
    popularity: number
    profile_path: string
    cast_id: number
    charachter: string
    credit_id: string
    order: number
    job: string
}

export async function GET(req:NextRequest , res:NextResponse ) {
    


    const {searchParams} = new URL(req.url);
    const title: string | null =  searchParams.get('title')

    const response = await fetch(`${searchUrl}?query=${title}&language=en-US` , createOpts("get"))
    if(response.status != 200) {
        return NextResponse.json({"status": response.statusText , "code" : response.status})
    }
    const data:IResults =  await response.json()

    const moviesResults:Movie[] =  await getSearchedMoviesData(data.results)  
    return NextResponse.json({success: 200 , moviesResults})
}


const getSearchedMoviesData =  async (searchedMovies:Movie[]):Promise<Movie[]> => {
    // Intialize movie array to return after fetching additional data about movies
    // such as credits etc , I imagine this will return more data is the future as needed
    // propbably should create a helper function to generate query string.

    let moviesArr:Movie[] = []
    for(const movie of searchedMovies) {
        try{
            const response = await fetch(`${movieUrl}/${movie.id}?append_to_response=credits` , createOpts("get"))
            const data:Movie = await response.json()
            moviesArr.push(data)
        }catch(e){
            console.error(`Error occured fetching movie details for ${movie.title} - ${movie.id}` , e)
        }
    }
    return sortMoviesResults(moviesArr)
}


const sortMoviesResults = (movies:Movie[]):Movie[] => {
    return movies.sort((a:Movie , b:Movie) => {
        return b.popularity -  a.popularity
    })
}

