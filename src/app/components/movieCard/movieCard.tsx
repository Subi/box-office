import { Movie } from '@/app/api/movies/search/route';
import Image from 'next/image';
import styles from './movieCard.module.css';
import {redirect } from 'next/navigation'
import Link from 'next/link';

export interface MovieCardProps {
    movie: Movie
}


export default function MovieCard({movie}:MovieCardProps) {
    return (
        <div className={styles.mediaCard} >
        <Link href={`/movie/${movie.id}`}>
        <Image
        src={`https://www.themoviedb.org/t/p/original/${movie.poster_path}`}
        alt={movie.title}
        layout='fill'
        objectFit='cover'
       />
        </Link>
        </div>
    )
}