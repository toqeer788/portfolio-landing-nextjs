'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Card from '@/components/ui/Card';
import { TESTIMONIALS } from '@/lib/constants';
import ClientOnly from '@/components/ui/ClientOnly';

const TestimonialsSection = () => {
	const [currentIndex, setCurrentIndex] = useState(0);

	// Автоматическое переключение отзывов
	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentIndex(prev => (prev + 1) % TESTIMONIALS.length);
		}, 5000);

		return () => clearInterval(interval);
	}, []);

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.2,
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 30 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.6,
				ease: [0.25, 0.46, 0.45, 0.94] as const,
			},
		},
	};

	return (
		<ClientOnly
			fallback={
				<section
					id="testimonials"
					className="section bg-gradient-section relative overflow-hidden"
				>
					<div className="container-custom relative z-10">
						<div className="text-center mb-16">
							<h2 className="heading-2 mb-6">
								Что говорят <span className="gradient-text">клиенты</span>
							</h2>
							<p className="text-body max-w-3xl mx-auto">
								Реальные отзывы от людей, с которыми я работал. Каждый проект —
								это история успеха.
							</p>
						</div>
						<Card className="max-w-4xl mx-auto text-center">
							<div className="text-6xl mb-6">💬</div>
							<blockquote className="text-xl md:text-2xl text-gray-200 italic mb-8 leading-relaxed">
								&ldquo;{TESTIMONIALS[0].text}&rdquo;
							</blockquote>
							<div className="border-t border-white/10 pt-6">
								<div className="text-lg font-semibold text-[#FECD45] mb-2">
									{TESTIMONIALS[0].author}
								</div>
								<div className="text-gray-400">{TESTIMONIALS[0].position}</div>
							</div>
						</Card>
					</div>
				</section>
			}
		>
			<section
				id="testimonials"
				className="section bg-gradient-section relative overflow-hidden"
			>
				<div className="container-custom relative z-10">
					{/* Заголовок */}
					<motion.div
						className="text-center mb-16"
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8 }}
					>
						<h2 className="heading-2 mb-6">
							Что говорят <span className="gradient-text">клиенты</span>
						</h2>
						<p className="text-body max-w-3xl mx-auto">
							Реальные отзывы от людей, с которыми я работал. Каждый проект —
							это история успеха.
						</p>
					</motion.div>

					{/* Основной отзыв */}
					<motion.div
						className="mb-16"
						key={currentIndex}
						initial={{ opacity: 0, x: 50 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: -50 }}
						transition={{ duration: 0.5 }}
					>
						<Card className="max-w-4xl mx-auto text-center">
							<div className="text-6xl mb-6">💬</div>
							<blockquote className="text-xl md:text-2xl text-gray-200 italic mb-8 leading-relaxed">
								&ldquo;{TESTIMONIALS[currentIndex].text}&rdquo;
							</blockquote>
							<div className="border-t border-white/10 pt-6">
								<div className="text-lg font-semibold text-[#FECD45] mb-2">
									{TESTIMONIALS[currentIndex].author}
								</div>
								<div className="text-gray-400">
									{TESTIMONIALS[currentIndex].position}
								</div>
							</div>
						</Card>
					</motion.div>

					{/* Индикаторы */}
					<motion.div
						className="flex justify-center gap-3 mb-16"
						variants={containerVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
					>
						{TESTIMONIALS.map((_, index) => (
							<motion.button
								key={index}
								variants={itemVariants}
								onClick={() => setCurrentIndex(index)}
								className={`w-3 h-3 rounded-full transition-all duration-300 ${
									index === currentIndex
										? 'bg-[#FECD45] scale-125'
										: 'bg-white/30 hover:bg-white/50'
								}`}
							/>
						))}
					</motion.div>

					{/* Все отзывы */}
					<motion.div
						className="grid md:grid-cols-3 gap-6 mb-16"
						variants={containerVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
					>
						{TESTIMONIALS.map((testimonial, index) => (
							<motion.div
								key={testimonial.id}
								variants={itemVariants}
								className={`${
									index === currentIndex ? 'ring-2 ring-[#FECD45]' : ''
								}`}
							>
								<Card className="h-full">
									<div className="flex items-start gap-4">
										<div className="text-3xl">⭐</div>
										<div className="flex-1">
											<p className="text-gray-300 mb-4 italic">
												&ldquo;{testimonial.text}&rdquo;
											</p>
											<div>
												<div className="font-semibold text-[#FECD45]">
													{testimonial.author}
												</div>
												<div className="text-sm text-gray-400">
													{testimonial.position}
												</div>
											</div>
										</div>
									</div>
								</Card>
							</motion.div>
						))}
					</motion.div>

					{/* Статистика */}
					<motion.div
						className="text-center"
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8 }}
					>
						<Card className="max-w-4xl mx-auto">
							<h3 className="heading-3 mb-8">Результаты работы</h3>
							<div className="grid grid-cols-2 md:grid-cols-4 gap-8">
								<div>
									<div className="text-3xl font-bold text-[#FECD45] mb-2">
										100%
									</div>
									<div className="text-gray-300">Успешных проектов</div>
								</div>
								<div>
									<div className="text-3xl font-bold text-[#FECD45] mb-2">
										4.9/5
									</div>
									<div className="text-gray-300">Средняя оценка</div>
								</div>
								<div>
									<div className="text-3xl font-bold text-[#FECD45] mb-2">
										95%
									</div>
									<div className="text-gray-300">Повторных заказов</div>
								</div>
								<div>
									<div className="text-3xl font-bold text-[#FECD45] mb-2">
										24ч
									</div>
									<div className="text-gray-300">Максимальное время ответа</div>
								</div>
							</div>
						</Card>
					</motion.div>
				</div>
			</section>
		</ClientOnly>
	);
};

export default TestimonialsSection;
