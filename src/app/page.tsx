import Landing from './components/landing/landing'
import MoviesLanding from './components/landingMovies/landingMovies'

export default function Home() {
  return (
    <>
    <div id='mainWrapper'>
      <Landing/>
      <MoviesLanding/>
    </div>
    </>
  )
}
