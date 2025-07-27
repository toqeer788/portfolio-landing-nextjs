'use client';

import { motion } from 'framer-motion';
import {
	CheckCircle,
	FileText,
	Users,
	Menu,
	User,
	Code,
	Zap,
	Shield,
} from 'lucide-react';
import Card from '@/components/ui/Card';

const AboutSection = () => {
	const principles = [
		{
			title: 'Качество превыше скорости',
			description:
				'Пишу код, который легко поддерживать и масштабировать. Каждая строка кода должна быть продумана и оптимизирована.',
			icon: <CheckCircle className="w-8 h-8" />,
			color: 'text-success-400',
		},
		{
			title: 'Код должен быть понятным',
			description:
				'Использую современные практики разработки, пишу чистый и читаемый код с подробной документацией.',
			icon: <FileText className="w-8 h-8" />,
			color: 'text-primary-400',
		},
		{
			title: 'UX — это все',
			description:
				'Создаю интерфейсы, которые не только красивы, но и интуитивно понятны. Пользовательский опыт на первом месте.',
			icon: <Users className="w-8 h-8" />,
			color: 'text-accent-400',
		},
	];

	const skills = [
		{
			title: 'Техническая экспертиза',
			description:
				'Использую современный стек технологий и слежу за последними трендами в разработке.',
			icon: <Code className="w-6 h-6" />,
			color: 'text-primary-400',
		},
		{
			title: 'Производительность',
			description:
				'Создаю высоконагруженные приложения с фокусом на скорость и масштабируемость.',
			icon: <Zap className="w-6 h-6" />,
			color: 'text-warning-400',
		},
		{
			title: 'Безопасность',
			description:
				'Применяю лучшие практики безопасности и обеспечиваю защиту данных пользователей.',
			icon: <Shield className="w-6 h-6" />,
			color: 'text-success-400',
		},
	];

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.2,
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
			id="about"
			className="section bg-gradient-section relative overflow-hidden"
		>
			{/* Background Elements */}
			<div className="absolute inset-0 overflow-hidden" aria-hidden="true">
				<div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-primary-500/10 to-accent-500/10 rounded-full blur-3xl" />
				<div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-accent-500/10 to-primary-500/10 rounded-full blur-3xl" />
			</div>

			<div className="container-custom relative z-10">
				<motion.div
					className="text-center mb-16"
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
				>
					<motion.div
						className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm text-neutral-300 mb-8"
						variants={itemVariants}
					>
						<span className="w-2 h-2 bg-primary-400 rounded-full mr-2" />О
						разработчике
					</motion.div>

					<motion.h2 className="heading-2 mb-6" variants={itemVariants}>
						Кто стоит за <span className="gradient-text">кодом</span>
					</motion.h2>

					<motion.p
						className="text-body max-w-4xl mx-auto text-lg"
						variants={itemVariants}
					>
						Я не просто пишу код — я создаю цифровые решения, которые решают
						реальные бизнес-задачи. Мой подход основан на глубоком понимании
						технологий, бизнес-процессов и пользовательских потребностей.
					</motion.p>
				</motion.div>

				{/* Принципы работы */}
				<motion.div
					className="grid md:grid-cols-3 gap-8 mb-16"
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
				>
					{principles.map((principle, index) => (
						<motion.div key={index} variants={itemVariants}>
							<Card className="text-center h-full group hover:scale-105 transition-all duration-300 hover:shadow-large">
								<div className="flex justify-center mb-6">
									<motion.div
										className={`${principle.color} group-hover:scale-110 transition-transform duration-300`}
										whileHover={{ rotate: 5 }}
										transition={{ duration: 0.3, ease: 'easeInOut' }}
									>
										{principle.icon}
									</motion.div>
								</div>
								<h3 className="heading-3 mb-4 text-neutral-50">
									{principle.title}
								</h3>
								<p className="text-neutral-300 leading-relaxed">
									{principle.description}
								</p>
							</Card>
						</motion.div>
					))}
				</motion.div>

				{/* Дополнительная информация */}
				<motion.div
					className="text-center"
					variants={itemVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
				>
					<Card className="max-w-6xl mx-auto bg-gradient-card backdrop-blur-xl">
						<h3 className="heading-3 mb-12 text-neutral-50">
							Мой подход к разработке
						</h3>

						<div className="grid lg:grid-cols-3 gap-8 mb-12">
							{skills.map((skill, index) => (
								<motion.div
									key={index}
									className="text-center space-y-4 group"
									whileHover={{ scale: 1.05 }}
									transition={{ duration: 0.2 }}
								>
									<div className="flex justify-center mb-4">
										<motion.div
											className={`${skill.color} group-hover:scale-110 transition-transform duration-300`}
											whileHover={{ rotate: 10 }}
											transition={{ duration: 0.3, ease: 'easeInOut' }}
										>
											{skill.icon}
										</motion.div>
									</div>
									<h4 className="text-xl font-semibold text-neutral-50 group-hover:text-neutral-100 transition-colors">
										{skill.title}
									</h4>
									<p className="text-neutral-300 leading-relaxed group-hover:text-neutral-200 transition-colors">
										{skill.description}
									</p>
								</motion.div>
							))}
						</div>

						<div className="grid md:grid-cols-2 gap-12 text-left">
							<motion.div
								className="space-y-6 group"
								whileHover={{ x: 5 }}
								transition={{ duration: 0.3, ease: 'easeInOut' }}
							>
								<h4 className="text-xl font-semibold mb-6 text-primary-400 flex items-center gap-3 group-hover:text-primary-300 transition-colors">
									<Menu className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
									Техническая экспертиза
								</h4>
								<p className="text-neutral-300 leading-relaxed group-hover:text-neutral-200 transition-colors">
									Использую современный стек технологий и слежу за последними
									трендами в разработке. Каждый проект — это возможность
									применить новые знания и улучшить существующие навыки.
								</p>
								<p className="text-neutral-300 leading-relaxed group-hover:text-neutral-200 transition-colors">
									Специализируюсь на создании высоконагруженных приложений с
									фокусом на производительность и масштабируемость.
								</p>
							</motion.div>
							<motion.div
								className="space-y-6 group"
								whileHover={{ x: -5 }}
								transition={{ duration: 0.3, ease: 'easeInOut' }}
							>
								<h4 className="text-xl font-semibold mb-6 text-accent-400 flex items-center gap-3 group-hover:text-accent-300 transition-colors">
									<User className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
									Бизнес-ориентированность
								</h4>
								<p className="text-neutral-300 leading-relaxed group-hover:text-neutral-200 transition-colors">
									Понимаю, что технологии — это инструмент для достижения
									бизнес-целей. Всегда начинаю с анализа потребностей и
									предлагаю оптимальные решения.
								</p>
								<p className="text-neutral-300 leading-relaxed group-hover:text-neutral-200 transition-colors">
									Работаю в тесном контакте с заказчиками, обеспечивая
									прозрачность процесса разработки и быструю обратную связь.
								</p>
							</motion.div>
						</div>
					</Card>
				</motion.div>
			</div>
		</section>
	);
};

export default AboutSection;
