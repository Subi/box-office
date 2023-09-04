import styles from './page.module.css';
import Footer from './components/footer/footer'
import Landing from './components/landing/landing'
import MoviesLanding from './components/landingMovies/landingMovies'
export default function Home() {
  return (
    <>
    <div id={styles.mainWrapper}>
      <Landing/>
      <MoviesLanding/>
      <Footer/>
    </div>
    </>
  )
}
