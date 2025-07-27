'use client';

import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect } from 'react';
import ClientOnly from './ClientOnly';

interface AnimatedCounterProps {
	value: number;
	suffix?: string;
	duration?: number;
	className?: string;
}

const AnimatedCounter = ({
	value,
	suffix = '',
	duration = 2,
	className = '',
}: AnimatedCounterProps) => {
	const count = useMotionValue(0);
	const rounded = useTransform(count, latest => Math.round(latest));

	useEffect(() => {
		const controls = animate(count, value, { duration });
		return controls.stop;
	}, [value, count, duration]);

	return (
		<ClientOnly
			fallback={
				<span className={className}>
					{value}
					{suffix}
				</span>
			}
		>
			<motion.span className={className}>
				{rounded.get()}
				{suffix}
			</motion.span>
		</ClientOnly>
	);
};

export default AnimatedCounter;
