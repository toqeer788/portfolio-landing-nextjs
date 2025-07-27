import { z } from 'zod';

// Базовые схемы валидации
export const nameSchema = z
	.string()
	.min(2, 'Имя должно содержать минимум 2 символа')
	.max(50, 'Имя не должно превышать 50 символов')
	.regex(
		/^[а-яёa-z\s-]+$/i,
		'Имя может содержать только буквы, пробелы и дефисы'
	)
	.transform(val => val.trim());

export const emailSchema = z
	.string()
	.email('Введите корректный email адрес')
	.min(5, 'Email должен содержать минимум 5 символов')
	.max(100, 'Email не должен превышать 100 символов')
	.transform(val => val.toLowerCase().trim());

export const phoneSchema = z
	.string()
	.regex(
		/^[\+]?[1-9][\d]{9,15}$/,
		'Введите корректный номер телефона (минимум 10 цифр)'
	)
	.optional()
	.transform(val => val?.trim());

export const projectDescriptionSchema = z
	.string()
	.min(10, 'Описание проекта должно содержать минимум 10 символов')
	.max(1000, 'Описание проекта не должно превышать 1000 символов')
	.transform(val => val.trim());

export const messageSchema = z
	.string()
	.max(2000, 'Сообщение не должно превышать 2000 символов')
	.optional()
	.transform(val => val?.trim());

// Схемы для выбора
export const budgetSchema = z.enum(['small', 'medium', 'large', 'enterprise']);

export const timelineSchema = z.enum(['urgent', 'normal', 'flexible']);

// Основная схема контактной формы
export const contactFormSchema = z
	.object({
		name: nameSchema,
		email: emailSchema,
		phone: phoneSchema.optional(),
		project: projectDescriptionSchema,
		budget: budgetSchema,
		timeline: timelineSchema,
		message: messageSchema.optional(),
	})
	.refine(
		data => {
			// Дополнительная валидация: хотя бы одно средство связи
			return data.email || data.phone;
		},
		{
			message: 'Необходимо указать email или телефон',
			path: ['email'],
		}
	);

// Схема для подписки на рассылку
export const newsletterSchema = z.object({
	email: emailSchema,
	consent: z.boolean().refine(val => val === true, {
		message: 'Необходимо согласие на обработку персональных данных',
	}),
});

// Схема для поиска
export const searchSchema = z.object({
	query: z
		.string()
		.min(1, 'Введите поисковый запрос')
		.max(100, 'Запрос слишком длинный'),
	filters: z
		.object({
			category: z.string().optional(),
			technology: z.string().optional(),
			year: z.number().min(2020).max(new Date().getFullYear()).optional(),
		})
		.optional(),
});

// Схема для отзыва
export const testimonialSchema = z.object({
	name: nameSchema,
	position: z
		.string()
		.min(2, 'Должность должна содержать минимум 2 символа')
		.max(100),
	company: z
		.string()
		.min(2, 'Название компании должно содержать минимум 2 символа')
		.max(100)
		.optional(),
	text: z
		.string()
		.min(10, 'Отзыв должен содержать минимум 10 символов')
		.max(500, 'Отзыв не должен превышать 500 символов'),
	rating: z.number().min(1).max(5),
});

// Типы для TypeScript
export type ContactFormData = z.infer<typeof contactFormSchema>;
export type NewsletterFormData = z.infer<typeof newsletterSchema>;
export type SearchFormData = z.infer<typeof searchSchema>;
export type TestimonialFormData = z.infer<typeof testimonialSchema>;

// Утилиты для валидации
export const validateEmail = (email: string): boolean => {
	try {
		emailSchema.parse(email);
		return true;
	} catch {
		return false;
	}
};

export const validatePhone = (phone: string): boolean => {
	try {
		phoneSchema.parse(phone);
		return true;
	} catch {
		return false;
	}
};

export const validateName = (name: string): boolean => {
	try {
		nameSchema.parse(name);
		return true;
	} catch {
		return false;
	}
};

// Санитизация данных
export const sanitizeString = (str: string): string => {
	return str
		.trim()
		.replace(/[<>]/g, '') // Удаляем потенциально опасные символы
		.replace(/\s+/g, ' ') // Нормализуем пробелы
		.replace(/[^\w\sа-яё-]/gi, ''); // Удаляем специальные символы
};

export const sanitizeEmail = (email: string): string => {
	return email.trim().toLowerCase();
};

export const sanitizePhone = (phone: string): string => {
	return phone.replace(/[^\d+]/g, ''); // Оставляем только цифры и +
};

// Валидация на стороне сервера
export const validateServerSide = async <T>(
	schema: z.ZodSchema<T>,
	data: unknown
): Promise<
	{ success: true; data: T } | { success: false; errors: string[] }
> => {
	try {
		const validatedData = await schema.parseAsync(data);
		return { success: true, data: validatedData };
	} catch (error) {
		if (error instanceof z.ZodError) {
			return {
				success: false,
				errors: error.issues.map(issue => issue.message),
			};
		}
		return {
			success: false,
			errors: ['Произошла ошибка валидации'],
		};
	}
};

// Валидация на стороне клиента
export const validateClientSide = <T>(
	schema: z.ZodSchema<T>,
	data: unknown
):
	| { success: true; data: T }
	| { success: false; errors: Record<string, string> } => {
	try {
		const validatedData = schema.parse(data);
		return { success: true, data: validatedData };
	} catch (error) {
		if (error instanceof z.ZodError) {
			const errors: Record<string, string> = {};
			error.issues.forEach(issue => {
				const path = issue.path.join('.');
				errors[path] = issue.message;
			});
			return { success: false, errors };
		}
		return {
			success: false,
			errors: { general: 'Произошла ошибка валидации' },
		};
	}
};

// Утилиты для работы с ошибками валидации
export const getFieldError = (
	errors: Record<string, string>,
	field: string
): string | undefined => {
	return errors[field];
};

export const hasFieldError = (
	errors: Record<string, string>,
	field: string
): boolean => {
	return !!errors[field];
};

export const getFormErrors = (errors: Record<string, string>): string[] => {
	return Object.values(errors);
};
