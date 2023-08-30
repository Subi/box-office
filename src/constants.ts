const searchUrl = 'https://api.themoviedb.org/3/search/movie'
const movieUrl = `https://api.themoviedb.org/3/movie/`
const trendingUrl = 'https://api.themoviedb.org/3/trending/movie/week?language=en-US'


const locale = {
    us: "US"
}

const jobs = {
    producer: "Producer",
    writers:  "Writing",
    director: "Directing"
}

const videoTypes = {
    trailer: "Offical Trailer"
}

export {
    searchUrl,
    movieUrl,
    trendingUrl,
    locale,
    jobs,
    videoTypes
}