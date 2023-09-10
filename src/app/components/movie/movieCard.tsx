import { MovieData } from '@/types';
import Image from 'next/image';
import styles from './movieCard.module.css';
import Link from 'next/link';

export interface MovieCardProps {
    movie: MovieData
}

export default function MovieCard({movie}:MovieCardProps) {
    return (
        <Link href={`/movie/${movie.id}`}>
        <div className={styles.mediaCard} >
        <Image
        src={`https://www.themoviedb.org/t/p/original/${movie.poster_path}`}
        alt={movie.title}
        fill
        quality={100}
        style={{objectFit: "contain"}}
        sizes="(max-width: 176px) 100vw , 150px"
        priority
       />
        </div>
        </Link>
    )
}