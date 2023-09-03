import moment from 'moment';
import styles from './page.module.css';
import Image from 'next/image';
import { unfavorited , playIcon } from '@/images';
import MovieContent from '@/app/components/movieContent/movieContent';
import { jobs, locale, movieUrl, videoTypes } from '@/constants';
import { Movie } from '@/types'
import Link from 'next/link';
import { createOpts } from '@/app/util/helper';

interface MoviePageProps {
    params: { id:string}
}

async function getmovieDetails(id:string):Promise<Movie> {
    const res = await fetch(`${movieUrl}/${id}?append_to_response=credits,release_dates,videos,images` , createOpts("GET"))
    if(!res.ok) {
        throw new Error(`Failed fetching ${id} movie details`)
    }
    return res.json()
}

export default async function Page({params}:MoviePageProps){
    const data:Movie =  await getmovieDetails(params.id)

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
        return data.videos.results.find(video => video.name === videoTypes.trailer)?.key 
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
                        <span>{formatRuntime()}</span>
                        <span>{getMovieReleaseRating(locale.us)}</span>
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
                        <Link href={"https://form.typeform.com/to/EYD74sa8"}><button className={styles.actionButton}>Add to Watchlist</button></Link>
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
                        <Link href={`https://youtu.be/${getTrailerUrl()}`} target='_blank'>
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
                            <li>Director : {getCrew(jobs.director)} </li>
                            <li>Writer : {getCrew(jobs.writers)}</li>
                        </ul>
                    </div>
                </div>
            </section>
            <div className={styles.backdropImageContainer}>
                <img style={{backgroundImage: `url(https://www.themoviedb.org/t/p/original/${data.backdrop_path})`}}/>
            </div>
            <div className={styles.backdropMask}></div>
            <MovieContent casts={data.credits.cast}/>
        </main>
        </>
    )
}