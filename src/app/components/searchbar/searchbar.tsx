"use client"
import styles from './searchbar.module.css'
import {searchBarIcon} from '@/images';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import useDebounce from '@/app/hooks/useDebounce';
import { Movie } from '@/app/api/movies/search/route';
import SearchedResultsList from '../searchedResultsList/searchedResultsList';


interface ISearch {
    searchMovie(title:string):void
}

export default function SearchBar() {
    const [input , setInput] = useState<string>("")
    const [searchedResults , setSearchedResults] = useState<Movie[]>([])

    const debouncedSearch: string | undefined  = useDebounce(input , 300)


    const searchMovie = async (title:string) => {
        const response = await fetch(`api/movies/search?title=${title}`)
        const {moviesResults} =  await response.json()       
        setSearchedResults(moviesResults)
    }

    useEffect(() => {
        if(!debouncedSearch) return
        searchMovie(debouncedSearch)
    } , [debouncedSearch])


    useEffect(() => {
    },[searchedResults])



    
    return (
        <div className={styles.searchBarContainer}>
            <input className={styles.searchBar} type='text' placeholder='Search for a movie or series' onChange={(e) => setInput(e.target.value)}/>
            <span className={styles.searchBarIcon}>
                <Image src={searchBarIcon} alt='search_icon' height={20} width={20}/>
            </span>
            <SearchedResultsList movies={searchedResults}/>
        </div>
    )
}