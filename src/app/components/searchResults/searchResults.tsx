import { Movie } from '@/types'
import styles from './searchResults.module.css'
import Image from "next/image"
import Link from "next/link"

export interface ISearchedResultsList {
    movies: Movie[]
    modalClosed: boolean
}


export default function SearchedResultsList({movies , modalClosed}:ISearchedResultsList) {
    if(movies.length < 1) {
        return ""
    }
    return (
        <section className={!modalClosed ? `${styles.movieResultsContainer}` : `${styles.hidden}`}>
        {movies.map(movie => {
            return (
                <div className={styles.movieResult} key={movie.id}>
                <Link href={`/movie/${movie.id}`}>
                <div className={styles.movieItem}>
                    <div className={styles.poster}>
                        <Image
                          src={`https://www.themoviedb.org/t/p/original/${movie.poster_path}`} 
                          alt={`${movie.title}`}
                          width={70}
                          height={90}
                        />
                    </div>
                    <div className={styles.movieDetails}>
                        <div> 
                        <span> 
                            <h3>{movie.title}</h3>
                            <p>{movie.release_date.split("-")[0]}</p>
                        </span>
                        </div>
                        <div className={styles.credits}>
                            <span>Director: {movie.credits.crew.find(c => c.job === "Director")?.name}</span>
                        </div>
                    </div>
                </div>
                </Link>
            </div>
            )
        })}
    </section>
    )
}