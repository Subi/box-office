/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: "www.themoviedb.org",
                port: '',
            }
        ],
        domains: ["www.themoviedb.org"]
    }
}

module.exports = nextConfig
