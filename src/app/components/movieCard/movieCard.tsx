import { Movie } from '@/types';
import Image from 'next/image';
import styles from './movieCard.module.css';
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
        fill={true}
        priority
       />
        </Link>
        </div>
    )
}