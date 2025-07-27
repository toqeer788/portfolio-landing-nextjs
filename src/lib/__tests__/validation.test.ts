import {
	nameSchema,
	emailSchema,
	phoneSchema,
	projectDescriptionSchema,
	contactFormSchema,
	validateEmail,
	validatePhone,
	sanitizeString,
	sanitizeEmail,
} from '@/lib/validation';

describe('Validation Schemas', () => {
	describe('nameSchema', () => {
		it('validates correct names', () => {
			expect(() => nameSchema.parse('Артём')).not.toThrow();
			expect(() => nameSchema.parse('John Doe')).not.toThrow();
			expect(() => nameSchema.parse('Jean-Pierre')).not.toThrow();
		});

		it('rejects invalid names', () => {
			expect(() => nameSchema.parse('A')).toThrow(); // слишком короткое
			expect(() => nameSchema.parse('a'.repeat(51))).toThrow(); // слишком длинное
			expect(() => nameSchema.parse('John123')).toThrow(); // содержит цифры
		});
	});

	describe('emailSchema', () => {
		it('validates correct emails', () => {
			expect(() => emailSchema.parse('test@example.com')).not.toThrow();
			expect(() => emailSchema.parse('user.name@domain.co.uk')).not.toThrow();
		});

		it('rejects invalid emails', () => {
			expect(() => emailSchema.parse('invalid-email')).toThrow();
			expect(() => emailSchema.parse('@domain.com')).toThrow();
			expect(() => emailSchema.parse('test@')).toThrow();
		});
	});

	describe('phoneSchema', () => {
		it('validates correct phone numbers', () => {
			expect(() => phoneSchema.parse('+79991234567')).not.toThrow();
			expect(() => phoneSchema.parse('79991234567')).not.toThrow();
		});

		it('rejects invalid phone numbers', () => {
			expect(() => phoneSchema.parse('abc')).toThrow();
			expect(() => phoneSchema.parse('123456789')).toThrow(); // слишком короткий
		});
	});

	describe('projectDescriptionSchema', () => {
		it('validates correct descriptions', () => {
			expect(() =>
				projectDescriptionSchema.parse('This is a valid project description')
			).not.toThrow();
		});

		it('rejects too short descriptions', () => {
			expect(() => projectDescriptionSchema.parse('Short')).toThrow();
		});

		it('rejects too long descriptions', () => {
			const longDescription = 'a'.repeat(1001);
			expect(() => projectDescriptionSchema.parse(longDescription)).toThrow();
		});
	});

	describe('contactFormSchema', () => {
		it('validates complete form data', () => {
			const validData = {
				name: 'Артём Прянишников',
				email: 'test@example.com',
				phone: '+79991234567',
				project: 'This is a valid project description with enough content',
				budget: 'medium',
				timeline: 'normal',
				message: 'Additional information',
			};

			expect(() => contactFormSchema.parse(validData)).not.toThrow();
		});

		it('rejects incomplete form data', () => {
			const invalidData = {
				name: 'A',
				email: 'invalid-email',
				project: 'Short',
				budget: 'invalid',
				timeline: 'invalid',
			};

			expect(() => contactFormSchema.parse(invalidData)).toThrow();
		});
	});
});

describe('Validation Utilities', () => {
	describe('validateEmail', () => {
		it('returns true for valid emails', () => {
			expect(validateEmail('test@example.com')).toBe(true);
			expect(validateEmail('user.name@domain.co.uk')).toBe(true);
		});

		it('returns false for invalid emails', () => {
			expect(validateEmail('invalid-email')).toBe(false);
			expect(validateEmail('@domain.com')).toBe(false);
		});
	});

	describe('validatePhone', () => {
		it('returns true for valid phone numbers', () => {
			expect(validatePhone('+79991234567')).toBe(true);
			expect(validatePhone('79991234567')).toBe(true);
		});

		it('returns false for invalid phone numbers', () => {
			expect(validatePhone('123')).toBe(false);
			expect(validatePhone('abc')).toBe(false);
			expect(validatePhone('123456789')).toBe(false); // слишком короткий
		});
	});

	describe('sanitizeString', () => {
		it('trims whitespace', () => {
			expect(sanitizeString('  test  ')).toBe('test');
		});

		it('removes dangerous characters', () => {
			expect(sanitizeString('test<script>alert("xss")</script>')).toBe(
				'testscriptalertxssscript'
			);
		});

		it('normalizes spaces', () => {
			expect(sanitizeString('test    string')).toBe('test string');
		});
	});

	describe('sanitizeEmail', () => {
		it('trims and converts to lowercase', () => {
			expect(sanitizeEmail('  TEST@EXAMPLE.COM  ')).toBe('test@example.com');
		});
	});
});
