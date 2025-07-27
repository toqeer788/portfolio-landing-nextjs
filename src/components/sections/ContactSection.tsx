'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	MessageSquare,
	Mail,
	Clock,
	Github,
	Linkedin,
	Send,
	AlertCircle,
	CheckCircle,
	ArrowRight,
	Calendar,
	DollarSign,
} from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { CONTACT_INFO, SOCIAL_LINKS } from '@/lib/constants';
import { contactFormSchema, type ContactFormData } from '@/lib/validation';

const ContactSection = () => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<ContactFormData>({
		resolver: zodResolver(contactFormSchema),
		mode: 'onBlur',
	});

	const onSubmit = async (data: ContactFormData) => {
		setIsSubmitting(true);
		setError(null);

		try {
			const response = await fetch('/api/contact', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});

			const result = await response.json();

			if (!response.ok) {
				throw new Error(result.error || 'Произошла ошибка при отправке');
			}

			setIsSubmitted(true);
			reset();

			// Сброс состояния через 5 секунд
			setTimeout(() => setIsSubmitted(false), 5000);
		} catch (err) {
			setError(
				err instanceof Error ? err.message : 'Произошла неизвестная ошибка'
			);
		} finally {
			setIsSubmitting(false);
		}
	};

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
			id="contact"
			className="section bg-gradient-hero relative overflow-hidden"
		>
			{/* Background Elements */}
			<div className="absolute inset-0 overflow-hidden" aria-hidden="true">
				<div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-primary-500/10 to-accent-500/10 rounded-full blur-3xl" />
				<div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-accent-500/10 to-primary-500/10 rounded-full blur-3xl" />
			</div>

			<div className="container-custom relative z-10">
				{/* Заголовок */}
				<motion.div
					className="text-center mb-16"
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
						Связаться
					</motion.div>

					<h2 className="heading-2 mb-6">
						Начнем <span className="gradient-text">проект</span>
					</h2>
					<p className="text-body max-w-3xl mx-auto text-lg">
						Расскажите о своей идее, и я помогу превратить её в успешный
						цифровой продукт. Отвечаю в течение 2 часов в рабочее время.
					</p>
				</motion.div>

				<motion.div
					className="grid lg:grid-cols-2 gap-12"
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
				>
					{/* Контактная информация */}
					<motion.div variants={itemVariants}>
						<Card className="h-full bg-gradient-card backdrop-blur-xl">
							<h3 className="heading-3 mb-8 text-neutral-50">
								Свяжитесь со мной
							</h3>

							<div className="space-y-6">
								<motion.div
									className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300 group cursor-pointer"
									whileHover={{ scale: 1.02 }}
									onClick={() => window.open('https://t.me/frankfmy', '_blank')}
								>
									<div className="w-12 h-12 bg-primary-500/20 rounded-xl flex items-center justify-center group-hover:bg-primary-500/30 transition-colors">
										<MessageSquare className="w-6 h-6 text-primary-400" />
									</div>
									<div className="flex-1">
										<div className="font-semibold text-primary-400 group-hover:text-primary-300 transition-colors">
											Telegram
										</div>
										<div className="text-neutral-300 group-hover:text-neutral-200 transition-colors">
											{CONTACT_INFO.telegram}
										</div>
									</div>
									<ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-primary-400 transition-colors" />
								</motion.div>

								<motion.div
									className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300 group cursor-pointer"
									whileHover={{ scale: 1.02 }}
									onClick={() =>
										window.open(`mailto:${CONTACT_INFO.email}`, '_blank')
									}
								>
									<div className="w-12 h-12 bg-accent-500/20 rounded-xl flex items-center justify-center group-hover:bg-accent-500/30 transition-colors">
										<Mail className="w-6 h-6 text-accent-400" />
									</div>
									<div className="flex-1">
										<div className="font-semibold text-accent-400 group-hover:text-accent-300 transition-colors">
											Email
										</div>
										<div className="text-neutral-300 group-hover:text-neutral-200 transition-colors">
											{CONTACT_INFO.email}
										</div>
									</div>
									<ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-accent-400 transition-colors" />
								</motion.div>

								<motion.div
									className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300 group"
									whileHover={{ scale: 1.02 }}
								>
									<div className="w-12 h-12 bg-success-500/20 rounded-xl flex items-center justify-center group-hover:bg-success-500/30 transition-colors">
										<Clock className="w-6 h-6 text-success-400" />
									</div>
									<div className="flex-1">
										<div className="font-semibold text-success-400 group-hover:text-success-300 transition-colors">
											Время ответа
										</div>
										<div className="text-neutral-300 group-hover:text-neutral-200 transition-colors">
											{CONTACT_INFO.responseTime}
										</div>
									</div>
								</motion.div>
							</div>

							{/* Социальные сети */}
							<div className="mt-12 pt-8 border-t border-white/10">
								<h4 className="text-lg font-semibold mb-6 text-neutral-50">
									Социальные сети
								</h4>
								<div className="flex justify-center gap-4">
									<motion.a
										href={SOCIAL_LINKS.github}
										target="_blank"
										rel="noopener noreferrer"
										className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center hover:bg-primary-500/20 hover:text-primary-400 transition-all duration-300 group"
										aria-label="GitHub профиль"
										whileHover={{ scale: 1.1, y: -2 }}
										whileTap={{ scale: 0.95 }}
									>
										<Github className="w-6 h-6 group-hover:scale-110 transition-transform" />
									</motion.a>
									<motion.a
										href={SOCIAL_LINKS.linkedin}
										target="_blank"
										rel="noopener noreferrer"
										className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center hover:bg-primary-500/20 hover:text-primary-400 transition-all duration-300 group"
										aria-label="LinkedIn профиль"
										whileHover={{ scale: 1.1, y: -2 }}
										whileTap={{ scale: 0.95 }}
									>
										<Linkedin className="w-6 h-6 group-hover:scale-110 transition-transform" />
									</motion.a>
									<motion.a
										href={SOCIAL_LINKS.telegram}
										target="_blank"
										rel="noopener noreferrer"
										className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center hover:bg-primary-500/20 hover:text-primary-400 transition-all duration-300 group"
										aria-label="Telegram канал"
										whileHover={{ scale: 1.1, y: -2 }}
										whileTap={{ scale: 0.95 }}
									>
										<Send className="w-6 h-6 group-hover:scale-110 transition-transform" />
									</motion.a>
								</div>
							</div>
						</Card>
					</motion.div>

					{/* Форма обратной связи */}
					<motion.div variants={itemVariants}>
						<Card className="h-full bg-gradient-card backdrop-blur-xl">
							<h3 className="heading-3 mb-8 text-neutral-50">
								Форма обратной связи
							</h3>

							{isSubmitted ? (
								<motion.div
									initial={{ opacity: 0, scale: 0.8 }}
									animate={{ opacity: 1, scale: 1 }}
									className="text-center py-12"
								>
									<div className="w-20 h-20 bg-success-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
										<CheckCircle className="w-10 h-10 text-success-400" />
									</div>
									<h4 className="text-2xl font-bold mb-4 text-success-400">
										Сообщение отправлено!
									</h4>
									<p className="text-neutral-300 text-lg">
										Спасибо за обращение. Я свяжусь с вами в ближайшее время.
									</p>
								</motion.div>
							) : (
								<form
									onSubmit={handleSubmit(onSubmit)}
									className="space-y-6"
									noValidate
								>
									{/* Показываем ошибку если есть */}
									{error && (
										<motion.div
											initial={{ opacity: 0, y: -10 }}
											animate={{ opacity: 1, y: 0 }}
											className="flex items-center gap-3 p-4 bg-error-500/10 border border-error-500/20 rounded-xl"
										>
											<AlertCircle className="w-5 h-5 text-error-400 flex-shrink-0" />
											<p className="text-error-400 text-sm">{error}</p>
										</motion.div>
									)}

									<div className="grid md:grid-cols-2 gap-6">
										<div>
											<label
												htmlFor="name"
												className="block text-sm font-medium mb-3 text-neutral-300"
											>
												Ваше имя *
											</label>
											<input
												{...register('name')}
												id="name"
												type="text"
												className="form-input"
												placeholder="Как к вам обращаться?"
												aria-describedby={
													errors.name ? 'name-error' : undefined
												}
											/>
											{errors.name && (
												<p
													id="name-error"
													className="text-error-400 text-sm mt-2"
												>
													{errors.name.message}
												</p>
											)}
										</div>

										<div>
											<label
												htmlFor="email"
												className="block text-sm font-medium mb-3 text-neutral-300"
											>
												Email *
											</label>
											<input
												{...register('email')}
												id="email"
												type="email"
												className="form-input"
												placeholder="your@email.com"
												aria-describedby={
													errors.email ? 'email-error' : undefined
												}
											/>
											{errors.email && (
												<p
													id="email-error"
													className="text-error-400 text-sm mt-2"
												>
													{errors.email.message}
												</p>
											)}
										</div>
									</div>

									<div>
										<label
											htmlFor="phone"
											className="block text-sm font-medium mb-3 text-neutral-300"
										>
											Телефон
										</label>
										<input
											{...register('phone')}
											id="phone"
											type="tel"
											className="form-input"
											placeholder="+7 (999) 123-45-67"
											aria-describedby={
												errors.phone ? 'phone-error' : undefined
											}
										/>
										{errors.phone && (
											<p
												id="phone-error"
												className="text-error-400 text-sm mt-2"
											>
												{errors.phone.message}
											</p>
										)}
									</div>

									<div>
										<label
											htmlFor="project"
											className="block text-sm font-medium mb-3 text-neutral-300"
										>
											Описание проекта *
										</label>
										<textarea
											{...register('project')}
											id="project"
											rows={4}
											className="form-textarea"
											placeholder="Расскажите о вашей идее..."
											aria-describedby={
												errors.project ? 'project-error' : undefined
											}
										/>
										{errors.project && (
											<p
												id="project-error"
												className="text-error-400 text-sm mt-2"
											>
												{errors.project.message}
											</p>
										)}
									</div>

									<div className="grid md:grid-cols-2 gap-6">
										<div>
											<label
												htmlFor="budget"
												className="text-sm font-medium mb-3 text-neutral-300 flex items-center gap-2"
											>
												<DollarSign className="w-4 h-4" />
												Бюджет *
											</label>
											<select
												{...register('budget')}
												id="budget"
												className="form-select"
												aria-describedby={
													errors.budget ? 'budget-error' : undefined
												}
											>
												<option value="">Выберите бюджет</option>
												<option value="small">До 100,000 ₽</option>
												<option value="medium">100,000 - 500,000 ₽</option>
												<option value="large">500,000 - 1,000,000 ₽</option>
												<option value="enterprise">Более 1,000,000 ₽</option>
											</select>
											{errors.budget && (
												<p
													id="budget-error"
													className="text-error-400 text-sm mt-2"
												>
													{errors.budget.message}
												</p>
											)}
										</div>

										<div>
											<label
												htmlFor="timeline"
												className="text-sm font-medium mb-3 text-neutral-300 flex items-center gap-2"
											>
												<Calendar className="w-4 h-4" />
												Сроки *
											</label>
											<select
												{...register('timeline')}
												id="timeline"
												className="form-select"
												aria-describedby={
													errors.timeline ? 'timeline-error' : undefined
												}
											>
												<option value="">Выберите сроки</option>
												<option value="urgent">Срочно (1-2 недели)</option>
												<option value="normal">Обычно (1-2 месяца)</option>
												<option value="flexible">Гибкие сроки</option>
											</select>
											{errors.timeline && (
												<p
													id="timeline-error"
													className="text-error-400 text-sm mt-2"
												>
													{errors.timeline.message}
												</p>
											)}
										</div>
									</div>

									<div>
										<label
											htmlFor="message"
											className="block text-sm font-medium mb-3 text-neutral-300"
										>
											Дополнительная информация
										</label>
										<textarea
											{...register('message')}
											id="message"
											rows={4}
											className="form-textarea"
											placeholder="Любая дополнительная информация..."
											aria-describedby={
												errors.message ? 'message-error' : undefined
											}
										/>
										{errors.message && (
											<p
												id="message-error"
												className="text-error-400 text-sm mt-2"
											>
												{errors.message.message}
											</p>
										)}
									</div>

									<Button
										type="submit"
										disabled={isSubmitting}
										className="w-full group"
										size="lg"
									>
										<span className="flex items-center justify-center gap-2">
											{isSubmitting ? 'Отправляем...' : 'Отправить сообщение'}
											{!isSubmitting && (
												<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
											)}
										</span>
									</Button>
								</form>
							)}
						</Card>
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
};

export default ContactSection;
