import { Movie } from '@/types';
import styles from './landingMovies.module.css'
import MovieCard from '../movieCard/movieCard'
import { trendingUrl } from '@/constants';
import { createOpts } from '@/app/util/helper';


async function  getTrendingMovies(){ // return type value here 
    const res = await fetch(trendingUrl ,  createOpts("GET"  , {revalidate: 3600}))
    if(!res.ok) {
        throw new Error("Failed fetching trending movies")
    }
    return res.json()
}


export default async function MoviesLanding(){
    const {results}: {results:Movie[]} =  await getTrendingMovies()

    return (    
        <section id={styles.moviesLanding}>
            <section className={styles.trendingSection}>
                <div className={styles.trending}>
                    {results.map((movie , index) => {
                        return (
                        <MovieCard movie={movie} key={index}/>
                        )}
                    )}
                </div>
            </section>
        </section>
    )
}