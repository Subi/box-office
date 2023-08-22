import { Movie } from "@/app/api/movies/search/route"
import styles from './searchedResults.module.css'
import Image from "next/image"
import { useState } from "react"

export interface ISearchedResultsList {
    movies: Movie[]
}


export default function SearchedResultsList({movies}:ISearchedResultsList) {
    const [closed , isClosed] = useState<boolean>(false)

    if(movies.length < 1) {
        return ""
    }

    return (
        <section className={!closed ? `${styles.movieResultsContainer}` : `${styles.hidden}`}>
        {movies.map(movie => {
            return (
                <div className={styles.movieResult}>
                <div className={styles.movieItem} key={movie.id}>
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
            </div>
            )
        })}
    </section>
    )
}