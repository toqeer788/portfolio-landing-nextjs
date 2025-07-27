import {
	Project,
	Technology,
	Testimonial,
	WorkStep,
	Statistic,
	FAQ,
} from './types';

export const TECHNOLOGIES: Technology[] = [
	// Frontend
	{ name: 'React', category: 'frontend', proficiency: 95, icon: '⚛️' },
	{ name: 'Next.js', category: 'frontend', proficiency: 90, icon: '▲' },
	{ name: 'TypeScript', category: 'frontend', proficiency: 92, icon: '📘' },
	{ name: 'Tailwind CSS', category: 'frontend', proficiency: 88, icon: '🎨' },

	// Backend
	{ name: 'Node.js', category: 'backend', proficiency: 90, icon: '🟢' },
	{ name: 'Python', category: 'backend', proficiency: 85, icon: '🐍' },
	{ name: 'PostgreSQL', category: 'backend', proficiency: 82, icon: '🐘' },
	{ name: 'MongoDB', category: 'backend', proficiency: 80, icon: '🍃' },

	// AI/ML
	{ name: 'OpenAI API', category: 'ai-ml', proficiency: 88, icon: '🤖' },
	{ name: 'Langchain', category: 'ai-ml', proficiency: 85, icon: '🔗' },
	{ name: 'Vector DB', category: 'ai-ml', proficiency: 80, icon: '📊' },

	// DevOps
	{ name: 'Docker', category: 'devops', proficiency: 85, icon: '🐳' },
	{ name: 'Vercel', category: 'devops', proficiency: 90, icon: '▲' },
	{ name: 'AWS', category: 'devops', proficiency: 75, icon: '☁️' },
];

export const PROJECTS: Project[] = [
	{
		id: '1',
		title: 'AI-Powered E-commerce Platform',
		description:
			'Создал интеллектуальную систему рекомендаций для крупного fashion-ритейлера',
		technologies: ['Next.js', 'OpenAI', 'PostgreSQL', 'Stripe'],
		result: '+185% конверсии, -40% bounce rate',
		testimonial: {
			text: 'Артём создал то, что мы даже не могли представить. Наши продажи выросли на 70% за первый месяц.',
			author: 'CTO E-com стартапа',
			position: 'CTO',
		},
	},
	{
		id: '2',
		title: 'Fintech Trading Dashboard',
		description:
			'Разработал real-time трейдинговую платформу с advanced аналитикой',
		technologies: ['React', 'WebSocket', 'D3.js', 'Python'],
		result: '50ms latency, 99.9% uptime',
		testimonial: {
			text: 'Профессионализм на уровне Goldman Sachs. Рекомендую без колебаний.',
			author: 'Hedge Fund Manager',
			position: 'Manager',
		},
	},
	{
		id: '3',
		title: 'Medical AI Assistant',
		description: 'Создал AI-помощника для анализа медицинских данных',
		technologies: ['Python', 'TensorFlow', 'React', 'HIPAA'],
		result: '92% точность диагностики, внедрен в 3 клиниках',
		testimonial: {
			text: 'Революционное решение. Артём понимает не только код, но и бизнес.',
			author: 'CEO MedTech',
			position: 'CEO',
		},
	},
];

export const TESTIMONIALS: Testimonial[] = [
	{
		id: '1',
		text: 'Работать с Артёмом — это как найти единорога в мире разработки. Качество кода, внимание к деталям и понимание бизнеса на недосягаемом уровне.',
		author: 'Founder SaaS стартапа',
		position: 'Founder',
	},
	{
		id: '2',
		text: 'За 5 лет работы в tech не встречал разработчика такого уровня. Решения, которые казались невозможными, Артём делает элегантными и простыми.',
		author: 'VP Engineering в Fintech',
		position: 'VP Engineering',
	},
	{
		id: '3',
		text: 'Не просто программист, а настоящий архитектор цифровых решений. Наш проект окупился за 2 месяца благодаря его работе.',
		author: 'CEO E-commerce',
		position: 'CEO',
	},
];

export const WORK_STEPS: WorkStep[] = [
	{
		id: '1',
		title: 'Исследование',
		description: 'Анализирую требования, изучаю рынок и конкурентов',
		duration: '1-2 дня',
		icon: '🔍',
	},
	{
		id: '2',
		title: 'Архитектура',
		description:
			'Проектирую техническую архитектуру и выбираю оптимальный стек',
		duration: '2-3 дня',
		icon: '🏗️',
	},
	{
		id: '3',
		title: 'Разработка',
		description: 'Пишу чистый, масштабируемый код с тестами',
		duration: '2-4 недели',
		icon: '💻',
	},
	{
		id: '4',
		title: 'Тестирование',
		description: 'Провожу комплексное тестирование и оптимизацию',
		duration: '3-5 дней',
		icon: '🧪',
	},
	{
		id: '5',
		title: 'Деплой',
		description: 'Разворачиваю проект на продакшн с мониторингом',
		duration: '1-2 дня',
		icon: '🚀',
	},
	{
		id: '6',
		title: 'Поддержка',
		description: 'Обеспечиваю техническую поддержку и развитие',
		duration: 'Постоянно',
		icon: '🛠️',
	},
];

export const STATISTICS: Statistic[] = [
	{ label: 'Проектов', value: 100, suffix: '+' },
	{ label: 'Клиентов', value: 50, suffix: '+' },
	{ label: 'Лет опыта', value: 5, suffix: '' },
	{ label: 'Технологий', value: 15, suffix: '+' },
];

export const FAQ_DATA: FAQ[] = [
	{
		question: 'Сколько времени занимает разработка проекта?',
		answer:
			'Время зависит от сложности проекта. Простые лендинги — 1-2 недели, сложные веб-приложения — 1-3 месяца. Всегда предоставляю детальный план с временными рамками.',
	},
	{
		question: 'Работаете ли вы с существующими проектами?',
		answer:
			'Да, часто дорабатываю и оптимизирую существующие проекты. Могу интегрировать новые функции, исправить баги или полностью переписать код.',
	},
	{
		question: 'Какие гарантии вы предоставляете?',
		answer:
			'Предоставляю гарантию на код 3 месяца после сдачи проекта. Всегда доступен для консультаций и исправления критических ошибок.',
	},
	{
		question: 'Можете ли вы помочь с хостингом и доменом?',
		answer:
			'Да, помогу с выбором хостинга, настройкой домена и деплоем проекта. Рекомендую Vercel для Next.js проектов и AWS для сложных приложений.',
	},
];

export const CONTACT_INFO = {
	telegram: '@FrankFMY',
	email: 'pryanishnikovartem@gmail.com',
	responseTime: '2 часа в рабочее время',
};

export const SOCIAL_LINKS = {
	github: 'https://github.com/frankfmy',
	linkedin: 'https://linkedin.com/in/pryanishnikov',
	telegram: 'https://t.me/frankfmy',
};
