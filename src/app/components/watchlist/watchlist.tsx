"use client"
import styles from './watchlist.module.css'
import TableView from './tableview'
import Image from 'next/image'
import { Entry } from '@prisma/client'
import StandardView from './standardView'
import { listViewIcon, standardViewIcon } from '@/images'
import { useState } from 'react'

export type WatchlistProps =  {
    watchlist:Entry[] | undefined
}

export default function Watchlist({watchlist}:WatchlistProps){
    const [currentView , setCurrentView] = useState<boolean>(true)
        
    return (
        <>
        <div id={styles.watchlistContainer}>
            <div id={styles.sidebar}>
            </div>
            <div id={styles.watchlist}>
                <div className={styles.header}>
                <header>Watchlist</header>
                <div className={styles.viewActionContainer}>
                    <Image className={styles.listViewIcon} src={listViewIcon} alt='list view icon' height={20} width={20} onClick={() => setCurrentView(false)}/>
                    <Image src={standardViewIcon} alt='list view icon' height={20} width={20} onClick={() => setCurrentView(true)}/>
                </div>
                </div>
            {currentView ? <StandardView watchlist={watchlist}/> : <TableView watchlist={watchlist}/> }
            </div>
        </div>
        </>
    )
}