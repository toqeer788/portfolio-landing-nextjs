import { test, expect } from '@playwright/test';

test.describe('Contact Form', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
		await page.click('a[href="#contact"]');
	});

	test('should display contact form', async ({ page }) => {
		await expect(page.locator('h2:has-text("Начнем проект")')).toBeVisible();
		await expect(page.locator('form')).toBeVisible();
	});

	test('should validate required fields', async ({ page }) => {
		// Попытка отправить пустую форму
		await page.click('button[type="submit"]');

		// Проверяем сообщения об ошибках
		await expect(
			page.locator('text=Имя должно содержать минимум 2 символа')
		).toBeVisible();
		await expect(
			page.locator('text=Введите корректный email адрес')
		).toBeVisible();
		await expect(
			page.locator('text=Описание проекта должно содержать минимум 10 символов')
		).toBeVisible();
	});

	test('should validate email format', async ({ page }) => {
		await page.fill('#email', 'invalid-email');
		await page.press('#email', 'Tab');

		await expect(
			page.locator('text=Введите корректный email адрес')
		).toBeVisible();
	});

	test('should validate name length', async ({ page }) => {
		await page.fill('#name', 'A');
		await page.press('#name', 'Tab');

		await expect(
			page.locator('text=Имя должно содержать минимум 2 символа')
		).toBeVisible();
	});

	test('should validate project description length', async ({ page }) => {
		await page.fill('#project', 'Short');
		await page.press('#project', 'Tab');

		await expect(
			page.locator('text=Описание проекта должно содержать минимум 10 символов')
		).toBeVisible();
	});

	test('should submit form with valid data', async ({ page }) => {
		// Заполняем форму валидными данными
		await page.fill('#name', 'Тестовый Пользователь');
		await page.fill('#email', 'test@example.com');
		await page.fill('#phone', '+79991234567');
		await page.fill(
			'#project',
			'Это тестовый проект с достаточно длинным описанием для валидации'
		);
		await page.selectOption('#budget', 'medium');
		await page.selectOption('#timeline', 'normal');
		await page.fill('#message', 'Дополнительная информация');

		// Отправляем форму
		await page.click('button[type="submit"]');

		// Проверяем успешную отправку
		await expect(page.locator('text=Сообщение отправлено!')).toBeVisible();
	});

	test('should show error on network failure', async ({ page }) => {
		// Мокаем неудачный запрос
		await page.route('/api/contact', async route => {
			await route.fulfill({
				status: 500,
				contentType: 'application/json',
				body: JSON.stringify({ error: 'Internal server error' }),
			});
		});

		// Заполняем и отправляем форму
		await page.fill('#name', 'Тестовый Пользователь');
		await page.fill('#email', 'test@example.com');
		await page.fill(
			'#project',
			'Это тестовый проект с достаточно длинным описанием для валидации'
		);
		await page.selectOption('#budget', 'medium');
		await page.selectOption('#timeline', 'normal');
		await page.click('button[type="submit"]');

		// Проверяем сообщение об ошибке
		await expect(page.locator('text=Internal server error')).toBeVisible();
	});

	test('should show rate limit error', async ({ page }) => {
		// Мокаем rate limit ошибку
		await page.route('/api/contact', async route => {
			await route.fulfill({
				status: 429,
				contentType: 'application/json',
				body: JSON.stringify({
					error: 'Слишком много запросов. Попробуйте позже.',
				}),
			});
		});

		// Заполняем и отправляем форму
		await page.fill('#name', 'Тестовый Пользователь');
		await page.fill('#email', 'test@example.com');
		await page.fill(
			'#project',
			'Это тестовый проект с достаточно длинным описанием для валидации'
		);
		await page.selectOption('#budget', 'medium');
		await page.selectOption('#timeline', 'normal');
		await page.click('button[type="submit"]');

		// Проверяем сообщение о rate limit
		await expect(
			page.locator('text=Слишком много запросов. Попробуйте позже.')
		).toBeVisible();
	});

	test('should be accessible', async ({ page }) => {
		// Проверяем наличие labels
		await expect(page.locator('label[for="name"]')).toBeVisible();
		await expect(page.locator('label[for="email"]')).toBeVisible();
		await expect(page.locator('label[for="project"]')).toBeVisible();

		// Проверяем aria-describedby для ошибок
		await page.fill('#name', 'A');
		await page.press('#name', 'Tab');
		await expect(page.locator('#name')).toHaveAttribute(
			'aria-describedby',
			'name-error'
		);
	});
});
