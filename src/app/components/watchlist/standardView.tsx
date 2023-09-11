import styles from './watchlist.module.css';
import Image from 'next/image';
import { WatchlistProps } from "./watchlist"
import Link from 'next/link';



export default function StandardView({watchlist}:WatchlistProps){
    return (
        <div id={styles.standardViewContainer}>
        {!watchlist ? "" : watchlist.map((entry , index) => {
                return (
                    <Link href={`/movie/${entry.id}`} key={index}>
                    <div className={styles.mediaCard}>
                        <Image
                        src={`https://www.themoviedb.org/t/p/original${entry.poster_image}`}
                        alt={entry.name}
                        fill
                        priority
                        quality={100}
                        style={{objectFit: "contain"}}
                        />
                    </div>
                    </Link>
                )
            })}  
        </div>

    )
}