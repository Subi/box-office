"use client"
import styles from './searchbar.module.css';
import {searchBarIcon} from '@/images';
import Image from 'next/image';
import { useState } from 'react';
import { createOpts } from '@/constants';

export default function SearchBar() {
    const [input , setInput] = useState<string>("")

    const searchMovie = async (title:string) => {
        const response = await fetch(`api/movies/search?t=${title}`)
    }

    const debounceRequest = debounce((title:string) => searchMovie(title), 500)

    const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        setInput(event.target.value)
        searchMovie(input)
    }

    


    return (
        <div className={styles.searchBarContainer}>
            <input className={styles.searchBar} type='text' placeholder='Search for a movie or series' onChange={(e) => debounceRequest(e.target.value)}/>
            <span className={styles.searchBarIcon}>
                <Image src={searchBarIcon} alt='search_icon' height={20} width={20}/>
            </span>
        </div>
    )
}