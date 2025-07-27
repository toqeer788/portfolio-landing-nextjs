'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useCallback, memo, useRef } from 'react';
import Button from '@/components/ui/Button';
import TypewriterText from '@/components/ui/TypewriterText';
import { scrollToElement } from '@/lib/utils';

const HeroSection = memo(() => {
	const [isTypingComplete, setIsTypingComplete] = useState(false);
	const containerRef = useRef<HTMLElement>(null);

	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ['start start', 'end start'],
	});

	const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
	const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

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

	const handleStartProject = useCallback(() => {
		scrollToElement('contact');
	}, []);

	const handleTypingComplete = useCallback(() => {
		setIsTypingComplete(true);
	}, []);

	return (
		<section
			ref={containerRef}
			className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero"
			aria-label="Главная секция"
		>
			{/* Animated Background Elements */}
			<div className="absolute inset-0 overflow-hidden" aria-hidden="true">
				{/* Floating Particles */}
				<motion.div
					className="absolute top-20 left-20 w-3 h-3 bg-primary-400 rounded-full opacity-60"
					animate={{
						y: [0, -20, 0],
						opacity: [0.6, 1, 0.6],
					}}
					transition={{
						duration: 4,
						repeat: Infinity,
						ease: 'easeInOut',
					}}
				/>
				<motion.div
					className="absolute top-40 right-32 w-2 h-2 bg-accent-500 rounded-full opacity-80"
					animate={{
						y: [0, 15, 0],
						opacity: [0.8, 1, 0.8],
					}}
					transition={{
						duration: 3,
						repeat: Infinity,
						ease: 'easeInOut',
						delay: 1,
					}}
				/>
				<motion.div
					className="absolute bottom-32 left-1/4 w-4 h-4 bg-primary-300 rounded-full opacity-50"
					animate={{
						y: [0, -25, 0],
						opacity: [0.5, 1, 0.5],
					}}
					transition={{
						duration: 5,
						repeat: Infinity,
						ease: 'easeInOut',
						delay: 2,
					}}
				/>
				<motion.div
					className="absolute bottom-20 right-20 w-2 h-2 bg-accent-400 rounded-full opacity-70"
					animate={{
						y: [0, 18, 0],
						opacity: [0.7, 1, 0.7],
					}}
					transition={{
						duration: 3.5,
						repeat: Infinity,
						ease: 'easeInOut',
						delay: 1.5,
					}}
				/>

				{/* Gradient Orbs */}
				<motion.div
					className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-primary-500/20 to-accent-500/20 rounded-full blur-3xl"
					animate={{
						scale: [1, 1.2, 1],
						opacity: [0.3, 0.5, 0.3],
					}}
					transition={{
						duration: 8,
						repeat: Infinity,
						ease: 'easeInOut',
					}}
				/>
				<motion.div
					className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-accent-500/20 to-primary-500/20 rounded-full blur-3xl"
					animate={{
						scale: [1.2, 1, 1.2],
						opacity: [0.4, 0.6, 0.4],
					}}
					transition={{
						duration: 10,
						repeat: Infinity,
						ease: 'easeInOut',
						delay: 2,
					}}
				/>

				{/* Grid Pattern */}
				<div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] opacity-30" />
			</div>

			{/* Parallax Background */}
			<motion.div
				className="absolute inset-0 bg-gradient-to-br from-primary-900/30 via-transparent to-accent-900/30"
				style={{ y }}
			/>

			{/* Main Content */}
			<motion.div
				className="container-custom text-center z-10 relative"
				variants={containerVariants}
				initial="hidden"
				animate="visible"
				style={{ opacity }}
			>
				{/* Badge */}
				<motion.div
					className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm text-neutral-300 mb-8"
					variants={itemVariants}
				>
					<span className="w-2 h-2 bg-primary-400 rounded-full mr-2 animate-pulse" />
					Доступен для новых проектов
				</motion.div>

				{/* Main Heading */}
				<motion.h1
					className="heading-1 mb-6 leading-tight"
					variants={itemVariants}
				>
					Привет, я{' '}
					<span className="gradient-text font-display">Артём Прянишников</span>
				</motion.h1>

				{/* Subtitle */}
				<motion.div
					className="text-xl sm:text-2xl lg:text-3xl text-neutral-300 mb-8 font-light"
					variants={itemVariants}
				>
					<TypewriterText
						text="Full-Stack Developer • AI Specialist • Fintech Expert"
						speed={80}
						delay={1}
						onComplete={handleTypingComplete}
						className="font-mono"
					/>
				</motion.div>

				{/* Description */}
				<motion.p
					className="text-body max-w-3xl mx-auto mb-12 text-lg leading-relaxed"
					variants={itemVariants}
				>
					Превращаю сложные идеи в элегантные цифровые решения, которые работают
					и приносят результат. Специализируюсь на создании высоконагруженных
					приложений и интеграции AI-технологий.
				</motion.p>

				{/* CTA Buttons */}
				<motion.div
					className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
					variants={itemVariants}
					initial={{ opacity: 0, scale: 0.8 }}
					animate={
						isTypingComplete
							? { opacity: 1, scale: 1 }
							: { opacity: 0, scale: 0.8 }
					}
					transition={{ duration: 0.5, delay: 0.5 }}
				>
					<Button
						size="lg"
						onClick={handleStartProject}
						className="text-lg px-10 py-4 shadow-glow hover:shadow-glow-lg group"
						aria-label="Начать проект - перейти к контактной форме"
					>
						<span className="flex items-center gap-2">
							Начать проект
							<motion.span
								className="group-hover:translate-x-1 transition-transform"
								initial={{ x: 0 }}
								whileHover={{ x: 5 }}
							>
								→
							</motion.span>
						</span>
					</Button>
					<Button
						variant="secondary"
						size="lg"
						onClick={() => scrollToElement('projects')}
						className="text-lg px-10 py-4 group"
						aria-label="Посмотреть проекты"
					>
						<span className="flex items-center gap-2">
							Мои работы
							<motion.span
								className="group-hover:translate-x-1 transition-transform"
								initial={{ x: 0 }}
								whileHover={{ x: 5 }}
							>
								→
							</motion.span>
						</span>
					</Button>
				</motion.div>

				{/* Stats */}
				<motion.div
					className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto mb-16"
					variants={itemVariants}
				>
					<motion.div
						className="text-center group"
						whileHover={{ scale: 1.05 }}
						transition={{ duration: 0.2 }}
					>
						<div className="text-3xl font-bold text-primary-400 mb-2 group-hover:text-primary-300 transition-colors">
							50+
						</div>
						<div className="text-sm text-neutral-400 group-hover:text-neutral-300 transition-colors">
							Завершенных проектов
						</div>
					</motion.div>
					<motion.div
						className="text-center group"
						whileHover={{ scale: 1.05 }}
						transition={{ duration: 0.2 }}
					>
						<div className="text-3xl font-bold text-accent-400 mb-2 group-hover:text-accent-300 transition-colors">
							5+
						</div>
						<div className="text-sm text-neutral-400 group-hover:text-neutral-300 transition-colors">
							Лет опыта
						</div>
					</motion.div>
					<motion.div
						className="text-center group"
						whileHover={{ scale: 1.05 }}
						transition={{ duration: 0.2 }}
					>
						<div className="text-3xl font-bold text-primary-400 mb-2 group-hover:text-primary-300 transition-colors">
							24/7
						</div>
						<div className="text-sm text-neutral-400 group-hover:text-neutral-300 transition-colors">
							Поддержка
						</div>
					</motion.div>
				</motion.div>

				{/* Contact Info */}
				<motion.div
					className="text-sm text-neutral-400 space-y-2"
					variants={itemVariants}
				>
					<p className="flex items-center justify-center gap-2">
						<span className="w-2 h-2 bg-success-400 rounded-full animate-pulse" />
						Отвечаю в течение 2 часов в рабочее время
					</p>
					<p className="flex items-center justify-center gap-2">
						<span className="text-primary-400 font-medium">Telegram:</span>
						<a
							href="https://t.me/pryanishnikov_dev"
							target="_blank"
							rel="noopener noreferrer"
							className="hover:text-primary-400 transition-colors underline decoration-dotted hover:decoration-solid"
							aria-label="Связаться в Telegram"
						>
							@pryanishnikov_dev
						</a>
					</p>
				</motion.div>
			</motion.div>

			{/* Scroll Indicator */}
			<motion.div
				className="absolute bottom-8 left-0 right-0 mx-auto w-fit z-10"
				animate={{ y: [0, 10, 0] }}
				transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
				aria-hidden="true"
			>
				<div className="flex flex-col items-center space-y-2">
					<span className="text-xs text-neutral-400 uppercase tracking-wider">
						Прокрутите вниз
					</span>
					<div className="w-6 h-10 border-2 border-primary-400 rounded-full flex justify-center">
						<motion.div
							className="w-1 h-3 bg-primary-400 rounded-full mt-2"
							animate={{ y: [0, 12, 0] }}
							transition={{
								duration: 1.5,
								repeat: Infinity,
								ease: 'easeInOut',
							}}
						/>
					</div>
				</div>
			</motion.div>

			{/* Decorative Elements */}
			<div className="absolute top-0 left-0 w-full h-full pointer-events-none">
				{/* Corner Decorations */}
				<div className="absolute top-10 left-10 w-20 h-20 border-l-2 border-t-2 border-primary-400/30 rounded-tl-lg" />
				<div className="absolute top-10 right-10 w-20 h-20 border-r-2 border-t-2 border-accent-400/30 rounded-tr-lg" />
				<div className="absolute bottom-10 left-10 w-20 h-20 border-l-2 border-b-2 border-primary-400/30 rounded-bl-lg" />
				<div className="absolute bottom-10 right-10 w-20 h-20 border-r-2 border-b-2 border-accent-400/30 rounded-br-lg" />
			</div>
		</section>
	);
});

HeroSection.displayName = 'HeroSection';

export default HeroSection;
