export type Movie = {
    id: number
    adult: boolean
    backdrop_path: string
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
    images: {
        backdrops: {
            aspect_ratio:number
            height:number
            iso_639_1:string
            file_path:string
            vote_average:string
            vote_count:11
            width:number
        }[]
    }
    release_dates: {
        results: releaseResult[]
    }
    videos: {
        results: videoResult[]
    } 
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

