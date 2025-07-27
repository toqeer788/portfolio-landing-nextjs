import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../Button';

describe('Button', () => {
	it('renders with default props', () => {
		render(<Button>Click me</Button>);

		const button = screen.getByRole('button', { name: /click me/i });
		expect(button).toBeInTheDocument();
		expect(button).toHaveClass(
			'bg-gradient-to-r from-primary-500 to-accent-500'
		);
	});

	it('renders with different variants', () => {
		const { rerender } = render(<Button variant="secondary">Secondary</Button>);

		let button = screen.getByRole('button', { name: /secondary/i });
		expect(button).toHaveClass('border-2 border-primary-500 text-primary-400');

		rerender(<Button variant="ghost">Ghost</Button>);
		button = screen.getByRole('button', { name: /ghost/i });
		expect(button).toHaveClass('text-neutral-300 hover:text-primary-400');
	});

	it('renders with different sizes', () => {
		const { rerender } = render(<Button size="sm">Small</Button>);

		let button = screen.getByRole('button', { name: /small/i });
		expect(button).toHaveClass('px-4 py-2 text-sm');

		rerender(<Button size="lg">Large</Button>);
		button = screen.getByRole('button', { name: /large/i });
		expect(button).toHaveClass('px-8 py-4 text-lg');
	});

	it('handles click events', () => {
		const handleClick = jest.fn();
		render(<Button onClick={handleClick}>Click me</Button>);

		const button = screen.getByRole('button', { name: /click me/i });
		fireEvent.click(button);

		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it('can be disabled', () => {
		const handleClick = jest.fn();
		render(
			<Button disabled onClick={handleClick}>
				Disabled
			</Button>
		);

		const button = screen.getByRole('button', { name: /disabled/i });
		expect(button).toBeDisabled();

		fireEvent.click(button);
		expect(handleClick).not.toHaveBeenCalled();
	});

	it('applies custom className', () => {
		render(<Button className="custom-class">Custom</Button>);

		const button = screen.getByRole('button', { name: /custom/i });
		expect(button).toHaveClass('custom-class');
	});

	it('renders as submit button', () => {
		render(<Button type="submit">Submit</Button>);

		const button = screen.getByRole('button', { name: /submit/i });
		expect(button).toHaveAttribute('type', 'submit');
	});
});
