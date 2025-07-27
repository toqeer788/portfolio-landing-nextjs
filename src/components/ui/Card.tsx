'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

interface CardProps {
	children: React.ReactNode;
	className?: string;
	hover?: boolean;
	delay?: number;
	id?: string;
	style?: React.CSSProperties;
	variant?: 'default' | 'glass' | 'gradient';
}

const Card = forwardRef<HTMLDivElement, CardProps>(
	(
		{
			children,
			className,
			hover = true,
			delay = 0,
			variant = 'default',
			...props
		},
		ref
	) => {
		const baseClasses =
			'backdrop-blur-md border border-white/10 rounded-2xl p-6 transition-all duration-300 relative overflow-hidden';

		const variants = {
			default: 'bg-white/5 hover:bg-white/10 hover:border-white/20',
			glass: 'bg-white/10 backdrop-blur-xl border-white/20 hover:bg-white/15',
			gradient:
				'bg-gradient-to-br from-white/10 to-white/5 hover:from-white/15 hover:to-white/10',
		};

		return (
			<motion.div
				ref={ref}
				className={cn(
					baseClasses,
					variants[variant],
					hover && 'hover:shadow-medium hover:-translate-y-1',
					className
				)}
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.6, delay }}
				whileHover={
					hover
						? {
								y: -5,
								scale: 1.02,
								transition: { duration: 0.2 },
							}
						: undefined
				}
				{...props}
			>
				{/* Subtle gradient overlay for better visual depth */}
				{variant === 'default' && (
					<div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-accent-500/5 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
				)}

				{/* Shimmer effect on hover */}
				{hover && (
					<motion.div
						className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full pointer-events-none"
						initial={{ translateX: '-100%' }}
						whileHover={{
							translateX: '100%',
							transition: { duration: 0.8, ease: 'easeInOut' },
						}}
					/>
				)}

				<div className="relative z-10">{children}</div>
			</motion.div>
		);
	}
);

Card.displayName = 'Card';

export default Card;
