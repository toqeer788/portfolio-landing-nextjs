'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
	value: number; // 0-100
	label?: string;
	className?: string;
	showPercentage?: boolean;
	variant?: 'default' | 'gradient' | 'glow';
}

const ProgressBar = ({
	value,
	label,
	className = '',
	showPercentage = true,
	variant = 'default',
}: ProgressBarProps) => {
	const variants = {
		default: 'bg-gradient-to-r from-primary-500 to-accent-500',
		gradient: 'bg-gradient-to-r from-primary-400 via-accent-500 to-primary-600',
		glow: 'bg-gradient-to-r from-primary-500 to-accent-500 shadow-glow',
	};

	return (
		<div className={cn('w-full', className)}>
			{label && (
				<div className="flex justify-between items-center mb-2">
					<span className="text-sm text-neutral-300">{label}</span>
					{showPercentage && (
						<span className="text-sm text-primary-400 font-mono font-bold">
							{value}%
						</span>
					)}
				</div>
			)}
			<div className="w-full bg-white/10 rounded-full h-3 overflow-hidden backdrop-blur-sm">
				<motion.div
					className={cn('h-full rounded-full', variants[variant])}
					initial={{ width: 0 }}
					whileInView={{ width: `${value}%` }}
					viewport={{ once: true }}
					transition={{ duration: 1.5, ease: 'easeOut' }}
				/>
			</div>
		</div>
	);
};

export default ProgressBar;
