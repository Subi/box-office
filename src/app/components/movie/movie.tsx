"use client"
import styles from './movie.module.css';
import Image from 'next/image';
import moment from 'moment';
import { MovieData } from '@/types';
import { locale , jobs, videoTypes} from '@/constants';
import { unfavorited , playIcon } from '@/images';
import Link from 'next/link';
import MovieContent from './movieContent';
import { useRouter } from 'next/navigation';
import { getMovieReleaseRating , formatRuntime , getCrew , getTrailerUrl , backdropImage} from '@/app/util/movie/helper'; 
import { createOpts } from '@/app/util/helper';

interface MovieComponent {
    data: MovieData,
    username: string | null | undefined
    email: string | undefined
}


export default function Movie({data , username, email}:MovieComponent){
    const router = useRouter()

    const addToWatchlist = async () => {
        const response = await fetch('/api/lists' , {
            method: "PATCH",
            body: JSON.stringify({
                "username": username,
                "email": email,
                "data": {
                    title: data.title,
                    poster: data.poster_path,
                    id:data.id
                }
            })
        })
    }    
    
    return (
    <>
    <main id={styles.main}>
     <section className={styles.movieDetailsContainer}>
         <div className={styles.moviePosterCard}>
         <Image
         src={`https://image.tmdb.org/t/p/original/${data.poster_path}`}
         alt={data.title}
         fill={true}
         unoptimized
         quality={100}
         />
         </div>
         <div className={styles.movieDetails}>
             <header>
             <span>
             {data.title}
             </span>
             <span className={styles.year}>
             ({moment(data.release_date.split("-")[0]).format('YYYY')})
             </span>
             </header>
             <div className={styles.movieInfo}>
                 <div className={styles.releaseInfo}>
                 <span>{moment(data.release_date).format('L')}</span>
                 <span>{formatRuntime(data)}</span>
                 <span>{getMovieReleaseRating(data, locale.us)}</span>
                 </div>
                 <div className={styles.genres}>
                 {data.genres.map((genre , index) => {
                     if(index < 2) {
                         return (
                             <span className={styles.genre} key={index}>{genre.name}</span>
                         )
                     }
                 })}
                 </div>
             </div>
             <div className={styles.actionButtons}>
                 <button className={styles.actionButton} onClick={() => {!username ? router.push("/sign-in") : addToWatchlist()  }}>Add to Watchlist</button>
                 <Link href={"https://form.typeform.com/to/EYD74sa8"}>
                 <div className={styles.favorite}>
                     <Image
                     alt='favorited'
                     src={unfavorited}
                     width={25}
                     height={25}
                     />
                 </div>
                 </Link>
                 <Link href={`https://youtu.be/${getTrailerUrl(data)}`} target='_blank'>
                 <div className={styles.favorite}>
                     <Image
                     alt='play trailer'
                     src={playIcon}
                     width={25}
                     height={25}
                     />
                 </div>
                 </Link>
                 <span>Play Trailer</span>
             </div>
             <span style={{fontStyle: 'italic' , padding: '2em 0' }}>{data.tagline}</span>
             <div className={styles.overview}>
                 <h1>Overview</h1>
                 {data.overview}
             </div>
             <div className={styles.crew}>
                 <ul>
                     <li>Director : {getCrew(data , jobs.director)} </li>
                     <li>Writer : {getCrew(data , jobs.writers)}</li>
                 </ul>
             </div>
         </div>
     </section>
     <div className={styles.backdropImageContainer}>
         <img  alt={"backdrop image"} style={{backgroundImage: `url(${backdropImage(data.backdrop_path)})`}}/>
     </div>
     <div className={styles.backdropMask}></div>
     <MovieContent casts={data.credits.cast}/>
 </main>
    </>
    )
}