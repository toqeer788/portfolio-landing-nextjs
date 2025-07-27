import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import ErrorBoundary from '@/components/ui/ErrorBoundary';
import './globals.css';

const inter = Inter({
	subsets: ['latin', 'cyrillic'],
	variable: '--font-inter',
	display: 'swap',
	preload: true,
});

const jetbrainsMono = JetBrains_Mono({
	subsets: ['latin'],
	variable: '--font-jetbrains-mono',
	display: 'swap',
	preload: true,
});

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
	maximumScale: 5,
	userScalable: true,
	themeColor: '#FECD45',
};

export const metadata: Metadata = {
	metadataBase: new URL('https://pryanishnikov.dev'),
	title: {
		default: 'Артём Прянишников - Full-Stack Developer & AI Specialist',
		template: '%s | Артём Прянишников',
	},
	description:
		'Превращаю сложные идеи в элегантные цифровые решения. Full-Stack разработчик, специалист по AI и Fintech эксперт с 5+ годами опыта.',
	keywords: [
		'веб-разработка',
		'full-stack',
		'AI',
		'fintech',
		'React',
		'Next.js',
		'TypeScript',
		'разработчик',
		'программист',
		'веб-приложения',
	],
	authors: [{ name: 'Артём Прянишников' }],
	creator: 'Артём Прянишников',
	openGraph: {
		title: 'Артём Прянишников - Full-Stack Developer & AI Specialist',
		description: 'Превращаю сложные идеи в элегантные цифровые решения',
		type: 'website',
		locale: 'ru_RU',
		url: 'https://pryanishnikov.dev',
		siteName: 'Артём Прянишников - Portfolio',
		images: [
			{
				url: '/og-image.jpg',
				width: 1200,
				height: 630,
				alt: 'Артём Прянишников - Full-Stack Developer',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Артём Прянишников - Full-Stack Developer & AI Specialist',
		description: 'Превращаю сложные идеи в элегантные цифровые решения',
		images: ['/og-image.jpg'],
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
	verification: {
		google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
		yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
	},
	alternates: {
		canonical: 'https://pryanishnikov.dev',
	},
};

// Structured Data для SEO
const structuredData = {
	'@context': 'https://schema.org',
	'@type': 'Person',
	name: 'Артём Прянишников',
	jobTitle: 'Full-Stack Developer & AI Specialist',
	description: 'Превращаю сложные идеи в элегантные цифровые решения',
	url: 'https://pryanishnikov.dev',
	image: 'https://pryanishnikov.dev/profile.jpg',
	sameAs: [
		'https://github.com/pryanishnikov',
		'https://linkedin.com/in/pryanishnikov',
		'https://t.me/pryanishnikov_dev',
	],
	knowsAbout: [
		'React',
		'Next.js',
		'TypeScript',
		'Node.js',
		'Python',
		'AI/ML',
		'Fintech',
	],
	worksFor: {
		'@type': 'Organization',
		name: 'Freelance',
	},
	contactPoint: {
		'@type': 'ContactPoint',
		contactType: 'customer service',
		email: 'hello@pryanishnikov.dev',
		availableLanguage: 'Russian',
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="ru" className={`${inter.variable} ${jetbrainsMono.variable}`}>
			<head>
				{/* Preconnect для оптимизации загрузки */}
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossOrigin="anonymous"
				/>

				{/* DNS prefetch для внешних ресурсов */}
				<link rel="dns-prefetch" href="//vercel.live" />
				<link rel="dns-prefetch" href="//fonts.googleapis.com" />

				{/* Structured Data */}
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(structuredData),
					}}
				/>
			</head>
			<body className="antialiased" suppressHydrationWarning={true}>
				<ErrorBoundary>{children}</ErrorBoundary>
				<Analytics />
				<SpeedInsights />
			</body>
		</html>
	);
}
