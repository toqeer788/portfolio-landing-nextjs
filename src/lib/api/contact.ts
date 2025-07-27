import { ContactFormData } from '@/lib/validation';

export interface ContactResponse {
	success: boolean;
	message: string;
	error?: string;
	details?: string[];
}

export class ContactError extends Error {
	status: number;
	details?: string[];

	constructor({
		message,
		status,
		details,
	}: {
		message: string;
		status: number;
		details?: string[];
	}) {
		super(message);
		this.name = 'ContactError';
		this.status = status;
		this.details = details;
	}
}

class ContactAPI {
	private baseURL: string;

	constructor() {
		this.baseURL = process.env.NEXT_PUBLIC_API_URL || '/api';
	}

	private async request<T>(
		endpoint: string,
		options: RequestInit = {}
	): Promise<T> {
		const url = `${this.baseURL}${endpoint}`;

		const defaultOptions: RequestInit = {
			headers: {
				'Content-Type': 'application/json',
				...options.headers,
			},
			...options,
		};

		try {
			const response = await fetch(url, defaultOptions);

			if (!response.ok) {
				const errorData = await response.json().catch(() => ({}));
				throw new Error(
					errorData.error || `HTTP error! status: ${response.status}`
				);
			}

			return await response.json();
		} catch (error) {
			if (error instanceof Error) {
				throw new ContactError({
					message: error.message,
					status: 500,
				});
			}
			throw new ContactError({
				message: 'Неизвестная ошибка',
				status: 500,
			});
		}
	}

	async submitContactForm(data: ContactFormData): Promise<ContactResponse> {
		return this.request<ContactResponse>('/contact', {
			method: 'POST',
			body: JSON.stringify(data),
		});
	}

	async validateEmail(
		email: string
	): Promise<{ valid: boolean; message?: string }> {
		try {
			const response = await this.request<{ valid: boolean; message?: string }>(
				'/validate-email',
				{
					method: 'POST',
					body: JSON.stringify({ email }),
				}
			);
			return response;
		} catch {
			return { valid: false, message: 'Ошибка валидации email' };
		}
	}
}

export const contactAPI = new ContactAPI();

// Утилиты для работы с API
export const handleContactSubmit = async (
	data: ContactFormData,
	onSuccess?: (response: ContactResponse) => void,
	onError?: (error: ContactError) => void
): Promise<void> => {
	try {
		const response = await contactAPI.submitContactForm(data);

		if (response.success) {
			onSuccess?.(response);
		} else {
			onError?.(
				new ContactError({
					message: response.error || 'Ошибка отправки формы',
					status: 400,
					details: response.details,
				})
			);
		}
	} catch (error) {
		if (error instanceof ContactError) {
			onError?.(error);
		} else {
			onError?.(
				new ContactError({
					message: 'Неизвестная ошибка',
					status: 500,
				})
			);
		}
	}
};
