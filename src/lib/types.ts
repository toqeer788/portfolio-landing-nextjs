import { ReactNode } from 'react';

export interface Project {
	id: string;
	title: string;
	description: string;
	technologies: string[];
	result: string;
	testimonial: {
		text: string;
		author: string;
		position: string;
	};
	image?: string;
}

export interface Technology {
	name: string;
	category: 'frontend' | 'backend' | 'ai-ml' | 'devops';
	proficiency: number; // 0-100
	icon: ReactNode;
}

export interface Testimonial {
	id: string;
	text: string;
	author: string;
	position: string;
	company?: string;
}

export interface ContactFormData {
	name: string;
	project: string;
	budget: string;
	timeline: string;
	email: string;
	message?: string;
}

export interface WorkStep {
	id: string;
	title: string;
	description: string;
	duration: string;
	icon: ReactNode;
}

export interface Statistic {
	label: string;
	value: number;
	suffix: string;
}

export interface FAQ {
	question: string;
	answer: string;
}
