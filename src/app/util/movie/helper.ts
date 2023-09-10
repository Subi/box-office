import { MovieData } from "@/types"
import { locale, videoTypes } from "@/constants"

export const getMovieReleaseRating = (data:MovieData , iso:string ):string | undefined => {
    return data.release_dates.results.find(result => result.iso_3166_1 === iso)?.release_dates.find(release => release.certification)?.certification
}

export const getCrew = (data:MovieData ,postion:string):string | undefined => { 
    return data.credits.crew.sort((a , b) => 
        {return b.popularity - a.popularity})
        .find(c => c.department === postion)?.name
}

export const formatRuntime = (data:MovieData):string => {
    return `${data.runtime % 60 != 0 ? `${Math.floor(data.runtime / 60)}h ${data.runtime % 60}m` :`${data.runtime / 60}h`}`
}

export const getTrailerUrl = (data:MovieData)  => {
    return data.videos.results.find(video => video.name === videoTypes.trailer)?.key
}

export const backdropImage = (backdropUrl:string):string => {
    return `https://www.themoviedb.org/t/p/original/${backdropUrl}`
}
