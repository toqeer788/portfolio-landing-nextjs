'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import {
	Wrench,
	Atom,
	Circle,
	Bot,
	Ship,
	Zap,
	TrendingUp,
	Sparkles,
} from 'lucide-react';
import Card from '@/components/ui/Card';
import ProgressBar from '@/components/ui/ProgressBar';
import TechnologyIcon from '@/components/ui/TechnologyIcon';
import { TECHNOLOGIES } from '@/lib/constants';

const ExpertiseSection = () => {
	const [activeCategory, setActiveCategory] = useState<
		'all' | 'frontend' | 'backend' | 'ai-ml' | 'devops'
	>('all');

	const categories = [
		{ id: 'all', name: 'Все', icon: <Wrench className="w-5 h-5" /> },
		{
			id: 'frontend',
			name: 'Frontend',
			icon: <Atom className="w-5 h-5" />,
		},
		{
			id: 'backend',
			name: 'Backend',
			icon: <Circle className="w-5 h-5" />,
		},
		{ id: 'ai-ml', name: 'AI/ML', icon: <Bot className="w-5 h-5" /> },
		{ id: 'devops', name: 'DevOps', icon: <Ship className="w-5 h-5" /> },
	] as const;

	const filteredTechnologies = TECHNOLOGIES.filter(
		tech => activeCategory === 'all' || tech.category === activeCategory
	);

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
				delayChildren: 0.1,
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 30 },
		visible: { opacity: 1, y: 0 },
	};

	return (
		<section
			id="expertise"
			className="section bg-gradient-hero relative overflow-hidden"
		>
			{/* Background Elements */}
			<div className="absolute inset-0 overflow-hidden" aria-hidden="true">
				<div className="absolute top-1/3 left-1/3 w-64 h-64 bg-gradient-to-r from-primary-500/10 to-accent-500/10 rounded-full blur-3xl" />
				<div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-gradient-to-r from-accent-500/10 to-primary-500/10 rounded-full blur-3xl" />
			</div>

			<div className="container-custom relative z-10">
				{/* Заголовок */}
				<motion.div
					className="text-center mb-20"
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8 }}
				>
					<motion.div
						className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm text-neutral-300 mb-8"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6, delay: 0.2 }}
					>
						<span className="w-2 h-2 bg-primary-400 rounded-full mr-2" />
						Технологии
					</motion.div>

					<h2 className="heading-2 mb-6">
						Техническая <span className="gradient-text">экспертиза</span>
					</h2>
					<p className="text-body max-w-3xl mx-auto text-lg">
						Владею полным стеком технологий для создания современных
						веб-приложений. От фронтенда до деплоя — все под контролем.
					</p>
				</motion.div>

				{/* Фильтры категорий */}
				<motion.div
					className="flex flex-wrap justify-center gap-4 mb-16"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
				>
					{categories.map(category => (
						<motion.button
							key={category.id}
							onClick={() => setActiveCategory(category.id)}
							className={`flex items-center gap-2 px-6 py-3 rounded-xl border-2 transition-all duration-300 font-medium group ${
								activeCategory === category.id
									? 'border-primary-500 text-primary-400 bg-primary-500/10 shadow-glow'
									: 'border-white/20 text-neutral-300 hover:border-white/40 hover:text-white hover:bg-white/5'
							}`}
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
						>
							<motion.span
								className={`group-hover:scale-110 transition-transform ${
									activeCategory === category.id ? 'scale-110' : ''
								}`}
							>
								{category.icon}
							</motion.span>
							<span>{category.name}</span>
						</motion.button>
					))}
				</motion.div>

				{/* Технологии */}
				<motion.div
					className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20"
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
					key={activeCategory} // Пересоздаем анимацию при смене категории
				>
					{filteredTechnologies.map((tech, index) => (
						<motion.div
							key={tech.name}
							variants={itemVariants}
							transition={{ delay: index * 0.1 }}
						>
							<Card className="h-full group hover:scale-105">
								<div className="flex items-center justify-between mb-4">
									<div className="flex items-center gap-3">
										<motion.div
											className="text-primary-400 group-hover:scale-110 transition-transform duration-300"
											whileHover={{ rotate: 5 }}
										>
											<TechnologyIcon name={tech.name} className="w-6 h-6" />
										</motion.div>
										<h3 className="text-lg font-semibold text-neutral-50 group-hover:text-neutral-100 transition-colors">
											{tech.name}
										</h3>
									</div>
									<span className="text-sm text-primary-400 font-mono font-bold group-hover:text-primary-300 transition-colors">
										{tech.proficiency}%
									</span>
								</div>
								<ProgressBar
									value={tech.proficiency}
									className="mb-4"
									showPercentage={false}
								/>
								<div className="text-sm text-neutral-400 group-hover:text-neutral-300 transition-colors">
									{tech.category === 'frontend' && 'Frontend разработка'}
									{tech.category === 'backend' && 'Backend разработка'}
									{tech.category === 'ai-ml' && 'Искусственный интеллект'}
									{tech.category === 'devops' && 'DevOps & Деплой'}
								</div>
							</Card>
						</motion.div>
					))}
				</motion.div>

				{/* Дополнительная информация */}
				<motion.div
					className="text-center"
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8 }}
				>
					<Card className="max-w-6xl mx-auto bg-gradient-card backdrop-blur-xl">
						<h3 className="heading-3 mb-12 text-neutral-50">
							Почему этот стек?
						</h3>
						<div className="grid md:grid-cols-3 gap-8">
							<motion.div
								className="text-center space-y-4 group"
								whileHover={{ scale: 1.05 }}
								transition={{ duration: 0.2 }}
							>
								<motion.div
									className="text-warning-400 mb-4 group-hover:scale-110 transition-transform duration-300"
									whileHover={{ rotate: 10 }}
								>
									<Zap className="w-8 h-8 mx-auto" />
								</motion.div>
								<h4 className="text-xl font-semibold text-neutral-50 group-hover:text-neutral-100 transition-colors">
									Производительность
								</h4>
								<p className="text-neutral-300 text-sm leading-relaxed group-hover:text-neutral-200 transition-colors">
									Выбираю технологии, которые обеспечивают максимальную скорость
									и отзывчивость приложений.
								</p>
							</motion.div>
							<motion.div
								className="text-center space-y-4 group"
								whileHover={{ scale: 1.05 }}
								transition={{ duration: 0.2 }}
							>
								<motion.div
									className="text-success-400 mb-4 group-hover:scale-110 transition-transform duration-300"
									whileHover={{ rotate: 10 }}
								>
									<TrendingUp className="w-8 h-8 mx-auto" />
								</motion.div>
								<h4 className="text-xl font-semibold text-neutral-50 group-hover:text-neutral-100 transition-colors">
									Масштабируемость
								</h4>
								<p className="text-neutral-300 text-sm leading-relaxed group-hover:text-neutral-200 transition-colors">
									Использую решения, которые легко масштабируются и адаптируются
									под растущие потребности бизнеса.
								</p>
							</motion.div>
							<motion.div
								className="text-center space-y-4 group"
								whileHover={{ scale: 1.05 }}
								transition={{ duration: 0.2 }}
							>
								<motion.div
									className="text-accent-400 mb-4 group-hover:scale-110 transition-transform duration-300"
									whileHover={{ rotate: 10 }}
								>
									<Sparkles className="w-8 h-8 mx-auto" />
								</motion.div>
								<h4 className="text-xl font-semibold text-neutral-50 group-hover:text-neutral-100 transition-colors">
									Современность
								</h4>
								<p className="text-neutral-300 text-sm leading-relaxed group-hover:text-neutral-200 transition-colors">
									Слежу за трендами и внедряю новые технологии, которые дают
									конкурентные преимущества.
								</p>
							</motion.div>
						</div>
					</Card>
				</motion.div>
			</div>
		</section>
	);
};

export default ExpertiseSection;
