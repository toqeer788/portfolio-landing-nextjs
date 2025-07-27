'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import ClientOnly from './ClientOnly';

interface TypewriterTextProps {
	text: string;
	speed?: number;
	delay?: number;
	className?: string;
	onComplete?: () => void;
}

const TypewriterText = ({
	text,
	speed = 50,
	delay = 0,
	className = '',
	onComplete,
}: TypewriterTextProps) => {
	const [displayText, setDisplayText] = useState('');
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		if (currentIndex < text.length) {
			const timeout = setTimeout(() => {
				setDisplayText(prev => prev + text[currentIndex]);
				setCurrentIndex(prev => prev + 1);
			}, speed);

			return () => clearTimeout(timeout);
		} else if (onComplete) {
			onComplete();
		}
	}, [currentIndex, text, speed, onComplete]);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setCurrentIndex(0);
			setDisplayText('');
		}, delay);

		return () => clearTimeout(timeout);
	}, [delay]);

	return (
		<ClientOnly fallback={<span className={className}>{text}</span>}>
			<motion.span
				className={className}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.5 }}
			>
				{displayText}
				<motion.span
					animate={{
						opacity: [1, 0, 1],
						scale: [1, 0.8, 1],
					}}
					transition={{
						duration: 1.2,
						repeat: Infinity,
						ease: 'easeInOut',
					}}
					className="ml-1 inline-block w-0.5 h-6 bg-primary-400 rounded-full"
				></motion.span>
			</motion.span>
		</ClientOnly>
	);
};

export default TypewriterText;
