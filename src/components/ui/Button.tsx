'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { forwardRef, memo } from 'react';

interface ButtonProps {
	variant?: 'primary' | 'secondary' | 'ghost';
	size?: 'sm' | 'md' | 'lg';
	children: React.ReactNode;
	className?: string;
	disabled?: boolean;
	onClick?: () => void;
	type?: 'button' | 'submit' | 'reset';
	loading?: boolean;
	'aria-label'?: string;
	'aria-describedby'?: string;
}

const Button = memo(
	forwardRef<HTMLButtonElement, ButtonProps>(
		(
			{
				variant = 'primary',
				size = 'md',
				className,
				children,
				disabled = false,
				loading = false,
				...props
			},
			ref
		) => {
			const baseClasses =
				'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-900 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5 active:translate-y-0 relative overflow-hidden';

			const variants = {
				primary:
					'bg-gradient-to-r from-primary-500 to-accent-500 text-white hover:shadow-glow hover:shadow-glow-lg focus:ring-primary-400 disabled:hover:shadow-none disabled:hover:-translate-y-0 hover:from-primary-600 hover:to-accent-600',
				secondary:
					'border-2 border-primary-500 text-primary-400 hover:bg-primary-500 hover:text-white hover:shadow-glow focus:ring-primary-400 disabled:hover:bg-transparent disabled:hover:text-primary-400 disabled:hover:-translate-y-0 hover:border-primary-600',
				ghost:
					'text-neutral-300 hover:text-primary-400 hover:bg-white/5 focus:ring-primary-400 disabled:hover:bg-transparent disabled:hover:-translate-y-0 hover:shadow-soft',
			};

			const sizes = {
				sm: 'px-4 py-2 text-sm',
				md: 'px-6 py-3 text-base',
				lg: 'px-8 py-4 text-lg',
			};

			const isDisabled = disabled || loading;

			return (
				<motion.button
					ref={ref}
					className={cn(baseClasses, variants[variant], sizes[size], className)}
					disabled={isDisabled}
					whileHover={!isDisabled ? { scale: 1.02 } : undefined}
					whileTap={!isDisabled ? { scale: 0.98 } : undefined}
					{...props}
				>
					{/* Shimmer effect for primary buttons */}
					{variant === 'primary' && !isDisabled && (
						<motion.div
							className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
							animate={{
								translateX: ['-100%', '100%'],
							}}
							transition={{
								duration: 2,
								repeat: Infinity,
								repeatDelay: 3,
								ease: 'easeInOut',
							}}
						/>
					)}

					{loading && (
						<motion.div
							className="mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full"
							animate={{ rotate: 360 }}
							transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
							aria-hidden="true"
						/>
					)}
					<span className="relative z-10">{children}</span>
				</motion.button>
			);
		}
	)
);

Button.displayName = 'Button';

export default Button;
