/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: "www.themoviedb.org",
                port: '',
            },
            {
                protocol: 'https',
                hostname: "img.clerk.com",
                port: '',
            },
            {
                protocol: 'http',
                hostname: "image.tmdb.org",
                port: '',
            },
            {
                protocol: 'http',
                hostname: "pbs.twimg.com",
                port: '',
            }
        ],
        domains: ["www.themoviedb.org" , "img.clerk.com" , "image.tmdb.org" , "pbs.twimg.com"]
    }
}

module.exports = nextConfig
