import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Объединяет классы CSS с помощью clsx и tailwind-merge
 */
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

/**
 * Форматирует число с разделителями
 */
export function formatNumber(num: number): string {
	return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

/**
 * Задержка в миллисекундах
 */
export function delay(ms: number): Promise<void> {
	return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Проверяет, находится ли элемент в области видимости
 */
export function isInViewport(element: Element): boolean {
	const rect = element.getBoundingClientRect();
	return (
		rect.top >= 0 &&
		rect.left >= 0 &&
		rect.bottom <=
			(window.innerHeight || document.documentElement.clientHeight) &&
		rect.right <= (window.innerWidth || document.documentElement.clientWidth)
	);
}

/**
 * Плавная прокрутка к элементу
 */
export function scrollToElement(elementId: string): void {
	const element = document.getElementById(elementId);
	if (element) {
		element.scrollIntoView({
			behavior: 'smooth',
			block: 'start',
		});
	}
}

/**
 * Валидация email
 */
export function isValidEmail(email: string): boolean {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}

/**
 * Обрезает текст до указанной длины
 */
export function truncateText(text: string, maxLength: number): string {
	if (text.length <= maxLength) return text;
	return text.slice(0, maxLength) + '...';
}

/**
 * Генерирует случайный ID
 */
export function generateId(): string {
	return Math.random().toString(36).substr(2, 9);
}

/**
 * Форматирует дату в читаемый вид
 */
export function formatDate(date: Date): string {
	return new Intl.DateTimeFormat('ru-RU', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	}).format(date);
}

/**
 * Анимация счетчика
 */
export function animateCounter(
	element: HTMLElement,
	start: number,
	end: number,
	duration: number = 2000
): void {
	const startTime = performance.now();
	const difference = end - start;

	function updateCounter(currentTime: number) {
		const elapsed = currentTime - startTime;
		const progress = Math.min(elapsed / duration, 1);

		const current = Math.floor(start + difference * progress);
		element.textContent = current.toString();

		if (progress < 1) {
			requestAnimationFrame(updateCounter);
		}
	}

	requestAnimationFrame(updateCounter);
}

/**
 * Копирует текст в буфер обмена
 */
export async function copyToClipboard(text: string): Promise<boolean> {
	try {
		await navigator.clipboard.writeText(text);
		return true;
	} catch (error) {
		// Логируем только в development
		if (process.env.NODE_ENV === 'development') {
			console.error('Ошибка копирования в буфер обмена:', error);
		}
		return false;
	}
}

/**
 * Дебаунс функция
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
	func: T,
	wait: number
): (...args: Parameters<T>) => void {
	let timeout: NodeJS.Timeout;
	return (...args: Parameters<T>) => {
		clearTimeout(timeout);
		timeout = setTimeout(() => func(...args), wait);
	};
}

/**
 * Троттлинг функция
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
	func: T,
	limit: number
): (...args: Parameters<T>) => void {
	let inThrottle: boolean;
	return (...args: Parameters<T>) => {
		if (!inThrottle) {
			func(...args);
			inThrottle = true;
			setTimeout(() => (inThrottle = false), limit);
		}
	};
}

/**
 * Безопасная санитизация HTML
 */
export function sanitizeHtml(html: string): string {
	const div = document.createElement('div');
	div.textContent = html;
	return div.innerHTML;
}

/**
 * Безопасное получение значения из localStorage
 */
export function getLocalStorageItem(key: string): string | null {
	try {
		return localStorage.getItem(key);
	} catch (error) {
		if (process.env.NODE_ENV === 'development') {
			console.error('Ошибка чтения из localStorage:', error);
		}
		return null;
	}
}

/**
 * Безопасная установка значения в localStorage
 */
export function setLocalStorageItem(key: string, value: string): boolean {
	try {
		localStorage.setItem(key, value);
		return true;
	} catch (error) {
		if (process.env.NODE_ENV === 'development') {
			console.error('Ошибка записи в localStorage:', error);
		}
		return false;
	}
}

/**
 * Безопасное удаление значения из localStorage
 */
export function removeLocalStorageItem(key: string): boolean {
	try {
		localStorage.removeItem(key);
		return true;
	} catch (error) {
		if (process.env.NODE_ENV === 'development') {
			console.error('Ошибка удаления из localStorage:', error);
		}
		return false;
	}
}

// Типизированные варианты анимаций для Framer Motion
export const fadeInUpVariants = {
	hidden: { opacity: 0, y: 30 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.6,
		},
	},
} as const;

export const staggerContainerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.2,
		},
	},
} as const;

export const scaleInVariants = {
	hidden: { opacity: 0, scale: 0.8 },
	visible: {
		opacity: 1,
		scale: 1,
		transition: {
			duration: 0.5,
		},
	},
} as const;

export const slideInLeftVariants = {
	hidden: { opacity: 0, x: -50 },
	visible: {
		opacity: 1,
		x: 0,
		transition: {
			duration: 0.6,
		},
	},
} as const;

export const slideInRightVariants = {
	hidden: { opacity: 0, x: 50 },
	visible: {
		opacity: 1,
		x: 0,
		transition: {
			duration: 0.6,
		},
	},
} as const;
