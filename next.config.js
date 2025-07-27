/** @type {import('next').NextConfig} */
const nextConfig = {
	// Оптимизация пакетов
	experimental: {
		optimizePackageImports: ['lucide-react', 'framer-motion'],
		scrollRestoration: true,
	},

	// Оптимизация изображений
	images: {
		deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
		imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
		minimumCacheTTL: 60,
		formats: ['image/webp', 'image/avif'],
	},

	// Удаление console.log в продакшене
	compiler: {
		removeConsole: process.env.NODE_ENV === 'production',
	},

	// Заголовки безопасности
	async headers() {
		return [
			{
				source: '/(.*)',
				headers: [
					{
						key: 'X-Frame-Options',
						value: 'DENY',
					},
					{
						key: 'X-Content-Type-Options',
						value: 'nosniff',
					},
					{
						key: 'Referrer-Policy',
						value: 'origin-when-cross-origin',
					},
					{
						key: 'Permissions-Policy',
						value: 'camera=(), microphone=(), geolocation=()',
					},
				],
			},
		];
	},

	// Оптимизация webpack
	webpack: (config, { dev, isServer }) => {
		if (!dev && !isServer) {
			// Оптимизация для продакшена
			config.optimization.splitChunks = {
				chunks: 'all',
				cacheGroups: {
					vendor: {
						test: /[\\/]node_modules[\\/]/,
						name: 'vendors',
						chunks: 'all',
					},
				},
			};
		}
		return config;
	},
};

// Bundle analyzer (только при ANALYZE=true)
if (process.env.ANALYZE === 'true') {
	// eslint-disable-next-line @typescript-eslint/no-require-imports
	const withBundleAnalyzer = require('@next/bundle-analyzer')({
		enabled: true,
	});
	module.exports = withBundleAnalyzer(nextConfig);
} else {
	module.exports = nextConfig;
}
