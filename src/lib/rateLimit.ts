import { NextRequest } from 'next/server';

export interface RateLimitConfig {
	windowMs: number;
	maxRequests: number;
	keyGenerator?: (req: NextRequest) => string;
	skipSuccessfulRequests?: boolean;
	skipFailedRequests?: boolean;
}

export interface RateLimitResult {
	success: boolean;
	remaining: number;
	resetTime: number;
	retryAfter?: number;
}

// In-memory store для разработки
class MemoryStore {
	private store = new Map<string, { count: number; resetTime: number }>();

	async get(key: string): Promise<{ count: number; resetTime: number } | null> {
		const data = this.store.get(key);
		if (!data) return null;

		if (Date.now() > data.resetTime) {
			this.store.delete(key);
			return null;
		}

		return data;
	}

	async set(key: string, count: number, resetTime: number): Promise<void> {
		this.store.set(key, { count, resetTime });
	}

	async increment(
		key: string,
		windowMs: number
	): Promise<{ count: number; resetTime: number }> {
		const now = Date.now();
		const resetTime = now + windowMs;

		const existing = await this.get(key);
		if (existing) {
			const newCount = existing.count + 1;
			await this.set(key, newCount, existing.resetTime);
			return { count: newCount, resetTime: existing.resetTime };
		} else {
			await this.set(key, 1, resetTime);
			return { count: 1, resetTime };
		}
	}

	async delete(key: string): Promise<void> {
		this.store.delete(key);
	}
}

// Redis store для продакшена
class RedisStore {
	private redis: unknown;

	constructor() {
		// В реальном проекте здесь будет инициализация Redis
		// this.redis = new Redis(process.env.REDIS_URL);
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async get(key: string): Promise<{ count: number; resetTime: number } | null> {
		try {
			// Заглушка для разработки - в продакшене заменить на реальную Redis логику
			return null;
		} catch (error) {
			console.error('Redis get error:', error);
			return null;
		}
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async set(key: string, count: number, resetTime: number): Promise<void> {
		try {
			// Заглушка для разработки - в продакшене заменить на реальную Redis логику
		} catch (error) {
			console.error('Redis set error:', error);
		}
	}

	async increment(
		key: string,
		windowMs: number
	): Promise<{ count: number; resetTime: number }> {
		try {
			const now = Date.now();
			const resetTime = now + windowMs;

			const existing = await this.get(key);
			if (existing) {
				const newCount = existing.count + 1;
				await this.set(key, newCount, existing.resetTime);
				return { count: newCount, resetTime: existing.resetTime };
			} else {
				await this.set(key, 1, resetTime);
				return { count: 1, resetTime };
			}
		} catch (error) {
			console.error('Redis increment error:', error);
			return { count: 1, resetTime: Date.now() + windowMs };
		}
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async delete(key: string): Promise<void> {
		try {
			// Заглушка для разработки - в продакшене заменить на реальную Redis логику
		} catch (error) {
			console.error('Redis delete error:', error);
		}
	}
}

export class RateLimiter {
	private store: MemoryStore | RedisStore;
	private config: RateLimitConfig;

	constructor(config: RateLimitConfig) {
		this.config = config;
		this.store =
			process.env.NODE_ENV === 'production'
				? new RedisStore()
				: new MemoryStore();
	}

	private getKey(req: NextRequest): string {
		if (this.config.keyGenerator) {
			return this.config.keyGenerator(req);
		}

		// Дефолтная генерация ключа по IP
		const forwarded = req.headers.get('x-forwarded-for');
		const ip = forwarded ? forwarded.split(',')[0] : 'unknown';
		return `rate-limit:${ip}`;
	}

	async checkLimit(req: NextRequest): Promise<RateLimitResult> {
		const key = this.getKey(req);
		const { windowMs, maxRequests } = this.config;

		try {
			const { count, resetTime } = await this.store.increment(key, windowMs);
			const remaining = Math.max(0, maxRequests - count);
			const retryAfter =
				count > maxRequests
					? Math.ceil((resetTime - Date.now()) / 1000)
					: undefined;

			return {
				success: count <= maxRequests,
				remaining,
				resetTime,
				retryAfter,
			};
		} catch (error) {
			console.error('Rate limit check error:', error);
			// В случае ошибки разрешаем запрос
			return {
				success: true,
				remaining: maxRequests,
				resetTime: Date.now() + windowMs,
			};
		}
	}

	async reset(key: string): Promise<void> {
		try {
			await this.store.delete(key);
		} catch (error) {
			console.error('Rate limit reset error:', error);
		}
	}
}

// Предустановленные конфигурации
export const rateLimitConfigs = {
	strict: {
		windowMs: 60 * 1000, // 1 минута
		maxRequests: 5,
	},
	moderate: {
		windowMs: 60 * 1000, // 1 минута
		maxRequests: 20,
	},
	lenient: {
		windowMs: 60 * 1000, // 1 минута
		maxRequests: 100,
	},
} as const;

// Создание rate limiter'а для контактной формы
export const contactFormRateLimiter = new RateLimiter({
	...rateLimitConfigs.strict,
	keyGenerator: (req: NextRequest) => {
		const forwarded = req.headers.get('x-forwarded-for');
		const ip = forwarded ? forwarded.split(',')[0] : 'unknown';
		return `contact-form:${ip}`;
	},
});
