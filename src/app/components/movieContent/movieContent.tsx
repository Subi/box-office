import { Cast} from '@/types'
import { blankProfile } from '@/images'
import styles from './movieContent.module.css'
import Image from 'next/image'


interface MovieContentProps {
    casts: Cast[]
}

export default function MovieContent({casts}:MovieContentProps) {
    return (
        <section className={styles.contentContainer}>
            <div className={styles.contentSidebar}>
                
            </div>
            <div className={styles.contentOverview}>
                <nav className={styles.overviewNav}>
                    <ul>
                        <li className={styles.selected}>Cast</li>
                        <li>Videos</li>
                        <li>Review</li>
                    </ul>
                </nav>
            <div className={styles.contentScroller}>
                {casts.map(cast => {
                    return (
                        <div className={styles.castCard} key={cast.id}>
                            <div className={styles.castCardAvatar}>
                            <Image
                            src={`https://image.tmdb.org/t/p/original/${cast.profile_path}`}
                             fill={true}
                             alt={cast.name}
                             quality={100}
                             priority
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
            </div>
        </section>
    )
}