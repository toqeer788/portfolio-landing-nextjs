import { useState, useEffect, useCallback } from 'react';

export function useLocalStorage<T>(
	key: string,
	initialValue: T
): [T, (value: T | ((val: T) => T)) => void, () => void] {
	// Состояние для хранения значения
	const [storedValue, setStoredValue] = useState<T>(() => {
		if (typeof window === 'undefined') {
			return initialValue;
		}

		try {
			const item = window.localStorage.getItem(key);
			return item ? JSON.parse(item) : initialValue;
		} catch (error) {
			if (process.env.NODE_ENV === 'development') {
				console.error(`Ошибка чтения localStorage ключа "${key}":`, error);
			}
			return initialValue;
		}
	});

	// Функция для установки значения
	const setValue = useCallback(
		(value: T | ((val: T) => T)) => {
			try {
				// Позволяет передавать функцию, которая получает предыдущее значение
				const valueToStore =
					value instanceof Function ? value(storedValue) : value;

				setStoredValue(valueToStore);

				// Сохраняем в localStorage
				if (typeof window !== 'undefined') {
					window.localStorage.setItem(key, JSON.stringify(valueToStore));
				}
			} catch (error) {
				if (process.env.NODE_ENV === 'development') {
					console.error(`Ошибка записи localStorage ключа "${key}":`, error);
				}
			}
		},
		[key, storedValue]
	);

	// Функция для удаления значения
	const removeValue = useCallback(() => {
		try {
			setStoredValue(initialValue);
			if (typeof window !== 'undefined') {
				window.localStorage.removeItem(key);
			}
		} catch (error) {
			if (process.env.NODE_ENV === 'development') {
				console.error(`Ошибка удаления localStorage ключа "${key}":`, error);
			}
		}
	}, [key, initialValue]);

	// Синхронизация с другими вкладками
	useEffect(() => {
		if (typeof window === 'undefined') return;

		const handleStorageChange = (e: StorageEvent) => {
			if (e.key === key && e.newValue !== null) {
				try {
					setStoredValue(JSON.parse(e.newValue));
				} catch (error) {
					if (process.env.NODE_ENV === 'development') {
						console.error(
							`Ошибка парсинга localStorage значения для ключа "${key}":`,
							error
						);
					}
				}
			}
		};

		window.addEventListener('storage', handleStorageChange);
		return () => window.removeEventListener('storage', handleStorageChange);
	}, [key]);

	return [storedValue, setValue, removeValue];
}
