"use client"
import { MovieData } from '@/types'
import styles from './searchResults.module.css'
import Image from "next/image"
import Link from "next/link"
import { threeDotIcon } from '@/images'
import { useState } from 'react'
import { addToList } from '@/app/util/helper'

export interface ISearchedResultsList {
    movies: MovieData[]
}

export default function SearchedResultsList({movies}:ISearchedResultsList) {
    const [resultIndex , setResultIndex] = useState<number | null>(null)


    if(movies.length < 1) {
        return ""
    }   
    
    const updateHandler = (listName:string , movie:MovieData) => {
        setResultIndex(null)
        addToList(listName , movie)
    }

    return (
        <div id={styles.searchResultsContainer}>
            <div id={styles.results}>
                <header>Movies</header>
                {movies.map((movie:MovieData , index:number) => {
                    return (
                        <div id={styles.resultItem} key={index}>
                            <div style={{display: "flex" , justifyContent: "space-between"}}>
                            <div className={styles.resultItemCover}>
                            <Image
                                src={`https://www.themoviedb.org/t/p/original/${movie.poster_path}`} 
                                alt={`${movie.title}`}
                                fill
                                style={{objectFit:"contain" , objectPosition:"50% 25%"}}
                                />
                            </div>
                            <div className={styles.info}>
                                <span className={styles.title}>{movie.title}</span>
                                <span className={styles.release}>{movie.release_date.split("-")[0]}</span>
                            </div>
                            </div>
                            <div className={styles.itemMore} onClick={() => setResultIndex(index)}>
                                <Image 
                                src={threeDotIcon}
                                alt='three dot icon'
                                fill
                                />-
                            </div>
                            <div className={resultIndex != index ? styles.hide : styles.moreContainer}>
                                <div onClick={() => {updateHandler("Watchlist" , movie)}}>
                                    Add to watchlist
                                </div>
                            </div>
                        </div>  
                    )
                }).splice(0 , 3)}
            </div>
        </div>
    )
}