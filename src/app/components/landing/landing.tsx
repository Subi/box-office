"use client"
import styles from './landing.module.css'
import Link from 'next/link'



export default function Landing(){

    return (
        <main id={styles.main}>
            <section id={styles.mainContent}>
                <h1 id={styles.landingHeader}>Curate a list with your creativity & discover new experiences to share.</h1>
                <Link href={"/lists/new"}><button className={styles.landingButton}>Start a list 🍿 </button></Link>
                {/* <span className={styles.quotes}> &quot;Theory Will Take You Only So Far.&quot; - Oppenheimer</span> */}
            </section>
        </main>
    )
}