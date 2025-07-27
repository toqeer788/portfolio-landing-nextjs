import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import HeroSection from '@/components/sections/HeroSection';

// Lazy loading для секций
const AboutSection = dynamic(
	() => import('@/components/sections/AboutSection'),
	{
		loading: () => <SectionLoader />,
	}
);

const ExpertiseSection = dynamic(
	() => import('@/components/sections/ExpertiseSection'),
	{
		loading: () => <SectionLoader />,
	}
);

const ProjectsSection = dynamic(
	() => import('@/components/sections/ProjectsSection'),
	{
		loading: () => <SectionLoader />,
	}
);

const WorkProcessSection = dynamic(
	() => import('@/components/sections/WorkProcessSection'),
	{
		loading: () => <SectionLoader />,
	}
);

const TestimonialsSection = dynamic(
	() => import('@/components/sections/TestimonialsSection'),
	{
		loading: () => <SectionLoader />,
	}
);

const ContactSection = dynamic(
	() => import('@/components/sections/ContactSection'),
	{
		loading: () => <SectionLoader />,
	}
);

// Компонент загрузки для секций
function SectionLoader() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-background-start to-background-end flex items-center justify-center">
			<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FECD45]" />
		</div>
	);
}

// Компонент-обертка для Suspense
function LazySection({ children }: { children: React.ReactNode }) {
	return <Suspense fallback={<SectionLoader />}>{children}</Suspense>;
}

export default function Home() {
	return (
		<main className="min-h-screen">
			{/* Hero секция загружается сразу */}
			<HeroSection />

			{/* Остальные секции загружаются лениво */}
			<LazySection>
				<AboutSection />
			</LazySection>

			<LazySection>
				<ExpertiseSection />
			</LazySection>

			<LazySection>
				<ProjectsSection />
			</LazySection>

			<LazySection>
				<WorkProcessSection />
			</LazySection>

			<LazySection>
				<TestimonialsSection />
			</LazySection>

			<LazySection>
				<ContactSection />
			</LazySection>
		</main>
	);
}
