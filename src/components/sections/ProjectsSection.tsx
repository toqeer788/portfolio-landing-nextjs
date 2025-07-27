'use client';

import { motion } from 'framer-motion';
import {
	ShoppingCart,
	TrendingUp,
	Stethoscope,
	ExternalLink,
	Github,
	Eye,
} from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { PROJECTS } from '@/lib/constants';

const ProjectsSection = () => {
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.3,
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 30 },
		visible: { opacity: 1, y: 0 },
	};

	return (
		<section
			id="projects"
			className="section bg-gradient-section relative overflow-hidden"
		>
			{/* Background Elements */}
			<div className="absolute inset-0 overflow-hidden" aria-hidden="true">
				<div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-primary-500/10 to-accent-500/10 rounded-full blur-3xl" />
				<div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-accent-500/10 to-primary-500/10 rounded-full blur-3xl" />
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
						Портфолио
					</motion.div>

					<h2 className="heading-2 mb-6">
						Избранные <span className="gradient-text">проекты</span>
					</h2>
					<p className="text-body max-w-3xl mx-auto text-lg">
						Реальные кейсы с измеримыми результатами. Каждый проект — это
						решение конкретной бизнес-задачи.
					</p>
				</motion.div>

				{/* Проекты */}
				<motion.div
					className="space-y-16"
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
				>
					{PROJECTS.map((project, index) => (
						<motion.div
							key={project.id}
							variants={itemVariants}
							className={`flex flex-col lg:flex-row gap-12 items-center ${
								index % 2 === 1 ? 'lg:flex-row-reverse' : ''
							}`}
						>
							{/* Информация о проекте */}
							<div className="flex-1">
								<Card className="h-full bg-gradient-card backdrop-blur-xl">
									<div className="mb-8">
										<div className="flex items-center justify-between mb-4">
											<h3 className="heading-3 text-primary-400">
												{project.title}
											</h3>
											<div className="flex gap-2">
												<button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
													<ExternalLink className="w-4 h-4 text-neutral-400" />
												</button>
												<button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
													<Github className="w-4 h-4 text-neutral-400" />
												</button>
											</div>
										</div>
										<p className="text-body text-lg leading-relaxed">
											{project.description}
										</p>
									</div>

									{/* Технологии */}
									<div className="mb-8">
										<h4 className="text-lg font-semibold mb-4 text-neutral-50">
											Технологии
										</h4>
										<div className="flex flex-wrap gap-3">
											{project.technologies.map(tech => (
												<span
													key={tech}
													className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-sm text-neutral-300 hover:bg-white/15 transition-colors"
												>
													{tech}
												</span>
											))}
										</div>
									</div>

									{/* Результат */}
									<div className="mb-8">
										<h4 className="text-lg font-semibold mb-4 text-neutral-50">
											Результат
										</h4>
										<p className="text-primary-400 font-bold text-xl">
											{project.result}
										</p>
									</div>

									{/* Отзыв */}
									<div className="border-l-4 border-primary-500 pl-6 bg-white/5 rounded-r-xl p-4">
										<p className="text-neutral-300 italic mb-3 text-lg leading-relaxed">
											&ldquo;{project.testimonial.text}
											&rdquo;
										</p>
										<div className="text-sm">
											<span className="text-primary-400 font-semibold">
												{project.testimonial.author}
											</span>
											<span className="text-neutral-400 ml-2">
												{project.testimonial.position}
											</span>
										</div>
									</div>
								</Card>
							</div>

							{/* Визуальная часть */}
							<div className="flex-1">
								<Card className="h-full bg-gradient-to-br from-primary-500/10 to-accent-500/10 border-primary-500/20 group hover:scale-105 transition-all duration-300">
									<div className="text-center">
										<div className="text-primary-400 mb-6 group-hover:scale-110 transition-transform duration-300">
											{index === 0 && (
												<ShoppingCart className="w-20 h-20 mx-auto" />
											)}
											{index === 1 && (
												<TrendingUp className="w-20 h-20 mx-auto" />
											)}
											{index === 2 && (
												<Stethoscope className="w-20 h-20 mx-auto" />
											)}
										</div>
										<h4 className="text-2xl font-bold mb-4 text-neutral-50">
											{index === 0 && 'E-commerce Platform'}
											{index === 1 && 'Trading Dashboard'}
											{index === 2 && 'Medical AI Assistant'}
										</h4>
										<p className="text-neutral-300 text-base leading-relaxed">
											{index === 0 &&
												'Интеллектуальная система рекомендаций для fashion-ритейла'}
											{index === 1 &&
												'Real-time трейдинговая платформа с аналитикой'}
											{index === 2 &&
												'AI-помощник для анализа медицинских данных'}
										</p>

										<div className="mt-8 flex justify-center gap-4">
											<Button variant="secondary" size="sm">
												<Eye className="w-4 h-4 mr-2" />
												Демо
											</Button>
											<Button variant="ghost" size="sm">
												<Github className="w-4 h-4 mr-2" />
												Код
											</Button>
										</div>
									</div>
								</Card>
							</div>
						</motion.div>
					))}
				</motion.div>

				{/* CTA */}
				<motion.div
					className="text-center mt-20"
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8 }}
				>
					<Card className="max-w-2xl mx-auto bg-gradient-card backdrop-blur-xl">
						<h3 className="heading-3 mb-6 text-neutral-50">
							Готовы к следующему проекту?
						</h3>
						<p className="text-neutral-300 mb-8 text-lg">
							Расскажите о своей идее, и я помогу превратить её в успешный
							цифровой продукт.
						</p>
						<Button
							onClick={() =>
								document
									.getElementById('contact')
									?.scrollIntoView({ behavior: 'smooth' })
							}
							size="lg"
						>
							Обсудить проект
						</Button>
					</Card>
				</motion.div>
			</div>
		</section>
	);
};

export default ProjectsSection;
