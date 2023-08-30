import { Cast, Movie } from '@/types'
import styles from './movieContent.module.css'
import Image from 'next/image'


interface MovieContentProps {
    casts: Cast[]
}

export default function MovieContent({casts}:MovieContentProps) {
    return (
        <section className={styles.content}>
            <header>
                <nav id={styles.contentNav}></nav>
            </header>
            <div className={styles.contentTitle}>
                <span>Cast</span>
            </div>
            <div className={styles.contentScroller}>
                {casts.map(cast => {
                    return (
                        <div className={styles.castCard} key={cast.id}>
                            <div className={styles.castCardAvatar}>
                            <Image
                            src={`https://www.themoviedb.org/t/p/original/${cast.profile_path}`}
                             layout='fill'
                             objectFit='cover'
                             alt={cast.name}
                             quality={100}
                            />
                            </div>
                            <div className={styles.castInfo}>
                            <span>{cast.name}</span>
                            <span>{cast.character}</span>
                            </div>
                        </div>
                    )
                }).slice(0 , 15)}
            </div>
        </section>
    )
}