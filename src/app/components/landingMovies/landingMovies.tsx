import { Movie } from '@/app/api/movies/search/route'
import styles from './landingMovies.module.css'
import Image from 'next/image'




async function getTrendingMovies():Promise<Movie[]> {
    const res =  await fetch("http://localhost:3000/api/movies/trending" , {method:"GET" , cache: 'no-cache'})
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
                                <div className={styles.mediaCard}>
                                    <Image
                                    src={`https://www.themoviedb.org/t/p/original/${movie.poster_path}`}
                                    alt={movie.title}
                                    layout='fill'
                                    objectFit='cover'
                                   />
                                  {/* <div className={styles.hoverData}>
                                        <div className={styles.header}>
                                            <span>{movie.title}</span>
                                            <p>{movie.release_date.split("-")[0]} </p>
                                            
                                        </div>
                                        <div className={styles.overview}>
                                            <span>{movie.overview}</span>
                                        </div>
                                        <div className={styles.crew}>
                                            Director:  <span>{movie.credits.crew.find(c => c.job === "Director")?.name}</span>
                                        </div>
                                        <div className={styles.genres}>
                                            {movie.genres.map((genre , index) => {
                                                if(index < 2) {
                                                    return (
                                                        <span className={styles.genre}>{genre.name}</span>
                                                    )
                                                }
                                            })}
                                        </div>
                                    </div> */}
                                    </div>
                                )
                        }
                    )}
                </div>
            </section>
        </section>
    )
}