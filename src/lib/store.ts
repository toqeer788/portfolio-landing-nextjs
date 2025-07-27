import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface UIState {
	isMenuOpen: boolean;
	isContactFormOpen: boolean;
	currentSection: string;
	theme: 'light' | 'dark';
	setMenuOpen: (open: boolean) => void;
	setContactFormOpen: (open: boolean) => void;
	setCurrentSection: (section: string) => void;
	setTheme: (theme: 'light' | 'dark') => void;
}

interface ContactState {
	isSubmitting: boolean;
	submitError: string | null;
	submitSuccess: boolean;
	setSubmitting: (submitting: boolean) => void;
	setSubmitError: (error: string | null) => void;
	setSubmitSuccess: (success: boolean) => void;
	resetContactState: () => void;
}

export const useUIStore = create<UIState>()(
	devtools(
		persist(
			set => ({
				isMenuOpen: false,
				isContactFormOpen: false,
				currentSection: 'hero',
				theme: 'dark',
				setMenuOpen: open => set({ isMenuOpen: open }),
				setContactFormOpen: open => set({ isContactFormOpen: open }),
				setCurrentSection: section => set({ currentSection: section }),
				setTheme: theme => set({ theme }),
			}),
			{
				name: 'ui-storage',
				partialize: state => ({ theme: state.theme }),
			}
		)
	)
);

export const useContactStore = create<ContactState>()(
	devtools(set => ({
		isSubmitting: false,
		submitError: null,
		submitSuccess: false,
		setSubmitting: submitting => set({ isSubmitting: submitting }),
		setSubmitError: error => set({ submitError: error }),
		setSubmitSuccess: success => set({ submitSuccess: success }),
		resetContactState: () =>
			set({
				isSubmitting: false,
				submitError: null,
				submitSuccess: false,
			}),
	}))
);
