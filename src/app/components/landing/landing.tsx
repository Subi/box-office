"use client"
import styles from './landing.module.css';
import SearchBar from '../searchbar/searchbar';
import {MutableRefObject,useEffect,useRef, useState } from 'react'



export default function Landing(){
  const mainRef:MutableRefObject<null | HTMLElement> = useRef(null)
  const [searchModalClosed , setSearchModalClosed] = useState(false)

  const searchModalHandler = ({target}:MouseEvent) => { // Show or hide modal depending on where user has clicked on the screen
    const targetElement  = target as HTMLElement
    if(mainRef.current?.contains(targetElement)){
      if(targetElement.id.includes("landing")) {
        setSearchModalClosed(true)
      } else if(targetElement.id == "") {
        setSearchModalClosed(false)
      }
      return
      }
    }
  
    useEffect(() => {
      document.addEventListener('mousedown' , (ev:MouseEvent) => {
        searchModalHandler(ev)
      })
    } , [])


    return (
        <main id={styles.main} ref={mainRef}>
            <section id={styles.mainContent}>
                <h1>Share your love for movies and discover new ones to love.</h1>
                <span className={styles.quotes}> " Why So Serious ? " - Joker ( The Dark Knight )</span>
                <SearchBar modalClosed={searchModalClosed}/>
            </section>
        </main>
    )
}