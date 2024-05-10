/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        NEXTAUTH_URL: process.env.NEXTAUTH_URL,
        appDir: true,
        NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    },
    
    images: {
        domains: ['lh3.googleusercontent.com']
    }
}

export default nextConfig;
