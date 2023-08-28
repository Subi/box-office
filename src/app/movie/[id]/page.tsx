import moment from 'moment';
import styles from './page.module.css';
import Image from 'next/image';
import { unfavorited , playIcon } from '@/images';
import MovieContent from '@/app/components/movieContent/movieContent';
import { jobs, locale, videos } from '@/constants';
import { Movie } from '@/app/api/movies/search/route';
import Link from 'next/link';

interface MoviePageProps {
    params: { id:string}
}

interface MovieResponse {
    success: string
    data: Movie
}

async function getmovieDetails(id:string):Promise<MovieResponse> {
    const res = await fetch(`http://localhost:3000/api/movies/movie?id=${id}` , {method:"GET" , cache: "no-cache"})
    if(!res.ok) {
        throw new Error(`Failed fetching ${id} movie details`)
    }
    return res.json()
}

export default async function Page({params}:MoviePageProps){
    const {data}:MovieResponse =  await getmovieDetails(params.id)

    const getMovieReleaseRating = (iso:string):string | undefined => {
        return data.release_dates.results.find(result => result.iso_3166_1 === iso)?.release_dates.find(release => release.certification)?.certification
    }

    const getCrew = (postion:string):string | undefined => { 
        return data.credits.crew.sort((a , b) => 
            {return b.popularity - a.popularity})
            .find(c => c.department === postion)?.name
    }
    
    const formatRuntime = ():string => {
        return `${data.runtime % 60 != 0 ? `${Math.floor(data.runtime / 60)}h ${data.runtime % 60}m` :`${data.runtime / 60}h`}`
    }

    const getTrailerUrl = ()  => {
        return data.videos.results.find(video => video.name === "Official Trailer")?.key 
    }


    return (
        <>
           <main id={styles.main}>
            <section className={styles.movieDetailsContainer}>
                <div className={styles.moviePosterCard}>
                <Image
                src={`https://www.themoviedb.org/t/p/original/${data.poster_path}`}
                alt={data.title}
                layout='fill'
                objectFit='cover'
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
                        <span>{formatRuntime()}</span>
                        <span>{getMovieReleaseRating(locale.us)}</span>
                        </div>
                        <div className={styles.genres}>
                        {data.genres.map((genre , index) => {
                            if(index < 2) {
                                return (
                                    <span className={styles.genre}>{genre.name}</span>
                                )
                            }
                        })}
                        </div>
                    </div>
                    <div className={styles.actionButtons}>
                        <Link href={"https://form.typeform.com/to/EYD74sa8"}><button className={styles.actionButton}>Add to Watchlist</button></Link>
                        <Link href={"https://form.typeform.com/to/EYD74sa8"}>
                        <div className={styles.favorite}>
                            <Image
                            alt='favorited'
                            src={unfavorited}
                            width={30}
                            height={30}
                            />
                        </div>
                        </Link>
                        <Link href={`https://youtu.be/${getTrailerUrl()}`} target='_blank'>
                        <div className={styles.favorite}>
                            <Image
                            alt='play trailer'
                            src={playIcon}
                            width={30}
                            height={30}
                            />
                        </div>
                        </Link>
                    </div>
                    <span style={{fontStyle: 'italic' , padding: '2em 0' }}>{data.tagline}</span>
                    <div className={styles.overview}>
                        <h1>Overview</h1>
                        {data.overview}
                    </div>
                    <div className={styles.crew}>
                        <ul>
                            <li>Director : {getCrew(jobs.director)}</li>
                            <li>Writer : {getCrew(jobs.writers)}</li>
                        </ul>
                    </div>
                </div>
            </section>
            <MovieContent casts={data.credits.cast}/>
        </main>
        </>
    )
}