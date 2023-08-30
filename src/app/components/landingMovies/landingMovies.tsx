import { Movie } from '@/types';
import styles from './landingMovies.module.css'
import MovieCard from '../movieCard/movieCard'

async function getTrendingMovies():Promise<Movie[]> {
    const res =  await fetch("http://localhost:3000/api/movies/trending" , {method:"GET" , next:{revalidate: 3600}})
    if(!res.ok) {
        throw new Error("Failed fetching trending movies")
    }
    return res.json()
}

export default async function MoviesLanding(){
    const data:Movie[] =  await getTrendingMovies()
    return (    
        <section id={styles.moviesLanding}>
            <section className={styles.trendingSection}>
                <div className={styles.trending}>
                    {data.map((movie , index) => {
                        return (
                        <MovieCard movie={movie} key={index}/>
                        )}
                    )}
                </div>
            </section>
        </section>
    )
}