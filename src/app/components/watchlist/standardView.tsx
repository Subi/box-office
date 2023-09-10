import styles from './watchlist.module.css';
import Image from 'next/image';
import { WatchlistProps } from "./watchlist"



export default function StandardView({watchlist}:WatchlistProps){
    return (
        <div id={styles.standardViewContainer}>
        {!watchlist ? "" : watchlist.map((movie , index) => {
                return (
                    <div className={styles.mediaCard} key={index}>
                        <Image
                        src={`https://www.themoviedb.org/t/p/original${movie.poster_image}`}
                        alt={movie.name}
                        fill
                        priority
                        quality={100}
                        style={{objectFit: "contain"}}
                        />
                    </div>
                )
            })}  
        </div>

    )
}