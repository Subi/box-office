import styles from './watchlist.module.css'
import { Entry } from '@prisma/client'
import Link from 'next/link'
import Image from 'next/image'
import { WatchlistProps } from './watchlist'


export default function TableView({watchlist}:WatchlistProps) {
    return (
        <div id={styles.tableViewContainer}>
            <div className={styles.headerRow}>
                <div className={styles.cover}></div>
                <div className={styles.title}>Title</div>
                <div className={styles.type}>Type</div>
            </div>
            <div className={styles.tableEntries}>
                {!watchlist ? "" : watchlist.map((entry , index) => {
                    return (
                        <div className={styles.listEntry} key={index}>
                              <div className={styles.float}>
                                <Image
                                   src={`https://www.themoviedb.org/t/p/original${entry.poster_image}`}
                                   alt='movie cover'
                                   fill
                                   quality={100}
                                   style={{objectFit: "contain" , objectPosition: "50%" , backgroundRepeat: "no-repeat"}}
                                />
                              </div>
                              <Link href={`/movie/${entry.id}`}>
                            <div className={styles.previewImage}>
                                <Image 
                                src={`https://www.themoviedb.org/t/p/original${entry.poster_image}`}
                                alt='movie cover'
                                fill
                                quality={100}
                                style={{objectFit: "cover" , objectPosition: "50%" , backgroundRepeat: "no-repeat"}}
                                />
                            </div>
                            </Link>
                            <div className={styles.entryTitle}>{entry.name}</div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}