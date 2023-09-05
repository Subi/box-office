import styles from './watchlist.module.css'
import { trendingUrl } from '@/constants'
import { createOpts } from '@/app/util/helper'
import { Movie } from '@/types'
import Image from 'next/image'

type MovieResponse = {
    page: number
    results: Movie[]
}

async function getDummyData():Promise<MovieResponse>{
    const res = await fetch(trendingUrl ,  createOpts("GET"  , {revalidate: 3600}))
    if(!res.ok) {
        throw new Error("Failed fetching trending movies")
    }
    return res.json()

}


export default async function Watchlist(){
    const {results}: {results:Movie[]} =  await getDummyData()
    return (
        <>
        <div id={styles.watchlistContainer}>
            <div id={styles.sidebar}></div>
            <div id={styles.watchlist}>
                {/* <div style={{display: "flex" , "justifyContent": "flex-end"}}></div> */}
                <header>Your Watchlist</header>
            <div id={styles.listContainer}>
                {results.map((movie , index) => {
                    return (
                        <div className={styles.mediaCard} key={index}>
                            <Image
                            src={`https://www.themoviedb.org/t/p/original/${movie.poster_path}`}
                            alt={movie.title}
                            fill
                            quality={100}
                            style={{objectFit: "contain"}}
                            />
                        </div>
                    )
                }).slice(0 , 7)}   
             </div>
            </div>
        </div>
        </>
    )
}