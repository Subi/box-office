"use client"
import styles from './page.module.css'
import SearchBar from './components/searchbar/searchbar'
import {MutableRefObject, useEffect, useRef } from 'react'


export default function Home() {

  let mainRef:MutableRefObject<null | HTMLElement> = useRef(null)

  useEffect(() => {
    let handler = (e:any) => {
      if(mainRef.current?.contains(e.target)) {
        console.log(mainRef.current)
      }
    }
    document.addEventListener('mousedown' ,  (e) => {
      handler(e)
    })
  } , [])



  return (
    <main id={styles.main} ref={mainRef}>
      {/* <div id={styles.hero}>  // return to this later
        <Image
          src={test}
          alt='test'
          fill={true}
        />
      </div> */}
        <section id={styles.mainContent}>
          <h1>Share your love for movies and discover new ones to love.</h1>
          <span className={styles.quotes}> " Why So Serious ? " - Joker ( The Dark Knight )</span>
          <SearchBar/>
        </section>
    </main>
  )
}
