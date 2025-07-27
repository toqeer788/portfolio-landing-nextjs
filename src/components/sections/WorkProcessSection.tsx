'use client';

import { motion } from 'framer-motion';
import Card from '@/components/ui/Card';
import WorkStepIcon from '@/components/ui/WorkStepIcon';
import { WORK_STEPS } from '@/lib/constants';

const WorkProcessSection = () => {
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
		<section
			id="process"
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
						Как я <span className="gradient-text">работаю</span>
					</h2>
					<p className="text-body max-w-3xl mx-auto">
						Прозрачный процесс разработки от идеи до запуска. Каждый этап
						тщательно проработан и согласован.
					</p>
				</motion.div>

				{/* Процесс работы */}
				<motion.div
					className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
				>
					{WORK_STEPS.map((step, index) => (
						<motion.div
							key={step.id}
							variants={itemVariants}
							className="relative"
						>
							{/* Номер этапа */}
							<div className="absolute -top-4 -left-4 w-8 h-8 bg-[#FECD45] text-black rounded-full flex items-center justify-center font-bold text-sm z-10">
								{index + 1}
							</div>

							<Card className="h-full pt-8">
								<div className="text-center mb-4">
									<div className="flex justify-center mb-4">
										<div className="text-[#FECD45]">
											<WorkStepIcon title={step.title} className="w-8 h-8" />
										</div>
									</div>
									<h3 className="heading-3 mb-3">{step.title}</h3>
									<p className="text-gray-300 mb-4">{step.description}</p>
									<div className="inline-block bg-[#FECD45]/10 text-[#FECD45] px-3 py-1 rounded-full text-sm font-mono">
										{step.duration}
									</div>
								</div>
							</Card>

							{/* Соединительная линия */}
							{index < WORK_STEPS.length - 1 && (
								<div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-[#FECD45] to-transparent transform -translate-y-1/2 z-0" />
							)}
						</motion.div>
					))}
				</motion.div>

				{/* Дополнительная информация */}
				<motion.div
					className="mb-16"
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8 }}
				>
					<Card className="max-w-4xl mx-auto">
						<div className="grid md:grid-cols-2 gap-8">
							<div>
								<h3 className="heading-3 mb-6">Методология</h3>
								<ul className="space-y-3 text-gray-300">
									<li className="flex items-start gap-3">
										<span className="text-[#FECD45] mt-1">✓</span>
										<span>Agile подход с короткими итерациями</span>
									</li>
									<li className="flex items-start gap-3">
										<span className="text-[#FECD45] mt-1">✓</span>
										<span>Регулярные демо и обратная связь</span>
									</li>
									<li className="flex items-start gap-3">
										<span className="text-[#FECD45] mt-1">✓</span>
										<span>Непрерывная интеграция и деплой</span>
									</li>
									<li className="flex items-start gap-3">
										<span className="text-[#FECD45] mt-1">✓</span>
										<span>Автоматизированное тестирование</span>
									</li>
								</ul>
							</div>
							<div>
								<h3 className="heading-3 mb-6">Коммуникация</h3>
								<ul className="space-y-3 text-gray-300">
									<li className="flex items-start gap-3">
										<span className="text-[#FECD45] mt-1">✓</span>
										<span>Еженедельные отчеты о прогрессе</span>
									</li>
									<li className="flex items-start gap-3">
										<span className="text-[#FECD45] mt-1">✓</span>
										<span>Быстрая реакция на запросы</span>
									</li>
									<li className="flex items-start gap-3">
										<span className="text-[#FECD45] mt-1">✓</span>
										<span>Прозрачная система трекинга задач</span>
									</li>
									<li className="flex items-start gap-3">
										<span className="text-[#FECD45] mt-1">✓</span>
										<span>Документирование всех решений</span>
									</li>
								</ul>
							</div>
						</div>
					</Card>
				</motion.div>

				{/* Временные рамки */}
				<motion.div
					className="text-center"
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8 }}
				>
					<Card className="max-w-2xl mx-auto">
						<h3 className="heading-3 mb-4">Временные рамки</h3>
						<div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
							<div>
								<div className="text-2xl font-bold text-[#FECD45]">1-2</div>
								<div className="text-sm text-gray-300">недели</div>
								<div className="text-xs text-gray-400">Лендинги</div>
							</div>
							<div>
								<div className="text-2xl font-bold text-[#FECD45]">2-4</div>
								<div className="text-sm text-gray-300">недели</div>
								<div className="text-xs text-gray-400">Веб-приложения</div>
							</div>
							<div>
								<div className="text-2xl font-bold text-[#FECD45]">1-2</div>
								<div className="text-sm text-gray-300">месяца</div>
								<div className="text-xs text-gray-400">Сложные проекты</div>
							</div>
							<div>
								<div className="text-2xl font-bold text-[#FECD45]">3+</div>
								<div className="text-sm text-gray-300">месяца</div>
								<div className="text-xs text-gray-400">Enterprise</div>
							</div>
						</div>
					</Card>
				</motion.div>
			</div>
		</section>
	);
};

export default WorkProcessSection;
