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
                protocol: 'http',
                hostname: "img.cleark.com",
                port: '',
            },
            {
                protocol: 'http',
                hostname: "image.tmdb.org",
                port: '',
            }
        ],
        domains: ["www.themoviedb.org" , "img.clerk.com" , "image.tmdb.org"]
    }
}

module.exports = nextConfig
