import { NextRequest , NextResponse } from "next/server";
import {searchUrl , movieUrl} from '@/constants'
import { createOpts } from "@/app/util/helper";

export interface IResults {
    page: number
    results: Movie[]
}


export interface Cast  {
    adult: false
    gender: number;
    id: number
    known_for_department: string
    department:string
    name: string
    original_name: string
    popularity: number
    profile_path: string
    cast_id: number
    character: string
    credit_id: string
    order: number
}

export interface Crew extends Cast {
    job: string
}


export type Movie = {
    id: number
    adult: boolean
    backdropPath: string
    genreIds: number[]
    original_language: string
    runtime: number
    original_title: string
    overview: string
    popularity: number
    release_date: string
    poster_path: string
    title: string
    vote_average: number
    vote_count: number
    credits : {
        cast: Cast[]
        crew: Crew[]
    }
    tagline: string
    production_companies: {
        id: number
        logo_path: string
        name: string
        origin_country:string
    }[]
    genres: {
        id:number
        name:string
    }[]
    release_dates: {
        results: releaseResult[]
    }
    videos: {
        results: videoResult[]
    } 
}

export type releaseResult = {
    iso_3166_1: string
    release_dates: {
        certification: string
    }[]
}


export type videoResult = {
    iso_639_1?:string
    iso_3166_1: string
    name?: string
    key?:string
    site?:string
    size?:number
    type?:string
    offical?:string
    id?:string
    published_at?:string
}



export async function GET(req:NextRequest , res:NextResponse ) {
    const {searchParams} = new URL(req.url);
    const title: string | null =  searchParams.get('title')

    const response = await fetch(`${searchUrl}?query=${title}&language=en-US` , createOpts("get"))
    if(response.status != 200) {
        console.error(`Error fetching user search query ${title} : ${response.status} : ${response.statusText}`)
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

