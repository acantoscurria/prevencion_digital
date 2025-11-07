/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  // Aplicar basePath y assetPrefix sólo en producción. Durante el desarrollo
  // servimos la app en la raíz (/) para evitar 404 en http://localhost:3000
  ...(isProd
    ? {
        basePath: '/prevencion_digital',
        assetPrefix: '/prevencion_digital/',
      }
    : {}),
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
