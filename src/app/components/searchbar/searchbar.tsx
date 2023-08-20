import styles from './searchbar.module.css';
import {searchBarIcon} from '@/images';
import Image from 'next/image';

export default function SearchBar() {
    return (
        <div className={styles.searchBarContainer}>
            <input className={styles.searchBar} type='text' placeholder='Search for a movie or series'/>
            <span className={styles.searchBarIcon}>
                <Image src={searchBarIcon} alt='search_icon' height={20} width={20}/>
            </span>
        </div>
    )
}