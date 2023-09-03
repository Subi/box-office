import { Movie } from '@/types';
import Image from 'next/image';
import styles from './movieCard.module.css';
import Link from 'next/link';

export interface MovieCardProps {
    movie: Movie
}

export default function MovieCard({movie}:MovieCardProps) {
    return (
        <Link href={`/movie/${movie.id}`}>
        <div className={styles.mediaCard} >
        <Image
        src={`https://www.themoviedb.org/t/p/original/${movie.poster_path}`}
        alt={movie.title}
        fill
        sizes="(max-width: 176px) 100vw , 150px"
       />
        </div>
        </Link>
    )
}