import styles from './page.module.css'
import SearchBar from './components/searchbar/searchbar'

export default function Home() {
  return (
    <main id={styles.main}>
        <section id={styles.mainContent}>
          <h1>Share your love for movies and discover new ones to love.</h1>
          <SearchBar/>
        </section>
    </main>
  )
}
