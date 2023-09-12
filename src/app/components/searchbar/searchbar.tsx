"use client"
import styles from './searchbar.module.css'
import {searchBarIcon} from '@/images';
import Image from 'next/image';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import useDebounce from '@/app/hooks/useDebounce';
import { MovieData } from '@/types'
import SearchedResults from './searchResults';

interface SeachbarProps {
    overlay:boolean
    setOverlay(value:boolean):void
}

export default function SearchBar({overlay, setOverlay}:SeachbarProps) {
    const overlayRef:MutableRefObject<null | HTMLElement> = useRef(null)
    const [input , setInput] = useState<string>("")
    const [searchedResults , setSearchedResults] = useState<MovieData[]>([])
    const debouncedSearch: string | undefined  = useDebounce(input , 150)

    const searchMovie = async (title:string) => {
        const response = await fetch(`api/movies/search?title=${title}`)
        const {searchedMovieResults} =  await response.json()       
        setSearchedResults(searchedMovieResults)
    }

    const clearAll = () => {
        setOverlay(false)
        setSearchedResults([])
        setInput("")
    }

    useEffect(() => {
        document.addEventListener('mousedown' , (e:MouseEvent) => {
            const target:HTMLElement =  e.target as HTMLElement
            if(target.nodeName === "MAIN") {
                clearAll()
            }
        })
    })

    useEffect(() => {
        if(!debouncedSearch) return
        searchMovie(debouncedSearch)
    } , [debouncedSearch])


    useEffect(() => {
    },[searchedResults])


    return (
        <main id={!overlay ? styles.hide :  styles.searchOverlay } ref={overlayRef}>
            <div id={styles.searchBarContainer}>
                <span className={styles.searchBarIcon}>
                <Image src={searchBarIcon} alt='search_icon' height={16} width={16}/>
                </span>
                <input className={styles.searchBar} type='text' value={input} placeholder='Search for a movie' onChange={(e) => setInput(e.target.value)}/>
            </div>
            <SearchedResults movies={searchedResults} />
        </main>
    )



    // return (
    //     <div className={styles.searchBarContainer}>
    //         <input className={styles.searchBar} type='text' placeholder='Search for a movie' onChange={(e) => setInput(e.target.value)}/>
    //         <span className={styles.searchBarIcon}>
    //             <Image src={searchBarIcon} alt='search_icon' height={18} width={18}/>
    //         </span>
    //     </div>
    // )
}