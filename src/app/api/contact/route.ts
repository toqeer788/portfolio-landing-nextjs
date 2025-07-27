import { NextRequest, NextResponse } from 'next/server';
import {
	contactFormSchema,
	validateServerSide,
	sanitizeString,
	sanitizeEmail,
} from '@/lib/validation';
import { contactFormRateLimiter } from '@/lib/rateLimit';

export async function POST(request: NextRequest) {
	try {
		// Проверяем rate limit
		const rateLimitResult = await contactFormRateLimiter.checkLimit(request);

		if (!rateLimitResult.success) {
			return NextResponse.json(
				{
					error: 'Слишком много запросов. Попробуйте позже.',
					retryAfter: rateLimitResult.retryAfter,
				},
				{
					status: 429,
					headers: {
						'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
						'X-RateLimit-Reset': rateLimitResult.resetTime.toString(),
						'Retry-After': rateLimitResult.retryAfter?.toString() || '60',
					},
				}
			);
		}

		// Получаем данные из запроса
		const body = await request.json();

		// Валидируем данные
		const validation = await validateServerSide(contactFormSchema, body);

		if (!validation.success) {
			return NextResponse.json(
				{ error: 'Ошибка валидации', details: validation.errors },
				{ status: 400 }
			);
		}

		// Санитизируем данные
		const sanitizedData = {
			name: sanitizeString(validation.data.name),
			email: sanitizeEmail(validation.data.email),
			phone: validation.data.phone
				? sanitizeString(validation.data.phone)
				: undefined,
			project: sanitizeString(validation.data.project),
			budget: validation.data.budget,
			timeline: validation.data.timeline,
			message: validation.data.message
				? sanitizeString(validation.data.message)
				: undefined,
		};

		// Отправляем email
		await sendContactEmail(sanitizedData);

		// Логируем успешную отправку только в development
		if (process.env.NODE_ENV === 'development') {
			console.log('Contact form submitted:', {
				name: sanitizedData.name,
				email: sanitizedData.email,
				project: sanitizedData.project,
				budget: validation.data.budget,
				timeline: validation.data.timeline,
				timestamp: new Date().toISOString(),
				ip: request.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown',
			});
		}

		return NextResponse.json(
			{
				success: true,
				message:
					'Сообщение успешно отправлено. Я свяжусь с вами в ближайшее время.',
			},
			{
				status: 200,
				headers: {
					'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
					'X-RateLimit-Reset': rateLimitResult.resetTime.toString(),
				},
			}
		);
	} catch (error) {
		console.error('Contact form error:', error);

		return NextResponse.json(
			{ error: 'Произошла внутренняя ошибка сервера. Попробуйте позже.' },
			{ status: 500 }
		);
	}
}

// Функция отправки email
async function sendContactEmail(data: {
	name: string;
	email: string;
	phone?: string;
	project: string;
	budget: string;
	timeline: string;
	message?: string;
}): Promise<void> {
	// Имитация отправки email
	await new Promise(resolve => setTimeout(resolve, 1000));

	// Логируем данные только в development
	if (process.env.NODE_ENV === 'development') {
		console.log('Sending email to:', data.email, 'from:', data.name);
	}

	// В реальном проекте здесь будет интеграция с email сервисом
	// Пример с Resend:
	// const resend = new Resend(process.env.RESEND_API_KEY);
	// await resend.emails.send({
	//   from: 'noreply@pryanishnikov.dev',
	//   to: 'hello@pryanishnikov.dev',
	//   subject: `Новая заявка от ${data.name}`,
	//   html: generateEmailTemplate(data),
	// });
}
