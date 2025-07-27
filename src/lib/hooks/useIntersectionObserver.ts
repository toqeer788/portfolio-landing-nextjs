import { useEffect, useRef, useState, useCallback } from 'react';

interface UseIntersectionObserverOptions {
	threshold?: number | number[];
	rootMargin?: string;
	root?: Element | null;
}

interface UseIntersectionObserverReturn {
	ref: React.RefObject<HTMLDivElement | null>;
	isIntersecting: boolean;
	entry: IntersectionObserverEntry | null;
}

export function useIntersectionObserver(
	options: UseIntersectionObserverOptions = {}
): UseIntersectionObserverReturn {
	const [isIntersecting, setIsIntersecting] = useState(false);
	const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);
	const ref = useRef<HTMLDivElement>(null);

	const { threshold = 0, rootMargin = '0px', root = null } = options;

	const updateEntry = useCallback(([entry]: IntersectionObserverEntry[]) => {
		setEntry(entry);
		setIsIntersecting(entry.isIntersecting);
	}, []);

	useEffect(() => {
		const element = ref.current;
		if (!element) return;

		const observer = new IntersectionObserver(updateEntry, {
			threshold,
			rootMargin,
			root,
		});

		observer.observe(element);

		return () => {
			observer.disconnect();
		};
	}, [threshold, rootMargin, root, updateEntry]);

	return { ref, isIntersecting, entry };
}
