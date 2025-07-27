import '@testing-library/jest-dom';

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
	constructor() {}
	observe() {
		return null;
	}
	unobserve() {
		return null;
	}
	disconnect() {
		return null;
	}
};

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
	constructor() {}
	observe() {
		return null;
	}
	unobserve() {
		return null;
	}
	disconnect() {
		return null;
	}
};

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
	writable: true,
	value: jest.fn().mockImplementation(query => ({
		matches: false,
		media: query,
		onchange: null,
		addListener: jest.fn(), // deprecated
		removeListener: jest.fn(), // deprecated
		addEventListener: jest.fn(),
		removeEventListener: jest.fn(),
		dispatchEvent: jest.fn(),
	})),
});

// Mock scrollIntoView
Element.prototype.scrollIntoView = jest.fn();

// Mock getBoundingClientRect
Element.prototype.getBoundingClientRect = jest.fn(() => ({
	width: 120,
	height: 120,
	top: 0,
	left: 0,
	bottom: 0,
	right: 0,
}));
