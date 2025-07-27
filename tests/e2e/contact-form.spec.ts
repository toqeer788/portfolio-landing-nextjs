import { test, expect } from '@playwright/test';

test.describe('Contact Form', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
		// Ждем загрузки страницы
		await page.waitForLoadState('networkidle');
		// Прокручиваем к контактной форме напрямую
		await page.evaluate(() => {
			const contactSection = document.getElementById('contact');
			if (contactSection) {
				contactSection.scrollIntoView({ behavior: 'smooth' });
			}
		});
		// Ждем появления формы
		await page.waitForSelector('form', { timeout: 10000 });
	});

	test('should display contact form', async ({ page }) => {
		await expect(page.locator('h2:has-text("Начнем проект")')).toBeVisible({
			timeout: 10000,
		});
		await expect(page.locator('form')).toBeVisible();
	});

	test('should validate required fields', async ({ page }) => {
		// Попытка отправить пустую форму
		await page.click('button[type="submit"]');

		// Проверяем сообщения об ошибках
		await expect(
			page.locator('text=Имя должно содержать минимум 2 символа')
		).toBeVisible({ timeout: 10000 });
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
		).toBeVisible({ timeout: 10000 });
	});

	test('should validate name length', async ({ page }) => {
		await page.fill('#name', 'A');
		await page.press('#name', 'Tab');

		await expect(
			page.locator('text=Имя должно содержать минимум 2 символа')
		).toBeVisible({ timeout: 10000 });
	});

	test('should validate project description length', async ({ page }) => {
		await page.fill('#project', 'Short');
		await page.press('#project', 'Tab');

		await expect(
			page.locator('text=Описание проекта должно содержать минимум 10 символов')
		).toBeVisible({ timeout: 10000 });
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
		await expect(page.locator('text=Сообщение отправлено!')).toBeVisible({
			timeout: 15000,
		});
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
