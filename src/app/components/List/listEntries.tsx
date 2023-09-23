import { MovieData } from '@/types';
import styles from './listform.module.css';
import Image from 'next/image';
import { Entry } from '@/app/[user]/watchlist/page';


interface ListEntriesProps {
    entries: Entry[] 
}

export default function ListEntries({entries}:ListEntriesProps) {
    if(entries.length < 1) return
    return (
        <div id={styles.listEntriesContainer} >
            {entries.map((entry , index) => {
                return (
                    <div className={styles.entry} key={index}>
                        <Image
                        src={`https://www.themoviedb.org/t/p/original${entry.poster_image}`}
                        alt={entry.name}
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