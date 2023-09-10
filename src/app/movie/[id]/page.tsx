import { movieUrl} from '@/constants';
import { MovieData } from '@/types'
import { createOpts } from '@/app/util/helper';
import { currentUser } from '@clerk/nextjs';
import Movie from '@/app/components/movie/movie';
import { User } from '@clerk/nextjs/server';

interface MoviePageProps {
    params: { id:string}
}


async function getmovieDetails(id:string):Promise<MovieData> {
    const res = await fetch(`${movieUrl}/${id}?append_to_response=credits,release_dates,videos,images` , createOpts("GET"))
    if(!res.ok) {
        throw new Error(`Failed fetching ${id} movie details`)
    }
    return res.json()
}

export default async function Page({params}:MoviePageProps){
    const user: User | null = await currentUser();
    const data:MovieData =  await getmovieDetails(params.id)
    
    return (
        <Movie 
        data={data} 
        username={user?.username}
        email={user?.emailAddresses[0].emailAddress}
        />
    )
}