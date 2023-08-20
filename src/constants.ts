export const searchUrl = 'https://api.themoviedb.org/3/search/movie';


export const createOpts = (method:string) => {
    return {
        "method": method,
        "headers": {
            "accept": 'application/json',
            "Authorization": `Bearer ${process.env.ACCESS_TOKEN}`
        }
    }
}